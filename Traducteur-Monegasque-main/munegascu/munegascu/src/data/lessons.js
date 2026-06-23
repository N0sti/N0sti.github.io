/**
 * lessons.js — Münegascu
 * Catalogue des leçons du parcours d'apprentissage (MOOC).
 *
 * IMPORTANT : aucune traduction n'est jamais écrite en dur ici (sauf le
 * texte libre des fiches de grammaire, écrit à la main une fois, et
 * toujours une REFORMULATION PERSONNELLE — jamais une citation de la
 * Grammaire monégasque de Frolla). Chaque exercice référence un mot/verbe/
 * phrase par sa clé exacte ({type, key}). Le moteur (mooc.js, fonction
 * resolveRef) va chercher la traduction ACTUELLE dans DB_WORDS / DB_VERBS /
 * DB_PHRASES à chaque affichage — une correction validée dans le
 * dictionnaire se propage donc automatiquement à toutes les leçons qui
 * utilisent ce mot, sans avoir à toucher ce fichier.
 *
 * Format d'une leçon : dialogue -> fiche vocabulaire (avec conjugaison
 * des verbes) -> fiche de grammaire détaillée -> exercice thème (un mot)
 * -> exercice phrase (une phrase entière) -> exercice texte à trous ->
 * révision -> fin.
 *
 * CHOIX PÉDAGOGIQUE (23/06/2026, demande explicite de l'utilisateur) :
 * ce parcours vise un vrai apprentissage de fond, pas un exercice de
 * mémorisation superficielle. Les fiches de grammaire sont donc plus
 * détaillées qu'un simple rappel — elles couvrent systématiquement la
 * conjugaison par groupe, les temps, la négation, le système d'articles
 * et l'accord en genre/nombre, dès les premières leçons, pour donner aux
 * apprenants les fondations nécessaires à une vraie autonomie. Ce contenu
 * grammatical reste à faire relire par un locuteur natif avant publication
 * définitive.
 *
 * Avant d'ajouter une leçon, vérifier que toutes ses références existent
 * bien dans la base ET que les mots ciblés par un exercice à trous
 * apparaissent tel quel dans la phrase visée — cf. Mooc.validateLesson().
 * Plusieurs paires candidates ont été écartées pour cette raison
 * (Comment/Cuma vs cümu, Content/Cuntentu vs cuntentù, Police/Puliça vs
 * puleçia) — cf. NOTES_LINGUISTIQUES.md.
 */

const MOOC_LESSONS = [
  {
    id: 'lecon-01-salutations',
    niveau: 1,
    titre: 'Se présenter et saluer',
    ordreConseille: 1,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'mot', key: 'Bonjour' } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: "Bonjour, comment vous appelez-vous ?" } },
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "Je m'appelle" } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Je suis de Monaco' } },
    ],

    vocabulaireNouveau: [
      { type: 'mot', key: 'Bonjour' },
      { type: 'mot', key: 'Merci' },
      { type: 'mot', key: 'Comment' },
      { type: 'verbe', key: 'appeler' },
      { type: 'verbe', key: 'être' },
    ],

    grammaire: {
      titre: 'Le pronom sujet : présent mais souvent omis',
      texte: "En monégasque, chaque verbe se conjugue avec 6 personnes, exactement comme en français : Min (je), tü (tu), ëlu/ëla (il/elle), nui (nous), vui (vous), ëli/ële (ils/elles). La grande différence avec le français, c'est que ce pronom n'est presque jamais obligatoire devant le verbe : la terminaison du verbe suffit à elle seule à indiquer qui fait l'action, un peu comme en italien ou en espagnol. On garde le pronom uniquement pour insister sur la personne, ou pour éviter une ambiguïté quand le contexte ne suffit pas.\n\nAutre point essentiel dès cette première leçon : il existe trois grandes familles de verbes en monégasque (qu'on appelle des « groupes »), selon la terminaison de leur infinitif : les verbes en -À (le plus gros groupe, comme aimà = aimer), les verbes en -E (comme vende = vendre) et les verbes en -Ì (comme finì = finir). Chaque groupe a son propre jeu de terminaisons pour le présent, qu'on détaillera progressivement au fil des leçons — l'onglet Conjugaison du site donne le tableau complet pour chaque verbe.",
      exemples: [
        'Sun de Mùnegu = je suis de Monaco (pronom omis, normal)',
        'Min sun de Mùnegu = MOI je suis de Monaco (pronom gardé pour insister)',
        'Aimà (groupe en -À) : Aimu, Aimi, Aima, Aimamu, Aimè, Aimu = j\'aime, tu aimes, il/elle aime, nous aimons, vous aimez, ils/elles aiment',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Bonjour' }, reponseAttendue: { type: 'mot', key: 'Bonjour' } },
      { consigne: { type: 'mot', key: 'Merci' },   reponseAttendue: { type: 'mot', key: 'Merci' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: "Je m'appelle" } },
      { phraseRef: { type: 'phrase', key: 'Je suis de Monaco' } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: "J'aime Monaco" }, motATrou: { type: 'mot', key: 'Monaco' } },
    ],

    revisionQuizKeys: ['Bonjour', 'Merci', 'Comment'],
  },

  {
    id: 'lecon-02-etre-avoir',
    niveau: 1,
    titre: 'Être et avoir : les deux verbes indispensables',
    ordreConseille: 2,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'Je suis de Monaco' } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: "J'ai faim" } },
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "J'ai soif" } },
    ],

    vocabulaireNouveau: [
      { type: 'verbe', key: 'être' },
      { type: 'verbe', key: 'avoir' },
      { type: 'mot', key: 'Faim' },
    ],

    grammaire: {
      titre: 'Être et avoir sont irréguliers : à apprendre par cœur',
      texte: "Comme en français, « être » et « avoir » ne suivent les règles d'aucun des trois groupes réguliers — il faut mémoriser leurs 6 formes directement, sans pouvoir les déduire d'une règle générale. Ce sont aussi les deux verbes les plus utilisés de la langue, donc le temps investi à bien les retenir maintenant rentabilise tout le reste de l'apprentissage.\n\nRemarquez une construction très fréquente : pour exprimer une sensation physique (avoir faim, avoir soif, avoir froid, avoir chaud, avoir peur...), le monégasque utilise le verbe avoir suivi directement du nom de la sensation, exactement comme en français. C'est différent de l'anglais par exemple, qui utiliserait plutôt « être faim ».",
      exemples: [
        'Esse (être) : Sun, Si, Ë, Simu, Si, Sun',
        'Avè (avoir) : Ó, Ái, Á, Amu, Aví, Án',
        'Aïgu fame = j\'ai faim (avoir + faim, comme en français)',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Faim' }, reponseAttendue: { type: 'mot', key: 'Faim' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: "J'ai faim" } },
      { phraseRef: { type: 'phrase', key: "J'ai soif" } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: "J'ai faim" }, motATrou: { type: 'mot', key: 'Faim' } },
    ],

    revisionQuizKeys: ['Faim'],
  },

  {
    id: 'lecon-03-conjugaison-groupes',
    niveau: 1,
    titre: 'Conjuguer un verbe régulier au présent',
    ordreConseille: 3,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'Je ne comprends pas' } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Je ne sais pas' } },
    ],

    vocabulaireNouveau: [
      { type: 'verbe', key: 'parler' },
      { type: 'verbe', key: 'vendre' },
      { type: 'verbe', key: 'finir' },
    ],

    grammaire: {
      titre: 'Les 3 groupes de verbes réguliers',
      texte: "Une fois qu'on connaît le groupe d'un verbe régulier, on peut reconstruire toute sa conjugaison au présent à partir de son radical (l'infinitif sans sa terminaison finale).\n\nGroupe 1 (infinitif en -À, le plus nombreux) : on ajoute -u, -i, -a, -amu, -è, -u(n) au radical. Exemple avec parlà (parler), radical « parl- » : Parlu, Parli, Parla, Parlamu, Parlè, Parlu.\n\nGroupe 2 (infinitif en -E) : on ajoute -u, -i, -e, -ëmu, -í, -u(n). Exemple avec vende (vendre), radical « vend- » : Vendu, Vendi, Vende, Vendëmu, Vendí, Vendu.\n\nGroupe 3 (infinitif en -Ì) : la plupart des verbes de ce groupe insèrent « -isc- » avant la terminaison aux 4 premières personnes. Exemple avec finì (finir), radical « fin- » : Finisciu, Finisci, Finisce, Finiscemu, Finiscí, Finisciu.\n\nRemarquez que les terminaisons sont proches d'un groupe à l'autre (toujours -u à la 1re personne, -i à la 2e...) — une fois qu'on a repéré le schéma, il devient plus facile de deviner la forme d'un nouveau verbe régulier qu'on rencontre.",
      exemples: [
        'Groupe -À : Parlu, Parli, Parla, Parlamu, Parlè, Parlu (parler)',
        'Groupe -E : Vendu, Vendi, Vende, Vendëmu, Vendí, Vendu (vendre)',
        'Groupe -Ì : Finisciu, Finisci, Finisce, Finiscemu, Finiscí, Finisciu (finir)',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Comment' }, reponseAttendue: { type: 'mot', key: 'Comment' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: 'Je ne comprends pas' } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: "C'est bon" }, motATrou: { type: 'mot', key: 'Bon' } },
    ],

    revisionQuizKeys: [],
  },

  {
    id: 'lecon-04-negation-chiffres',
    niveau: 1,
    titre: 'Dire non et compter',
    ordreConseille: 4,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'Combien ça coûte ?' } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Je ne sais pas' } },
    ],

    vocabulaireNouveau: [
      { type: 'mot', key: 'Oui' },
      { type: 'mot', key: 'Non' },
      { type: 'mot', key: 'Un' },
      { type: 'mot', key: 'Deux' },
      { type: 'mot', key: 'Trois' },
    ],

    grammaire: {
      titre: 'Construire une phrase négative',
      texte: "Pour dire « ne... pas », on place « Nu » (parfois noté « Nun » selon les sources) directement avant le verbe conjugué — une seule particule, contrairement au français qui encadre le verbe avec « ne... pas ». Dans certaines phrases, on ajoute en plus « miga » à la fin, qui renforce la négation un peu comme « pas du tout » en français familier ; ce « miga » n'est pas systématique.\n\nLes deux formes « Nu » et « Nun » coexistent dans les sources disponibles sans qu'on ait pu déterminer avec certitude leur usage respectif (devant consonne/voyelle ? niveau de langue différent ?) — c'est un point que cette leçon laisse volontairement ouvert, à clarifier auprès d'un locuteur natif plutôt que de trancher arbitrairement.",
      exemples: [
        'Nu cümprendu miga = je ne comprends pas',
        'Sci = oui · Nun = non',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Oui' }, reponseAttendue: { type: 'mot', key: 'Oui' } },
      { consigne: { type: 'mot', key: 'Non' }, reponseAttendue: { type: 'mot', key: 'Non' } },
      { consigne: { type: 'mot', key: 'Deux' }, reponseAttendue: { type: 'mot', key: 'Deux' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: 'Je ne sais pas' } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: "C'est bon" }, motATrou: { type: 'mot', key: 'Bon' } },
    ],

    revisionQuizKeys: ['Oui', 'Non', 'Un', 'Deux', 'Trois'],
  },

  {
    id: 'lecon-05-famille-genre',
    niveau: 2,
    titre: 'La famille : repérer le masculin et le féminin',
    ordreConseille: 5,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'La famille est importante' } },
    ],

    vocabulaireNouveau: [
      { type: 'mot', key: 'Famille' },
      { type: 'mot', key: 'Père' },
      { type: 'mot', key: 'Mère' },
      { type: 'mot', key: 'Frère' },
      { type: 'mot', key: 'Sœur' },
    ],

    grammaire: {
      titre: 'Identifier le genre d\'un nom',
      texte: "Beaucoup de mots monégasques masculins se terminent en « -u » et beaucoup de mots féminins se terminent en « -a », un peu comme en italien ou en espagnol. C'est une tendance utile pour deviner le genre d'un nouveau mot, mais ce n'est pas une règle absolue : certains mots ne suivent pas ce schéma, ou se terminent par une autre lettre.\n\nDans le Dictionnaire de ce site, chaque mot affiche désormais un badge de genre à côté de sa traduction : gris si le genre a été estimé automatiquement à partir de la terminaison (donc pas garanti), vert si un genre a été confirmé par un administrateur ou un locuteur natif. Vous pouvez cliquer sur un badge gris pour proposer vous-même une correction si vous savez mieux — c'est ainsi que le dictionnaire se fiabilise progressivement.",
      exemples: [
        'Famiggia (féminin, finit en -a)',
        'Garçun (masculin, finit en -u)',
        'Le genre de « Mer » et « Maison » est actuellement marqué comme estimation dans le dictionnaire — un bon exemple à vérifier vous-même !',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Père' }, reponseAttendue: { type: 'mot', key: 'Père' } },
      { consigne: { type: 'mot', key: 'Mère' }, reponseAttendue: { type: 'mot', key: 'Mère' } },
      { consigne: { type: 'mot', key: 'Famille' }, reponseAttendue: { type: 'mot', key: 'Famille' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: 'La famille est importante' } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: 'La famille est importante' }, motATrou: { type: 'mot', key: 'Famille' } },
    ],

    revisionQuizKeys: ['Famille', 'Père', 'Mère', 'Frère', 'Sœur'],
  },

  {
    id: 'lecon-06-singulier-pluriel-articles',
    niveau: 2,
    titre: 'Le pluriel et les articles',
    ordreConseille: 6,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'Nous allons au marché' } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Quelle heure est-il ?' } },
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'Je reviendrai demain' } },
    ],

    vocabulaireNouveau: [
      { type: 'mot', key: 'Marché' },
      { type: 'mot', key: 'Heure' },
      { type: 'mot', key: 'Demain' },
    ],

    grammaire: {
      titre: 'Former le pluriel et utiliser les articles',
      texte: "Règle générale du pluriel : les noms masculins prennent un « -i » final, les noms féminins prennent un « -e » final (à la place de leur voyelle finale du singulier). Il existe quelques cas particuliers, notamment des mots en « -cu »/« -gu » qui ajoutent un h avant la terminaison pour conserver le même son — vous les rencontrerez progressivement.\n\nPour les articles définis (le/la/les), le monégasque distingue masculin et féminin, singulier et pluriel : « u » pour « le », « a » pour « la », « i » pour « les » masculin, « ë » pour « les » féminin. Devant une voyelle, ces articles s'élident en général en « l' ». L'article indéfini (un/une) se dit « ün » au masculin et « üna » au féminin ; au pluriel, « un/une » devient simplement « de » pour les deux genres (équivalent du partitif français « des »). « Au » dans « au marché » est une contraction de la préposition « a » (à) et de l'article « u » (le), comme « à + le = au » en français.",
      exemples: [
        'Gattu (un chat) -> Gatti (des chats), masculin',
        'U mare = la mer (article masculin malgré la traduction féminine en français)',
        'Andemu au mercau = nous allons au marché (au = a + u)',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Heure' }, reponseAttendue: { type: 'mot', key: 'Heure' } },
      { consigne: { type: 'mot', key: 'Demain' }, reponseAttendue: { type: 'mot', key: 'Demain' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: 'Quelle heure est-il ?' } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: 'Nous allons au marché' }, motATrou: { type: 'mot', key: 'Marché' } },
      { phraseRef: { type: 'phrase', key: 'Je reviendrai demain' }, motATrou: { type: 'mot', key: 'Demain' } },
    ],

    revisionQuizKeys: ['Marché', 'Heure', 'Demain'],
  },

  {
    id: 'lecon-07-meteo-temps-verbaux',
    niveau: 2,
    titre: 'La météo et les autres temps : passé, futur',
    ordreConseille: 7,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "Il fait beau aujourd'hui" } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Le vent souffle fort' } },
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "Il fait froid" } },
    ],

    vocabulaireNouveau: [
      { type: 'verbe', key: 'faire' },
      { type: 'mot', key: 'Vent' },
      { type: 'mot', key: 'Chaud' },
      { type: 'mot', key: 'Froid' },
    ],

    grammaire: {
      titre: 'Au-delà du présent : imparfait, futur, conditionnel',
      texte: "« Fa » (il fait) est la 3e personne du verbe irrégulier « faire », utilisé comme en français pour parler du temps qu'il fait. C'est l'occasion de voir comment un verbe change selon le temps grammatical employé, en partant d'un verbe régulier comme aimà (aimer) :\n\n- Présent (l'action a lieu maintenant) : Aimu, Aimi, Aima...\n- Imparfait (action passée, habituelle ou en cours) : Aimavu, Aimavi, Aimava...\n- Futur (action à venir) : Aimeró, Aimerái, Aimerà...\n- Conditionnel (action hypothétique, ou formule de politesse) : Aimerëssa, Aimerëssi, Aimerëssa...\n\nLe futur et le conditionnel se construisent tous les deux sur l'infinitif du verbe (sans sa dernière lettre), suivi d'une terminaison spécifique à chaque temps — une logique assez proche de celle du français (« aimer » + « ai » = « aimerai »). Attention aussi à deux adjectifs proches mais différents : « frais » (Frescu) et « froid » (Freidu) ne se traduisent pas par le même mot, malgré leur ressemblance en français.",
      exemples: [
        'Aimu (présent) -> Aimavu (imparfait) -> Aimeró (futur) -> Aimerëssa (conditionnel)',
        'Fa freidu = il fait froid (pas Frescu, qui veut dire frais)',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Vent' }, reponseAttendue: { type: 'mot', key: 'Vent' } },
      { consigne: { type: 'mot', key: 'Chaud' }, reponseAttendue: { type: 'mot', key: 'Chaud' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: "Il fait beau aujourd'hui" } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: 'Le vent souffle fort' }, motATrou: { type: 'mot', key: 'Vent' } },
      { phraseRef: { type: 'phrase', key: "Il fait chaud aujourd'hui" }, motATrou: { type: 'mot', key: 'Chaud' } },
      { phraseRef: { type: 'phrase', key: "Il fait froid" }, motATrou: { type: 'mot', key: 'Froid' } },
    ],

    revisionQuizKeys: ['Vent', 'Chaud', 'Froid'],
  },

  {
    id: 'lecon-08-restaurant-politesse',
    niveau: 3,
    titre: 'Au restaurant : la politesse et le conditionnel',
    ordreConseille: 8,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "Un café s'il vous plaît" } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Je voudrais une table pour deux' } },
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "L'addition s'il vous plaît" } },
    ],

    vocabulaireNouveau: [
      { type: 'verbe', key: 'vouloir' },
      { type: 'mot', key: 'Café' },
      { type: 'mot', key: 'Cher' },
    ],

    grammaire: {
      titre: 'Demander poliment avec le conditionnel',
      texte: "Pour demander quelque chose poliment, le monégasque utilise le conditionnel du verbe vouloir (vurè), exactement comme « je voudrais » est plus poli que « je veux » en français. C'est la formule à privilégier pour commander au restaurant ou demander un service à quelqu'un qu'on ne connaît pas bien.\n\n« Pe piasé » (s'il vous plaît) peut s'ajouter à la fin de presque n'importe quelle demande pour la rendre plus courtoise, sans changer la construction de la phrase.",
      exemples: [
        'Vágliu = je veux (direct, un peu abrupt)',
        'Vurerëssa = je voudrais (poli, conditionnel)',
        'Un cafè, pe piasé = un café, s\'il vous plaît',
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Café' }, reponseAttendue: { type: 'mot', key: 'Café' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: 'Je voudrais une table pour deux' } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: "Un café s'il vous plaît" }, motATrou: { type: 'mot', key: 'Café' } },
    ],

    revisionQuizKeys: ['Café', 'Cher'],
  },

  {
    id: 'lecon-09-urgences-imperatif',
    niveau: 3,
    titre: "Demander de l'aide et donner un ordre",
    ordreConseille: 9,

    dialogue: [
      { locuteur: 'A', phraseRef: { type: 'phrase', key: "Pouvez-vous m'aider ?" } },
      { locuteur: 'B', phraseRef: { type: 'phrase', key: 'Y a-t-il un médecin ?' } },
      { locuteur: 'A', phraseRef: { type: 'phrase', key: 'Bonne chance !' } },
    ],

    vocabulaireNouveau: [
      { type: 'verbe', key: 'pouvoir' },
      { type: 'mot', key: 'Médecin' },
    ],

    grammaire: {
      titre: "L'impératif : donner un ordre ou un conseil",
      texte: "« Pudèi » (pouvez-vous) vient du verbe irrégulier pouvoir (purè) — une façon polie et directe de demander un service. Pour donner un ordre ou un conseil direct (sans passer par une question), le monégasque utilise un mode verbal séparé : l'impératif. Comme dans beaucoup de langues romanes, l'impératif n'a pas de 1re personne du singulier (on ne se donne pas un ordre à soi-même), et utilise généralement les mêmes terminaisons que le présent pour les autres personnes, avec parfois de petites variations selon le groupe du verbe — consultez l'onglet Conjugaison pour voir l'impératif complet de n'importe quel verbe de la base.",
      exemples: [
        'Pudèi repetì ? = pouvez-vous répéter ?',
        "L'impératif de aimà : (—), Aima, Aime, Aimamu, Aimè, Aimu = (pas de 1re pers.), aime, qu'il aime, aimons, aimez, qu'ils aiment",
      ],
    },

    exerciceTheme: [
      { consigne: { type: 'mot', key: 'Médecin' }, reponseAttendue: { type: 'mot', key: 'Médecin' } },
    ],

    exercicePhrase: [
      { phraseRef: { type: 'phrase', key: "Pouvez-vous m'aider ?" } },
    ],

    exerciceTrous: [
      { phraseRef: { type: 'phrase', key: 'Y a-t-il un médecin ?' }, motATrou: { type: 'mot', key: 'Médecin' } },
    ],

    revisionQuizKeys: ['Médecin'],
  },
];
