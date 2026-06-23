# Notes linguistiques — Traducteur Münegascu

Ce document recense les sources utilisées pour la mise à jour du contenu
linguistique du 22/06/2026, et les points qui restent à valider par un
locuteur natif ou un expert (voir aussi `Relecture-Munegascu.docx` fourni
séparément, qui couvre le contenu antérieur à cette mise à jour).

## Sources principales de cette mise à jour

1. **Grammaire monégasque**, R.P. Louis Frolla, rédigée sur instruction du
   Gouvernement Princier, 1ère édition 1960, réédition Comité National des
   Traditions Monégasques (CNTM). 128 pages — fournie par l'utilisateur
   (scan OCR, fichier `128p_Grammaire-2.pdf`).
2. **Dictionnaire français-monégasque**, R.P. Louis Frolla, 1963, réédition
   CNTM (fac-similé). Fourni par l'utilisateur (`Dico_Fr_Mc_TXT.pdf`).
3. **Dictionnaire monégasque-français**, R.P. Louis Frolla, 1963, réédition
   CNTM (fac-similé). Fourni par l'utilisateur (`Dico_Mc_Fr_TXT_Dico-1.pdf`
   et `Dico_Mc_Fr_TXT_Ouverture.pdf`).
4. Académie des Langues Dialectales de Monaco (ald-monaco.org) : « Éléments
   de grammaire monégasque » et « Écrire en monégasque : l'orthographe »
   (Éliane Mollo & Dominique Salvo), « Petit glossaire monégasque ».

Ces ouvrages sont d'authentiques publications officielles (rééditées avec
l'appui du Gouvernement Princier), bien plus fiables que les sources web
généralistes utilisées dans une précédente itération de ce projet.

## Ce qui a été corrigé

### Pronoms personnels sujets
Toutes les occurrences (`DB_PRONS_MC` dans `database.js`, les entrées de
catégorie "pronom" dans `DB_WORDS`, et le tableau statique de l'onglet
Grammaire dans `index.html`) sont maintenant cohérentes :

| Personne | Avant (non sourcé) | Maintenant (Frolla, Grammaire Ch. V) |
|---|---|---|
| je | Mi | **Min** |
| tu | Ti | **Tü** |
| il/elle | Elu/Ela | **Ëlu/Ëla** |
| nous | Nui | Nui *(déjà correct)* |
| vous | Vui | Vui *(déjà correct)* |
| ils/elles | Eri/Ere | **Ëli/Ële** |

### Chiffres
Plusieurs chiffres étaient de l'italien standard plutôt que du monégasque.
Corrigés contre le Dictionnaire Frolla (entrées vérifiées une par une) :

| FR | Avant | Maintenant |
|---|---|---|
| un | Un | **Ün** |
| quatre | Quatre | **Qatru** |
| cinq | Cinque | **Çinqe** |
| sept | Sette | **Sete** |
| neuf | Nùve | **Nœve** |
| dix | Diese | **Dèije** |
| cent | Centu | **Çentu** |
| mille | Mille | **Mila** |
| non | Nu | **Nun** |

### Les 33 conjugaisons verbales
Entièrement réécrites. L'ancienne base utilisait des terminaisons calquées
sur l'italien standard (`-iamo`, `-isti`, `-erò`...), sans source. Les
nouvelles conjugaisons suivent :
- pour **être, avoir, aller, donner, faire, savoir, pouvoir, vouloir** :
  les tableaux complets et irréguliers donnés par Frolla (pages 41-46,
  69-72 de la Grammaire) ;
- pour **dire, venir** : radical irrégulier au présent, mais désinences
  standard ailleurs (voir « Points à valider » ci-dessous) ;
- pour les **23 autres verbes** : les désinences régulières du tableau
  synoptique (Grammaire Frolla p.67) appliquées à l'infinitif vérifié
  contre le Dictionnaire français-monégasque.

### Articles
Le tableau statique de l'onglet Grammaire utilisait des formes non
sourcées (`U/U'`, `Di/De` pour le pluriel indéfini). Remplacé par les
formes du Chapitre II de la Grammaire Frolla : **u/řu, a/řa** (singulier
défini), **i/ři, ë/řë** (pluriel défini), **ün/üna** (indéfini singulier),
**de** (pluriel indéfini = partitif).

## Points encore incertains — à faire valider par un locuteur natif

- **dire** : l'infinitif est noté « di » par Frolla, mais le présent
  attesté dans le corps de l'ouvrage est « digu » (radical "dig-"), et le
  futur attesté est « digherù ». Aucun tableau complet dédié à ce verbe
  n'est donné — les formes manquantes ont été déduites par analogie avec
  d'autres verbes du 2e groupe, pas vérifiées directement.
- **venir** : même situation. Infinitif « vegnì », présent attesté « vegnu »
  (« Ne vegnu » = j'en viens), futur attesté « vegnerà ». Participe passé
  « vegnüu » signalé par Frolla comme l'unique exception au participe en
  -iu du 3e groupe. Les formes intermédiaires (imparfait, conditionnel,
  subjonctif) sont déduites par régularité, pas attestées individuellement.
- **partir** : le Dictionnaire Frolla donne directement « parte » comme
  infinitif (« le train part de Monaco » = « u tren parte da Munegu »).
  Mais la Grammaire mentionne par ailleurs un verbe distinct « purtì »
  (note de bas de page : « à ne pas confondre avec purtì, partir »).
  Conservé « parte » car c'est la forme du dictionnaire, mais à confirmer.
- **pouvoir / vouloir** : Frolla indique que ces deux verbes ont *deux*
  formes possibles au conditionnel présent (ex. purëssa *ou* purerëssa).
  Une seule des deux formes est actuellement affichée dans l'app ; l'autre
  est notée en commentaire dans le code mais pas montrée à l'utilisateur.
- **Nu vs Nun** (négation) : le Dictionnaire Frolla donne les deux formes
  « non, nun » sans préciser leur usage respectif. La base de données
  utilise maintenant « Nun », mais l'exemple de négation dans l'onglet
  Grammaire (« Nu cümprendu miga ») utilise encore l'ancienne forme « Nu »
  et n'a pas été changé par cohérence avec le reste de cette phrase
  d'exemple, à clarifier avec un locuteur natif.
- **finì (finir), imparfait** : Frolla donne deux formes concurrentes pour
  l'imparfait de ce verbe (« finiscëvu *ou* finivu »). Seule la première
  (avec le suffixe inchoatif -isc-) a été retenue dans le code.

## Verbes ajoutés le 22/06/2026 (deuxième vague)

18 verbes supplémentaires, portant le total à 51. Tous vérifiés contre le
Dictionnaire français-monégasque de Frolla, désinences appliquées selon le
même tableau synoptique que la première vague.

| FR | MC (infinitif) | Groupe | Remarque |
|---|---|---|---|
| rester | stà | irrégulier (1ère conj.) | même patron que andà/dà/fà (radical "st-") |
| penser | pensà | 1er | — |
| fermer | serrà | 1er | — |
| regarder | gardà | 1er | Frolla donne aussi « resgardà » |
| arriver | arrivà | 1er | — |
| travailler | travayà | 1er | — |
| acheter | catà | 1er | Frolla donne aussi « achistà » |
| attendre | aspetà | 1er | Frolla donne aussi « spetà », « sperà » |
| aider | agiütà | 1er | — |
| écouter | scutà | 1er | — |
| oublier | scurdà | 1er | Frolla donne aussi « ublià » |
| devoir | devè | 2e | participe « devüu » |
| sortir | sorte | 2e | participe « surtiu » |
| ouvrir | iœvre | 2e | participe fort « iüvertu » |
| entendre | sente | 2e | **même radical attesté pour « sentir »** — possible confusion entre les deux verbes français, à vérifier |
| mettre | mete | 2e | participe fort « messu » |
| choisir | çerne | 2e | Frolla donne aussi « sciuasì » (3e groupe) |
| comprendre | capì | 3e | participe « capiu » |

### Points à valider pour cette deuxième vague

- **entendre / sentir** : le dictionnaire Frolla semble utiliser le même
  verbe « sente » pour les deux sens français, comme en italien
  (« sentire »). Seul « entendre » a été ajouté à la base pour l'instant ;
  ajouter aussi « sentir » créerait un doublon avec la même conjugaison,
  ce qui n'est pas forcément un problème mais mérite confirmation par un
  locuteur natif avant de le faire.
- **regarder, acheter, attendre, choisir, oublier** : Frolla donne dans
  chaque cas *au moins deux* traductions possibles. Seule la première a
  été retenue dans le code ; les autres sont notées en commentaire.
- **demander** et **entrer** : recherchés mais non trouvés comme entrée
  claire dans le dictionnaire numérisé (seulement des locutions). Non
  ajoutés par prudence plutôt que de deviner une forme.

## Verbes ajoutés le 22/06/2026 (troisième vague — 92 verbes, total 143)

### Méthode et changement d'approche en cours de route

Une première tentative d'extraction automatique de tous les verbes du
Dictionnaire français-monégasque a été lancée (recherche de toute entrée
marquée « v. », « vi. », « vpr. » dans les ~800 pages). Cette extraction a
produit environ 1600 candidats, mais un échantillonnage de contrôle a
révélé un taux d'erreur trop élevé pour une intégration directe : erreurs
d'OCR systématiques (confusion « ì » final lu comme « l », confusion
ponctuelle « e »/« c », mots coupés par la mise en page en deux colonnes),
de l'ordre de 5% des entrées vérifiées une par une contre l'image source.

**Décision prise** : abandonner cette extraction de masse non vérifiée, et
se concentrer sur une source plus fiable repérée en cours de route : une
**annexe dédiée** du dictionnaire (pages 417-419, intitulée *« Participes
passés des verbes du 2e groupe d'utilisation courante »*), qui liste environ
110 verbes irréguliers du 2e groupe avec leur radical au présent ET leur
participe passé, dans un tableau structuré — bien plus fiable qu'une
extraction dispersée dans le corps du texte. Cette annexe a été lue et
saisie **visuellement** (image du PDF, pas l'OCR) pour garantir l'exactitude.

90 verbes de cette annexe ne faisaient pas encore partie de la base (les 21
autres étaient déjà présents, ce qui a permis une validation croisée
rassurante : nos verbes précédents correspondent à cette source de référence).
3 verbes supplémentaires (valoir, prévaloir, falloir) suivent un patron
différent (2e conjugaison irrégulière en *-è* tonique, comme savoir/pouvoir/
vouloir) et ont été construits par analogie, pas extraits de cette annexe.

### Points à valider pour cette troisième vague

- **valoir / prévaloir** : aucune conjugaison complète n'est donnée par
  Frolla pour ces deux verbes (seul l'infinitif « varè »/« prevarè » et le
  participe sont attestés). Les formes du présent/imparfait/futur ont été
  **déduites par analogie** avec savoir/pouvoir/vouloir (même structure de
  2e conjugaison irrégulière), mais ne sont pas individuellement attestées.
  La grammaire signale même que « varè » se confond partiellement avec
  « andà » à certains temps (p.72) — possible source d'erreur additionnelle.
- **falloir** : verbe impersonnel et défectif confirmé par Frolla lui-même
  (grammaire p.72). Seule la 3e personne du singulier est donc remplie dans
  la base ; toutes les autres cases affichent « — ». Les formes à
  l'imparfait/futur/conditionnel de cette 3e personne sont déduites par
  régularité, non attestées individuellement par Frolla.
- **entendre** : ce verbe a en réalité **deux sens distincts** en monégasque
  avec deux verbes différents — « ouïr » (sente, déjà dans la base depuis la
  deuxième vague) et « comprendre » (üntende, ajouté séparément dans cette
  vague sous le nom « entendre comprendre »). Le traducteur ne propose
  actuellement que l'un ou l'autre selon la recherche exacte ; un utilisateur
  tapant juste « entendre » au sens large ne verra qu'un seul des deux sens
  selon l'ordre interne de la base — amélioration possible plus tard
  (proposer les deux sens au choix).
- **1500+ verbes non utilisés** : la tentative d'extraction automatique a
  identifié environ 1500 verbes additionnels (après nettoyage partiel) qui
  ne sont PAS dans la base, le taux d'erreur résiduel ayant été jugé trop
  élevé. Cette liste brute reste disponible dans les fichiers de travail
  (`verbs_really_clean.json`) pour une reprise future, mais nécessiterait
  une vérification visuelle systématique page par page avant intégration —
  gros chantier à part, pas fait dans cette session.

## Verbes ajoutés le 22/06/2026 (quatrième vague — 50 verbes, total 193)

### Méthode : partir de la fréquence d'usage réelle, pas du dictionnaire

Pour les trois premières vagues, les verbes ajoutés provenaient directement
des sources monégasques (grammaire, dictionnaires), sans lien avec leur
fréquence d'usage en français. Cette quatrième vague inverse l'approche :
on est parti du **classement des verbes français les plus employés au
quotidien** (référence académique « Dictionnaire des fréquences », corpus
Brunet, citée par plusieurs ressources de conjugaison française ; environ
129 verbes couvrent l'essentiel des usages courants du français), puis on
a cherché lesquels manquaient encore dans la base.

Sur 127 verbes de cette liste de référence, 63 étaient déjà couverts par les
vagues précédentes. Les 64 manquants ont été recherchés un par un dans le
Dictionnaire français-monégasque ; 50 ont été trouvés avec une traduction
claire et non ambiguë, et ajoutés selon la même méthode que d'habitude
(désinences régulières du tableau synoptique p.67 appliquées à l'infinitif
vérifié).

### Verbes cherchés mais non ajoutés (sur les 64 manquants)

Pour les 14 verbes restants, soit aucune entrée claire n'a été trouvée dans
le dictionnaire numérisé, soit la traduction trouvée était trop ambiguë pour
être intégrée sans risque :
- **entrer**, **annoncer** : aucune entrée principale trouvée (seulement des
  locutions composées), comme déjà signalé pour d'autres verbes en vague 2.
- **sentir** : déjà couvert — ce verbe partage la même traduction que
  « entendre (ouïr) » en monégasque (« sente »), pas besoin de doublon.
- **baisser**, **pousser** (sens physique) : seules des formes pronominales
  ou figurées ont été trouvées (« s'ümilià », « se pussà »), le sens de base
  reste incertain.
- **échouer** : traduit par une locution (« fa fiascu », littéralement « faire
  fiasco »), pas par un verbe simple conjugable — non intégré au conjugueur
  pour cette raison, mais pourrait être ajouté côté phrases/locutions.
- **redouter**, **souvenir** (verbe), **rêver**, **goûter**, **rajeunir**,
  **exister**, **garder** (sens distinct de « occuper ») : non trouvés avec
  une confiance suffisante dans le temps disponible pour cette session.

### Reconnaissance des formes conjuguées françaises étendue en parallèle

Au-delà du conjugueur, le moteur de traduction principale reconnaît
maintenant les formes fléchies françaises de ces 50 nouveaux verbes
quand elles sont tapées dans une phrase (ex. « je cherche », « nous
changeons », « tu commences »). Ces formes ont été **générées
automatiquement** par des règles de conjugaison française standard
(1er groupe en -er, 2e groupe régulier en -ir type « finir »), incluant
la gestion des particularités orthographiques (commencer → nous
commen**ç**ons, changer → nous change**ons**). Cette génération concerne
la reconnaissance du **français** tapé par l'utilisateur, indépendamment
des conjugaisons **monégasques** elles-mêmes (qui restent sourcées comme
expliqué plus haut, jamais générées par règle générique sans vérification).

## Vocabulaire et verbes ajoutés le 23/06/2026 (cinquième vague — 341 mots, 144 verbes)

### Méthode : couvrir le maximum d'usage avec le minimum de mots

Cette vague répond à un objectif explicite : trouver le meilleur ratio entre
couverture de l'usage courant du français et nombre de mots à ajouter, pour
qu'un visiteur tapant une phrase ordinaire ne tombe pas systématiquement sur
des mots absents de la base.

La référence utilisée est la **liste de fréquence lexicale d'Étienne Brunet**
(environ 1500 mots), utilisée par l'Éducation nationale française (Éduscol)
pour bâtir des progressions de vocabulaire à l'école. Cette liste classe les
mots par nombre d'occurrences réel dans un grand corpus de textes (litté-
raires et non littéraires), toutes catégories grammaticales confondues
(substantifs, verbes, adjectifs, adverbes). Trois documents PDF de cette
liste ont été fournis par l'utilisateur (table par nature/fréquence, table
alphabétique, table hiérarchique) et utilisés pour cette extension.

### Démarche suivie

1. Extraction des mots les plus fréquents de chaque catégorie (substantifs,
   adjectifs, adverbes — les verbes les plus fréquents avaient déjà été
   traités lors d'une vague précédente).
2. Croisement avec la base existante pour ne garder que les mots manquants,
   en conservant l'ordre de fréquence (les plus utilisés cherchés en premier).
3. Recherche de chaque mot manquant dans le Dictionnaire français-monégasque
   de Frolla, un par un, sans extraction automatique de masse (pour éviter
   le taux d'erreur OCR rencontré lors d'une tentative précédente).
4. Pour les verbes manquants : même démarche, puis génération de la
   conjugaison complète (6 temps) via le tableau synoptique des désinences
   régulières déjà validé dans les vagues précédentes.

### Couverture atteinte

Sur les ~640 substantifs les plus fréquents de la liste Brunet, environ 460
manquaient avant cette vague ; environ 280 ont été trouvés et ajoutés (le
reste — mots comme « étude », « groupe », « âge », « société », « vérité »,
« docteur » — n'a pas d'entrée directe dans le dictionnaire Frolla, qui est
un dictionnaire de patois traditionnel plutôt qu'un dictionnaire encyclo-
pédique moderne ; ces mots resteraient à chercher dans une version élargie
ou à proposer comme néologismes par un locuteur natif).

Sur les verbes les plus fréquents restants après la vague précédente, environ
163 manquaient ; 144 ont été trouvés et ajoutés selon la même méthode.

### Cas particuliers traités à la main

- **satisfaire** : construit par préfixation « Salis- » sur la conjugaison
  irrégulière complète de « faire » (cohérent avec l'étymologie latine
  *satis-facere*) — forme déduite par analogie, non individuellement
  attestée dans les sources, à valider par un locuteur natif.
- Quelques mots ont des homonymes ou plusieurs traductions possibles chez
  Frolla (ex. « milieu » et « moyen » partagent tous les deux « mesu » dans
  certains sens) — seule la forme la plus directement attestée a été retenue
  pour chaque entrée, les autres traductions possibles ne sont pas affichées.

### Ce qui reste hors de portée de cette vague

Plusieurs centaines de mots et verbes de la liste de fréquence Brunet
restent absents de la base : soit ils n'ont pas d'entrée claire dans le
dictionnaire Frolla (vocabulaire trop abstrait, institutionnel ou moderne
pour un dictionnaire de patois traditionnel), soit leur recherche n'a pas
été menée par manque de temps dans cette session. La liste complète des
mots de la référence Brunet non encore traités reste consultable dans les
PDF sources fournis par l'utilisateur, pour une reprise future par lots.

## Fichiers sources fournis (non inclus dans ce zip)

Les PDF originaux (`128p_Grammaire-2.pdf`, `Dico_Fr_Mc_TXT.pdf`,
`Dico_Mc_Fr_TXT_Dico-1.pdf`, `Dico_Mc_Fr_TXT_Ouverture.pdf`) restent la
référence en cas de doute sur une forme. Le dictionnaire français-monégasque
en particulier contient ~800 pages de vocabulaire qui n'ont pas encore été
systématiquement comparées au contenu de `database.js` (1105 mots) — un
travail de fond reste possible ici pour qui veut pousser la précision
encore plus loin.

Trois documents PDF supplémentaires ont aussi été fournis pour cette
cinquième vague : la liste de fréquence lexicale d'Étienne Brunet (table par
nature/fréquence, table alphabétique, table hiérarchique, ~1500 mots les
plus employés du français). Une bonne partie de cette liste reste encore à
traiter pour de futures vagues d'extension du vocabulaire.

## Genre grammatical des mots monégasques (ajouté le 23/06/2026)

### Pourquoi une heuristique plutôt qu'une vérification systématique

Pour construire des phrases génératives correctes pour le futur MOOC
(articles « u »/« a », accords...), chaque mot a besoin d'un genre
grammatical. Mais le Dictionnaire français-monégasque de Frolla indique le
genre du mot **français** (sf/sm), pas forcément celui du mot **monégasque**
correspondant — les deux peuvent différer. Vérifier individuellement le
genre monégasque réel des 1105 mots de la base aurait été un chantier à part
entière, trop long pour être fait avant de pouvoir commencer à utiliser
cette donnée.

**Décision retenue** : une heuristique simple est appliquée automatiquement
à tous les mots — un mot monégasque terminé en « -a » est supposé féminin
(cohérent avec les langues romanes voisines : italien, espagnol, latin),
tout le reste est supposé masculin par défaut. Cette heuristique est
**connue pour être imparfaite** (elle se base sur la terminaison du mot
monégasque, qui ne reflète pas toujours fidèlement le genre réel).

### Fiabilisation progressive par la communauté

Plutôt que de bloquer l'usage du genre en attendant une vérification
exhaustive, le dictionnaire affiche le genre déduit avec sa source
clairement indiquée :
- `genreSource: "heuristique"` — badge gris dans le dictionnaire, cliquable
  pour proposer une correction.
- `genreSource: "validé"` — badge vert, genre confirmé par un administrateur,
  plus jamais recalculé automatiquement.

Tout visiteur peut cliquer sur le badge de genre d'un mot dans l'onglet
Dictionnaire pour proposer le genre correct (masculin/féminin) via une
modale dédiée. La proposition est mise en file d'attente
(`State.genreSuggestions`) et apparaît dans le panneau admin existant,
onglet « Suggestions », sous une sous-section dédiée aux genres — même
circuit de validation que les suggestions de traduction déjà en place.
Une fois validée, le mot passe en `genreSource: "validé"` et son genre
n'est plus jamais recalculé.

Cette approche permet au dictionnaire de se fiabiliser progressivement par
l'usage réel, plutôt que de dépendre d'une seule vérification initiale
exhaustive qui aurait retardé tout le reste. Elle prépare aussi le terrain
pour le Chantier 1bis de la roadmap (crowdsourcing de relecture), qui
pourra réutiliser le même mécanisme pour d'autres types de corrections.

**Modification directe par l'admin (ajouté le 23/06/2026)** : au-delà du
circuit suggestion/validation, l'onglet « Base de données » du panneau
admin affiche désormais une colonne Genre éditable directement (simple
sélecteur Masculin/Féminin) sur chaque mot, à côté de la catégorie. Ça
couvre le cas d'un mauvais clic ou d'une proposition communautaire
imprécise : l'admin garde toujours la main pour corriger directement,
sans devoir passer par le circuit de suggestion. Comme pour une
validation, choisir un genre ici le marque automatiquement
`genreSource: 'validé'`. Testé explicitement : modifier le genre de
« Bonjour » via ce sélecteur le fait passer en
`{genre:'f', genreSource:'validé'}` immédiatement.

### Limite actuelle (état en mémoire, pas de vraie persistance)

Comme tout le reste du site, `State.genreSuggestions` et les genres validés
vivent uniquement en mémoire du navigateur tant que la page n'est pas
rechargée — il n'y a pas encore de vraie base de données persistante (cf.
Chantier 0 d'architecture évoqué mais pas encore lancé). Concrètement, les
propositions et validations faites par un visiteur ne sont pas partagées
avec les autres visiteurs ni conservées après un rechargement de page. Cette
fonctionnalité est donc une démonstration du mécanisme et de l'expérience
utilisateur, prête à être branchée sur une vraie base de données dès que ce
chantier d'architecture sera fait.

## MOOC — Parcours d'apprentissage (ajouté le 23/06/2026)

### Architecture : référencement par clé, jamais de texte traduit en dur

Chaque leçon (`src/data/lessons.js`) référence les mots/phrases utilisés par
une clé exacte (`{type:'mot'|'phrase'|'verbe', key:'...'}`), jamais par leur
traduction stockée directement. Le moteur (`src/js/mooc.js`, fonction
`resolveRef`) va chercher la traduction **actuelle** dans `DB_WORDS` /
`DB_PHRASES` / `DB_VERBS` à chaque affichage. Une correction validée dans le
dictionnaire (via le système de suggestion déjà en place, ou le nouveau
système de correction de genre) se propage donc automatiquement à toutes
les leçons qui utilisent ce mot — testé explicitement : une modification de
`DB_WORDS.find(w=>w.fr==='Bonjour').mc` se reflète immédiatement dans le
dialogue de la leçon 1 sans toucher `lessons.js`.

### Format d'une leçon

Chaque leçon suit la même structure pédagogique en plusieurs temps :
1. **Dialogue/phrase modèle** : quelques lignes FR+MC affichées ensemble,
   avec prononciation audio.
2. **Fiche de vocabulaire** : les mots nouveaux de la leçon, présentés
   clairement avec leur traduction.
3. **Fiche de grammaire** : une règle courte et ciblée (singulier/pluriel,
   genre, article...), reformulée à partir de la Grammaire Frolla.
4. **Exercice « thème »** : traduire une consigne FR vers le MC, saisie
   libre comparée à la réponse attendue (normalisée : insensible à la
   casse, aux espaces multiples et à la ponctuation finale, mais stricte
   sur les caractères propres au monégasque ë/ü/ç qu'on veut faire
   apprendre).
5. **Exercice « texte à trous »** : une phrase MC affichée avec un mot
   remplacé par un blanc à compléter.
6. **Bonus révision** : renvoi vers le moteur Quiz existant pour réviser
   le vocabulaire de la leçon en flashcards.

### Piège découvert et corrigé en testant : variantes orthographiques

En construisant la première leçon, un problème réel est apparu : le mot
« Comment » isolé dans `DB_WORDS` donne « Cuma », mais la phrase toute
faite « Bonjour, comment vous appelez-vous ? » dans `DB_PHRASES` utilise
« cümu » — une variante orthographique différente du même mot. Sans
vérification, l'exercice à trous aurait simplement échoué à afficher le
trou (le mot recherché n'étant pas trouvé tel quel dans la phrase),
plantant silencieusement pour l'utilisateur.

**Solution retenue** : `Mooc.validateLesson()` vérifie, pour chaque exercice
à trous, que le mot ciblé apparaît bien tel quel dans la phrase visée avant
de considérer la leçon comme saine. Le moteur de rendu fait aussi cette
vérification à l'exécution et saute l'item si besoin (avec un avertissement
dans la console), plutôt que d'afficher un exercice cassé. La première
leçon a donc été corrigée pour utiliser « J'aime Monaco » / « Monaco »
(vérifié : « Mùnegu » apparaît bien tel quel dans « Ami Mùnegu »).

Cette divergence orthographique entre mots isolés et phrases toutes faites
n'a pas été corrigée à la racine (elle préexistait dans `DB_PHRASES`) —
seulement contournée pour cette leçon. Une vérification systématique des
~49 phrases contre le vocabulaire isolé correspondant reste à faire pour
fiabiliser complètement les futurs exercices à trous.

### Progression utilisateur : localStorage, pas de vraie base de données

Comme décidé explicitement, la progression (leçons terminées, scores) est
sauvegardée dans le `localStorage` du navigateur (clé
`munegascu_mooc_progress`), pas en mémoire de session comme le reste du
site — ce qui permet de la retrouver après un rechargement de page, mais
pas sur un autre appareil ni après un vidage de cache. Testé explicitement :
la progression persiste après un rechargement complet de la page (`F5`).

### Enchaînement des leçons : linéaire souple

Toutes les leçons sont accessibles depuis la page d'accueil du parcours dès
le début (pas de verrouillage), avec un `ordreConseille` affiché pour guider
sans contraindre — décision prise explicitement avec l'utilisateur plutôt
que les approches strictement linéaires ou totalement libres.

### Catalogue actuel : 9 leçons avec un vrai tronc commun grammatical

`src/data/lessons.js` contient un catalogue construit par thèmes progressifs
(se présenter → être/avoir → conjuguer un verbe régulier → négation/chiffres
→ famille/genre → pluriel/articles → météo/temps verbaux → restaurant/
politesse → urgences/impératif), construit et validé de bout en bout avec
`Mooc.validateLesson()` avant intégration. Niveau 1 = bases, niveau 2 = vie
courante, niveau 3 = situations pratiques.

**Choix pédagogique explicite (23/06/2026)** : à la demande de
l'utilisateur, ce parcours vise un vrai apprentissage de fond plutôt qu'une
mémorisation superficielle façon application de répétition quotidienne. Les
fiches de grammaire ont donc été reprises pour être nettement plus
détaillées qu'un simple rappel, et couvrent systématiquement dès les
premières leçons : la conjugaison par groupe (les 3 groupes réguliers, avec
leurs désinences complètes), les principaux temps verbaux (présent,
imparfait, futur, conditionnel), la négation, le système d'articles
(défini/indéfini, contractions), l'accord en genre et en nombre, et
l'impératif. L'objectif est de donner aux apprenants les fondations
nécessaires à une vraie autonomie, pas juste un vocabulaire de survie.

Chaque leçon comprend :
- un **dialogue** modèle (FR+MC, audio) ;
- une **fiche de vocabulaire** dédiée, qui affiche aussi la conjugaison
  complète au présent des verbes introduits dans la leçon (réutilise
  directement `DB_VERBS`, donc se mettra à jour automatiquement si une
  conjugaison est corrigée) ;
- une **fiche de grammaire** détaillée — chaque fiche est une
  reformulation personnelle (jamais une citation) construite à partir des
  règles déjà vérifiées dans la Grammaire monégasque de Louis Frolla,
  illustrée uniquement par des exemples puisés dans la base de données du
  site (donc déjà sourcés et vérifiables) ;
- un **exercice « thème »** (traduire un mot isolé FR→MC) ;
- un **exercice « phrase »** (traduire une phrase complète FR→MC, plus
  exigeant : il faut reproduire l'ordre des mots et l'orthographe
  complète, pas seulement un terme isolé) ;
- un **exercice « texte à trous »** (compléter un mot manquant dans une
  phrase monégasque) ;
- un bonus révision qui renvoie vers le Quiz existant.

**Ce contenu grammatical et les phrases d'exemple restent à faire relire
par un locuteur natif avant toute publication définitive** — décision
explicite de l'utilisateur, notamment pour les points encore incertains
signalés directement dans les fiches elles-mêmes (ex. la négation Nu/Nun,
dont la fiche de la leçon 4 mentionne explicitement l'incertitude plutôt
que de trancher arbitrairement).

Plusieurs paires mot/phrase candidates ont été écartées pendant la
construction car le mot isolé n'apparaît pas tel quel dans la phrase
visée (variantes orthographiques entre `DB_WORDS` et `DB_PHRASES`) :
« Comment »/Cuma vs « cümu », « Content »/Cuntentu vs « cuntentù »,
« Police »/Puliça vs « puleçia », « Combien »/Qantu vs « Quantu ». Ces
divergences orthographiques préexistantes dans le dictionnaire restent à
corriger pour pouvoir les utiliser dans un futur exercice à trous.

**Bug corrigé pendant la construction** : le moteur utilisait initialement
des limites de mot regex classiques (`\b...\b`) pour détecter si un mot
apparaît dans une phrase. Or `\b` en JavaScript ne reconnaît que les
caractères ASCII comme limites de mot — un mot accentué suivi d'une
virgule (ex. « cafè, ») n'était donc pas détecté correctement, faisant
échouer à tort des paires pourtant valides. Remplacé par des lookarounds
Unicode (`(?<![\p{L}\p{N}])...(?![\p{L}\p{N}])` avec le flag `u`), qui
gèrent correctement l'ensemble des caractères accentués du monégasque.

**Une vraie erreur de traduction trouvée en construisant le catalogue** :
le mot « Froid » était traduit par « Frescu » dans la base, qui signifie en
réalité « frais » — confusion avec un faux ami. Corrigé en « Freidu »,
cohérent avec la phrase « Fa freidu » déjà présente dans `DB_PHRASES`.
Trois nouveaux mots ont aussi été ajoutés en construisant ce catalogue :
« Où » (Ùnde), « Quand » (Qandu), « Content » (Cuntentu).



Les PDF originaux (`128p_Grammaire-2.pdf`, `Dico_Fr_Mc_TXT.pdf`,
`Dico_Mc_Fr_TXT_Dico-1.pdf`, `Dico_Mc_Fr_TXT_Ouverture.pdf`) restent la
référence en cas de doute sur une forme. Le dictionnaire français-monégasque
en particulier contient ~800 pages de vocabulaire qui n'ont pas encore été
systématiquement comparées au contenu de `database.js` (764 mots) — un
travail de fond reste possible ici pour qui veut pousser la précision
encore plus loin.
