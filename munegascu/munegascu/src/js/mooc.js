/**
 * mooc.js — Münegascu
 * Moteur du parcours d'apprentissage (MOOC) : leçons, exercices, progression.
 *
 * PRINCIPE CLÉ (cf. lesson_format.js) : chaque exercice référence un mot/
 * verbe/phrase par sa clé exacte ({type, key}), jamais par du texte traduit
 * stocké en dur. resolveRef() va chercher la traduction ACTUELLE dans
 * DB_WORDS / DB_VERBS / DB_PHRASES à chaque rendu. Une correction validée
 * dans le dictionnaire (cf. système de suggestion déjà en place) se
 * propage donc automatiquement à toutes les leçons qui utilisent ce mot.
 *
 * Sécurité : toute donnée injectée dans innerHTML passe par Security.esc().
 */

const Mooc = (() => {
  'use strict';

  const S = {
    lessons: [],       // catalogue chargé au démarrage (MOOC_LESSONS)
    currentLesson: null,
    currentStep: 0,    // 0=dialogue, 1=thème, 2=trous, 3=révision, 4=fin
    themeIdx: 0,
    trousIdx: 0,
    themeResults: [],
    trousResults: [],
  };

  // ── Résolution de référence {type:'mot'|'verbe'|'phrase', key} ──────────
  // Retourne toujours { fr, mc, ph } ou null si la clé n'existe plus
  // (ex: mot supprimé du dictionnaire depuis l'écriture de la leçon).
  function resolveRef(ref) {
    if (!ref || !ref.key) return null;
    if (ref.type === 'mot') {
      const w = DB_WORDS.find(x => x.fr === ref.key);
      return w ? { fr: w.fr, mc: w.mc, ph: w.ph || '' } : null;
    }
    if (ref.type === 'phrase') {
      const p = DB_PHRASES.find(x => x.fr === ref.key);
      return p ? { fr: p.fr, mc: p.mc, ph: '' } : null;
    }
    if (ref.type === 'verbe') {
      const v = DB_VERBS[ref.key];
      return v ? { fr: ref.key, mc: v.mc, ph: '' } : null;
    }
    return null;
  }

  /**
   * Vérifie qu'une leçon est toujours jouable : toutes ses refs existent
   * encore ET, pour les exercices à trous, le mot ciblé apparaît bien tel
   * quel dans la phrase MC correspondante. Ce second point est nécessaire
   * car une phrase toute faite (DB_PHRASES) peut utiliser une variante
   * orthographique différente du même mot isolé dans le dictionnaire
   * (ex. "Cuma" dans DB_WORDS vs "cümu" dans une phrase de DB_PHRASES) —
   * sans cette vérification, le trou ne s'afficherait jamais et l'exercice
   * planterait silencieusement pour l'utilisateur.
   */
  function validateLesson(lesson) {
    const allRefs = [
      ...lesson.dialogue.map(d => d.phraseRef),
      ...lesson.vocabulaireNouveau,
      ...lesson.exerciceTheme.flatMap(e => [e.consigne, e.reponseAttendue]),
      ...(lesson.exercicePhrase || []).map(e => e.phraseRef),
      ...lesson.exerciceTrous.flatMap(e => [e.phraseRef, e.motATrou]),
    ];
    const broken = allRefs.filter(r => !resolveRef(r));

    const trousIssues = lesson.exerciceTrous.filter(item => {
      const phraseR = resolveRef(item.phraseRef);
      const motR = resolveRef(item.motATrou);
      if (!phraseR || !motR) return false; // déjà compté dans broken
      const re = new RegExp('(?<![\\p{L}\\p{N}])' + _escapeRegex(motR.mc) + '(?![\\p{L}\\p{N}])', 'iu');
      return !re.test(phraseR.mc); // le mot à trou n'apparaît pas tel quel dans la phrase
    });

    return { ok: broken.length === 0 && trousIssues.length === 0, broken, trousIssues };
  }

  function _escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // ── Normalisation pour comparaison de réponse utilisateur ──────────────
  // Tolère accents/majuscules/espaces multiples/ponctuation finale, mais
  // reste strict sur les caractères propres au monégasque (ë, ü, ç...) car
  // ce sont justement ceux qu'on veut faire apprendre.
  function _normalize(s) {
    return (s || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[!?.,;:]+$/g, '');
  }

  function _answersMatch(userInput, expected) {
    return _normalize(userInput) === _normalize(expected);
  }

  // ── Progression utilisateur (localStorage, cf. décision prise avec l'utilisateur) ──
  const LS_KEY = 'munegascu_mooc_progress';

  function _loadProgress() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : { completedLessons: [], scores: {} };
    } catch (e) {
      return { completedLessons: [], scores: {} };
    }
  }

  function _saveProgress(progress) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(progress)); }
    catch (e) { /* localStorage indisponible (navigation privée, quota...) — on continue sans bloquer */ }
  }

  function isLessonCompleted(lessonId) {
    return _loadProgress().completedLessons.includes(lessonId);
  }

  function markLessonCompleted(lessonId, score) {
    const p = _loadProgress();
    if (!p.completedLessons.includes(lessonId)) p.completedLessons.push(lessonId);
    p.scores[lessonId] = score;
    _saveProgress(p);
  }

  // ── Page d'accueil : catalogue des leçons ────────────────────────────
  function init(lessons) {
    S.lessons = lessons || [];
    renderMoocHome();
  }

  function renderMoocHome() {
    const root = document.getElementById('mooc-home');
    if (!root) return;

    if (!S.lessons.length) {
      root.innerHTML = '<p style="color:#999">Aucune leçon disponible pour le moment.</p>';
      return;
    }

    const sorted = [...S.lessons].sort((a, b) => a.ordreConseille - b.ordreConseille);
    root.innerHTML = `<div class="mooc-lesson-grid">${sorted.map(l => {
      const done = isLessonCompleted(l.id);
      const score = _loadProgress().scores[l.id];
      return `<div class="mooc-lesson-card${done ? ' done' : ''}" onclick="Mooc.startLesson('${Security.escAttr(l.id)}')">
        <div class="mooc-lesson-card-niveau">Niveau ${Security.esc(String(l.niveau))}</div>
        <div class="mooc-lesson-card-titre">${Security.esc(l.titre)}</div>
        ${done ? `<div class="mooc-lesson-card-badge">✅ Terminée${score!=null ? ' · ' + Security.esc(String(score)) + '%' : ''}</div>` : `<div class="mooc-lesson-card-badge new">Nouveau</div>`}
      </div>`;
    }).join('')}</div>`;
  }
  function startLesson(lessonId) {
    const lesson = S.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const { ok, broken, trousIssues } = validateLesson(lesson);
    if (!ok) {
      console.warn('[Mooc] Leçon', lessonId, 'a des références cassées :', broken, trousIssues);
      // On continue malgré tout, en ignorant les items cassés plutôt que de bloquer l'utilisateur
    }
    S.currentLesson = lesson;
    S.currentStep = 0;
    S.themeIdx = 0;
    S.trousIdx = 0;
    S.phraseIdx = 0;
    S.themeResults = [];
    S.trousResults = [];
    S.phraseResults = [];

    document.getElementById('mooc-home').style.display = 'none';
    document.getElementById('mooc-lesson-root').style.display = 'block';
    _renderStep();
  }

  function exitLesson() {
    S.currentLesson = null;
    document.getElementById('mooc-lesson-root').style.display = 'none';
    document.getElementById('mooc-home').style.display = 'block';
    renderMoocHome();
  }

  // ── Rendu de l'étape courante ────────────────────────────────────────
  // 0=Dialogue, 1=Vocabulaire, 2=Grammaire, 3=Thème, 4=Phrase à compléter,
  // 5=Texte à trous, 6=Révision, 7=Fin
  function _renderStep() {
    const root = document.getElementById('mooc-lesson-root');
    if (!root) return;
    const lesson = S.currentLesson;
    if (!lesson) return;

    if (S.currentStep === 0) return _renderDialogue(root, lesson);
    if (S.currentStep === 1) return _renderVocabulaire(root, lesson);
    if (S.currentStep === 2) return _renderGrammaire(root, lesson);
    if (S.currentStep === 3) return _renderTheme(root, lesson);
    if (S.currentStep === 4) return _renderPhrase(root, lesson);
    if (S.currentStep === 5) return _renderTrous(root, lesson);
    if (S.currentStep === 6) return _renderRevision(root, lesson);
    if (S.currentStep === 7) return _renderFin(root, lesson);
  }

  function nextStep() {
    S.currentStep++;
    _renderStep();
  }

  function _progressHeader(lesson, stepLabel) {
    const steps = ['Dialogue', 'Vocabulaire', 'Grammaire', 'Thème', 'Phrase', 'Texte à trous', 'Révision', 'Terminé'];
    return `
      <div class="mooc-lesson-header">
        <button class="btn-ghost" onclick="Mooc.exitLesson()">← Quitter</button>
        <div class="mooc-lesson-title">${Security.esc(lesson.titre)}</div>
        <div class="mooc-step-indicator">${steps.map((s,i) =>
          `<span class="mooc-step-dot ${i===S.currentStep?'active':i<S.currentStep?'done':''}"></span>`
        ).join('')}</div>
      </div>`;
  }

  // ── Étape 0 : Dialogue / phrase modèle ───────────────────────────────
  function _renderDialogue(root, lesson) {
    const lines = lesson.dialogue.map(d => {
      const r = resolveRef(d.phraseRef);
      if (!r) return ''; // référence cassée : on saute la ligne plutôt que planter
      return `<div class="mooc-dialogue-line">
        <span class="mooc-dialogue-speaker">${Security.esc(d.locuteur)}</span>
        <div class="mooc-dialogue-content">
          <div class="mooc-dialogue-mc">${Security.esc(r.mc)}
            <button class="speak-btn" data-speak="${Security.escAttr(r.mc)}" style="margin-left:6px">🔊</button>
          </div>
          <div class="mooc-dialogue-fr">${Security.esc(r.fr)}</div>
        </div>
      </div>`;
    }).join('');

    root.innerHTML = `
      ${_progressHeader(lesson, 'Dialogue')}
      <div class="mooc-lesson-body">
        <div class="mooc-dialogue-box">${lines}</div>
        <button class="btn-red" onclick="Mooc.nextStep()" style="margin-top:16px">Continuer → Vocabulaire</button>
      </div>`;

    root.querySelectorAll('.speak-btn[data-speak]').forEach(btn => {
      btn.addEventListener('click', e => Audio.speak(e.currentTarget.dataset.speak, e, 'mc'));
    });
  }

  // ── Étape 1 : Fiche de vocabulaire ───────────────────────────────────
  function _renderVocabulaire(root, lesson) {
    const rows = lesson.vocabulaireNouveau.map(ref => {
      const r = resolveRef(ref);
      if (!r) return '';
      return `<div class="mooc-vocab-row">
        <span class="mooc-vocab-fr">${Security.esc(r.fr)}</span>
        <span class="mooc-vocab-arrow">→</span>
        <span class="mooc-vocab-mc">${Security.esc(r.mc)}
          <button class="speak-btn" data-speak="${Security.escAttr(r.mc)}" style="margin-left:6px">🔊</button>
        </span>
      </div>`;
    }).join('');

    // Verbe(s) de la leçon, si présents : affiche leur conjugaison au présent
    const verbeRefs = lesson.vocabulaireNouveau.filter(r => r.type === 'verbe');
    const verbBlocks = verbeRefs.map(ref => {
      const v = DB_VERBS[ref.key];
      if (!v) return '';
      const pronoms = DB_PRONS_MC;
      const rows = v.conj.présent.map((f, i) =>
        `<div class="mooc-conj-row"><span class="mooc-conj-pron">${Security.esc(pronoms[i])}</span><span class="mooc-conj-form">${Security.esc(f)}</span></div>`
      ).join('');
      return `<div class="mooc-verb-box">
        <div class="mooc-verb-title">Conjugaison de « ${Security.esc(ref.key)} » (${Security.esc(v.mc)}) au présent</div>
        <div class="mooc-conj-grid">${rows}</div>
      </div>`;
    }).join('');

    root.innerHTML = `
      ${_progressHeader(lesson, 'Vocabulaire')}
      <div class="mooc-lesson-body">
        <div class="mooc-exo-label">📖 Vocabulaire de cette leçon</div>
        <div class="mooc-vocab-list">${rows}</div>
        ${verbBlocks}
        <button class="btn-red" onclick="Mooc.nextStep()" style="margin-top:16px">Continuer → Grammaire</button>
      </div>`;

    root.querySelectorAll('.speak-btn[data-speak]').forEach(btn => {
      btn.addEventListener('click', e => Audio.speak(e.currentTarget.dataset.speak, e, 'mc'));
    });
  }

  // ── Étape 2 : Fiche de grammaire ──────────────────────────────────────
  function _renderGrammaire(root, lesson) {
    root.innerHTML = `
      ${_progressHeader(lesson, 'Grammaire')}
      <div class="mooc-lesson-body">
        <div class="mooc-exo-label">📐 Point de grammaire</div>
        <div class="mooc-grammar-box">${Security.esc(lesson.grammaire.titre)}
          <div class="mooc-grammar-text">${Security.esc(lesson.grammaire.texte)}</div>
          ${lesson.grammaire.exemples ? `<div class="mooc-grammar-examples">${
            lesson.grammaire.exemples.map(ex => `<div class="mooc-grammar-example">${Security.esc(ex)}</div>`).join('')
          }</div>` : ''}
        </div>
        <button class="btn-red" onclick="Mooc.nextStep()" style="margin-top:16px">Continuer → Exercice 1</button>
      </div>`;
  }

  // ── Étape 3 : Thème (FR → MC, saisie libre, un mot/expression courte) ──
  function _renderTheme(root, lesson) {
    const items = lesson.exerciceTheme;
    if (S.themeIdx >= items.length) { nextStep(); return; }

    const item = items[S.themeIdx];
    const consigneR = resolveRef(item.consigne);
    if (!consigneR) { S.themeIdx++; _renderTheme(root, lesson); return; } // saute si cassé

    root.innerHTML = `
      ${_progressHeader(lesson, 'Thème')}
      <div class="mooc-lesson-body">
        <div class="mooc-exo-label">Exercice 1 — Traduisez en monégasque (${S.themeIdx + 1}/${items.length})</div>
        <div class="mooc-exo-consigne">${Security.esc(consigneR.fr)}</div>
        <input type="text" id="mooc-theme-input" class="mooc-input" placeholder="Votre réponse en monégasque…"
               autocomplete="off" spellcheck="false">
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn-red" onclick="Mooc.submitTheme()">Valider</button>
          <button class="btn-ghost" onclick="Mooc.skipTheme()">Je ne sais pas</button>
        </div>
        <div class="modal-status" id="mooc-theme-feedback"></div>
      </div>`;

    document.getElementById('mooc-theme-input')?.focus();
    document.getElementById('mooc-theme-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitTheme();
    });
  }

  function submitTheme() {
    const lesson = S.currentLesson;
    const item = lesson.exerciceTheme[S.themeIdx];
    const expectedR = resolveRef(item.reponseAttendue);
    const input = document.getElementById('mooc-theme-input');
    const userVal = input ? input.value : '';
    const correct = expectedR && _answersMatch(userVal, expectedR.mc);

    S.themeResults.push({ correct });
    const fb = document.getElementById('mooc-theme-feedback');
    if (correct) {
      fb.className = 'modal-status ok';
      fb.textContent = '✅ Correct !';
    } else {
      fb.className = 'modal-status err';
      fb.textContent = `❌ La bonne réponse était : ${expectedR ? expectedR.mc : '(mot indisponible)'}`;
    }
    if (input) input.disabled = true;
    setTimeout(() => { S.themeIdx++; _renderStep(); }, 1400);
  }

  function skipTheme() {
    S.themeResults.push({ correct: false, skipped: true });
    S.themeIdx++;
    _renderStep();
  }

  // ── Étape 4 : Phrase à compléter (traduire une phrase entière FR → MC) ──
  // Différent de l'exercice "thème" (un seul mot) : ici la consigne est une
  // phrase complète de DB_PHRASES, plus exigeant car il faut reproduire
  // l'ordre des mots et l'orthographe complète, pas juste un terme isolé.
  function _renderPhrase(root, lesson) {
    const items = lesson.exercicePhrase || [];
    if (!items.length) { nextStep(); return; }
    if (S.phraseIdx >= items.length) { nextStep(); return; }

    const item = items[S.phraseIdx];
    const consigneR = resolveRef(item.phraseRef);
    if (!consigneR) { S.phraseIdx++; _renderPhrase(root, lesson); return; }

    root.innerHTML = `
      ${_progressHeader(lesson, 'Phrase')}
      <div class="mooc-lesson-body">
        <div class="mooc-exo-label">Exercice 2 — Traduisez la phrase complète (${S.phraseIdx + 1}/${items.length})</div>
        <div class="mooc-exo-consigne">${Security.esc(consigneR.fr)}</div>
        <input type="text" id="mooc-phrase-input" class="mooc-input" placeholder="La phrase complète en monégasque…"
               autocomplete="off" spellcheck="false">
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn-red" onclick="Mooc.submitPhrase()">Valider</button>
          <button class="btn-ghost" onclick="Mooc.skipPhrase()">Je ne sais pas</button>
        </div>
        <div class="modal-status" id="mooc-phrase-feedback"></div>
      </div>`;

    document.getElementById('mooc-phrase-input')?.focus();
    document.getElementById('mooc-phrase-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitPhrase();
    });
  }

  function submitPhrase() {
    const lesson = S.currentLesson;
    const item = lesson.exercicePhrase[S.phraseIdx];
    const expectedR = resolveRef(item.phraseRef);
    const input = document.getElementById('mooc-phrase-input');
    const userVal = input ? input.value : '';
    const correct = expectedR && _answersMatch(userVal, expectedR.mc);

    S.phraseResults.push({ correct });
    const fb = document.getElementById('mooc-phrase-feedback');
    if (correct) {
      fb.className = 'modal-status ok';
      fb.textContent = '✅ Correct !';
    } else {
      fb.className = 'modal-status err';
      fb.textContent = `❌ La bonne réponse était : ${expectedR ? expectedR.mc : '(phrase indisponible)'}`;
    }
    if (input) input.disabled = true;
    setTimeout(() => { S.phraseIdx++; _renderStep(); }, 1800);
  }

  function skipPhrase() {
    S.phraseResults.push({ correct: false, skipped: true });
    S.phraseIdx++;
    _renderStep();
  }

  // ── Étape 5 : Texte à trous ───────────────────────────────────────────
  function _renderTrous(root, lesson) {
    const items = lesson.exerciceTrous;
    if (S.trousIdx >= items.length) { nextStep(); return; }

    const item = items[S.trousIdx];
    const phraseR = resolveRef(item.phraseRef);
    const motR = resolveRef(item.motATrou);
    if (!phraseR || !motR) { S.trousIdx++; _renderTrous(root, lesson); return; }

    // Remplace le mot ciblé par un trou dans la phrase MC affichée
    // (recherche insensible à la casse, mot entier)
    const re = new RegExp('(?<![\\p{L}\\p{N}])' + _escapeRegex(motR.mc) + '(?![\\p{L}\\p{N}])', 'iu');
    if (!re.test(phraseR.mc)) {
      // Le mot n'apparaît pas tel quel dans la phrase (variante orthographique
      // différente entre DB_WORDS et DB_PHRASES, cf. validateLesson) : on
      // saute cet item plutôt que d'afficher un exercice cassé silencieusement.
      console.warn('[Mooc] Trou impossible : "' + motR.mc + '" introuvable dans "' + phraseR.mc + '"');
      S.trousIdx++; _renderTrous(root, lesson); return;
    }
    const displayPhrase = phraseR.mc.replace(re, '____');

    root.innerHTML = `
      ${_progressHeader(lesson, 'Texte à trous')}
      <div class="mooc-lesson-body">
        <div class="mooc-exo-label">Exercice 2 — Complétez (${S.trousIdx + 1}/${items.length})</div>
        <div class="mooc-exo-phrase-mc">${Security.esc(displayPhrase)}</div>
        <div class="mooc-exo-phrase-fr">(${Security.esc(phraseR.fr)})</div>
        <input type="text" id="mooc-trous-input" class="mooc-input" placeholder="Le mot manquant…"
               autocomplete="off" spellcheck="false">
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn-red" onclick="Mooc.submitTrous()">Valider</button>
          <button class="btn-ghost" onclick="Mooc.skipTrous()">Je ne sais pas</button>
        </div>
        <div class="modal-status" id="mooc-trous-feedback"></div>
      </div>`;

    document.getElementById('mooc-trous-input')?.focus();
    document.getElementById('mooc-trous-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitTrous();
    });
  }

  function submitTrous() {
    const lesson = S.currentLesson;
    const item = lesson.exerciceTrous[S.trousIdx];
    const motR = resolveRef(item.motATrou);
    const input = document.getElementById('mooc-trous-input');
    const userVal = input ? input.value : '';
    const correct = motR && _answersMatch(userVal, motR.mc);

    S.trousResults.push({ correct });
    const fb = document.getElementById('mooc-trous-feedback');
    if (correct) {
      fb.className = 'modal-status ok';
      fb.textContent = '✅ Correct !';
    } else {
      fb.className = 'modal-status err';
      fb.textContent = `❌ Le mot manquant était : ${motR ? motR.mc : '(indisponible)'}`;
    }
    if (input) input.disabled = true;
    setTimeout(() => { S.trousIdx++; _renderStep(); }, 1400);
  }

  function skipTrous() {
    S.trousResults.push({ correct: false, skipped: true });
    S.trousIdx++;
    _renderStep();
  }

  // ── Étape 3 : Révision (réutilise le moteur Quiz existant) ───────────
  function _renderRevision(root, lesson) {
    root.innerHTML = `
      ${_progressHeader(lesson, 'Révision')}
      <div class="mooc-lesson-body">
        <div class="mooc-exo-label">Bonus — Révisez le vocabulaire de cette leçon en flashcards</div>
        <p style="font-size:.85rem;color:#777;margin-bottom:14px">
          Optionnel : ouvrez l'onglet Quiz dans un nouvel onglet du site pour réviser
          ces mots quand vous le souhaitez, ou continuez directement.
        </p>
        <button class="btn-red" onclick="Mooc.nextStep()">Terminer la leçon →</button>
      </div>`;
  }

  // ── Étape 7 : Fin de leçon, bilan + sauvegarde progression ───────────
  function _renderFin(root, lesson) {
    const totalTheme = S.themeResults.length;
    const okTheme = S.themeResults.filter(r => r.correct).length;
    const totalPhrase = S.phraseResults.length;
    const okPhrase = S.phraseResults.filter(r => r.correct).length;
    const totalTrous = S.trousResults.length;
    const okTrous = S.trousResults.filter(r => r.correct).length;
    const totalOk = okTheme + okPhrase + okTrous;
    const total = totalTheme + totalPhrase + totalTrous;
    const pct = total ? Math.round((totalOk / total) * 100) : 100;

    markLessonCompleted(lesson.id, pct);

    root.innerHTML = `
      ${_progressHeader(lesson, 'Terminé')}
      <div class="mooc-lesson-body" style="text-align:center">
        <div style="font-size:2.4rem;margin-bottom:8px">${pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
        <h3>Leçon terminée !</h3>
        <p style="font-size:1.1rem;margin:12px 0">Score : <strong>${totalOk}/${total}</strong> (${pct}%)</p>
        <button class="btn-red" onclick="Mooc.exitLesson()">Retour au parcours</button>
      </div>`;
  }

  return {
    init, renderMoocHome,
    resolveRef, validateLesson, isLessonCompleted, markLessonCompleted,
    startLesson, exitLesson, nextStep,
    submitTheme, skipTheme, submitPhrase, skipPhrase, submitTrous, skipTrous,
    _internal: { S, _normalize, _answersMatch }, // exposé pour tests uniquement
  };
})();
