import type { AppCopy } from './types';

interface CopySeed {
  welcomeTitle: string;
  welcomeMotivation: string[];
  welcomeLead: string;
  architectureNote: string;
  methodStepsTitle: string;
  methodSteps: string[];
  fingerRulesTitle: string;
  fingerRules: string[];
  interfaceLanguage: string;
  keyboardLayout: string;
  textMode: string;
  customTextLabel: string;
  defaultTextLabel: string;
  start: string;
  customTextAction: string;
  settings: string;
  sayCommand: string;
  complete: string;
  unsupportedChar: string;
  currentChar: string;
  errorCount: string;
  restart: string;
  back: string;
  trainerHint: string;
  trainerRulesTitle: string;
  trainerRules: string[];
  unsupportedHint: string;
  finishedTitle: string;
  finishedText: string;
  settingsEyebrow: string;
  settingsTitle: string;
  settingsLead: string;
  supportTitle?: string;
  supportText?: string;
  supportAction?: string;
  useCustomText: string;
  textLabel: string;
  save: string;
  reset: string;
  space: string;
}

export const ptCopy = createCopy({
  welcomeTitle: 'Digitação às cegas com comandos corporais',
  welcomeMotivation: [
    'Para quem trabalha no computador, a digitação às cegas é uma habilidade profissional essencial. Mesmo assim, muita gente ainda não a domina porque antes não havia uma forma rápida de aprender sem decorar regras por dezenas de horas.',
    'MatrixType é um treinador único que permite começar a digitar às cegas todos os símbolos desde o primeiro dia, usando comandos corporais curtos.',
    'Duas horas e meia de prática consciente bastam para construir uma habilidade que vai trabalhar por você durante anos.'
  ],
  welcomeLead: 'O treinador mostra o próximo símbolo e um comando curto para dizer em voz alta. Diga o comando, pressione a tecla com o dedo indicado e avance somente depois da entrada correta.',
  architectureNote: 'O idioma da interface e o teclado treinado são escolhidos separadamente. Os comandos seguem o idioma da interface.',
  methodStepsTitle: 'O que fazer',
  methodSteps: ['Escolha o idioma da interface e o teclado que quer treinar.', 'Olhe para o comando na tela, não para o teclado.', 'Diga o comando em voz alta e perceba o movimento da mão.', 'Pressione a tecla somente depois de dizer o comando.', 'O princípio da digitação às cegas é simples: cada tecla pertence a um dedo. Cada dedo pressiona seu próprio grupo de teclas.', 'O esquema de cores abaixo mostra qual dedo pressiona quais teclas. O MatrixType já leva isso em conta, então você não precisa decorar o esquema.', 'O treinador mostra um comando curto, por exemplo: “esquerda, 1.º, no lugar”. “Esquerda” significa mão esquerda, “1.º” significa primeiro dedo e “no lugar” significa a tecla da posição inicial desse dedo.', 'Os dedos são contados do indicador ao mínimo: indicador — 1, médio — 2, anelar — 3, mínimo — 4. O polegar não é numerado e é usado para o espaço.', 'Se o comando for “direita, 1.º, acima”, pressione com o indicador da mão direita a tecla da linha superior, não a tecla da posição inicial.'],
  fingerRulesTitle: 'Numeração dos dedos',
  fingerRules: ['O polegar não conta.', 'O primeiro dedo é o que vem depois do polegar; depois vêm o segundo, terceiro e quarto.', 'Na mão esquerda, da esquerda para a direita: 4, 3, 2, 1.', 'Na mão direita, da esquerda para a direita: 1, 2, 3, 4.'],
  interfaceLanguage: 'Idioma da interface',
  keyboardLayout: 'Teclado',
  textMode: 'Texto',
  customTextLabel: 'Personalizado',
  defaultTextLabel: 'Padrão',
  start: 'Começar',
  customTextAction: 'Texto próprio',
  settings: 'Configurações',
  sayCommand: 'Diga o comando',
  complete: 'pronto',
  unsupportedChar: 'símbolo não suportado',
  currentChar: 'Símbolo atual',
  errorCount: 'Erros',
  restart: 'Reiniciar',
  back: 'Voltar',
  trainerHint: 'Diga primeiro o comando superior em voz alta e depois pressione a tecla. Uma tecla errada faz a tela piscar em vermelho.',
  trainerRulesTitle: 'Como treinar',
  trainerRules: ['Não olhe para o teclado.', 'Sempre diga os comandos em voz alta.', 'Mova-se devagar e com precisão.', 'Durante o aprendizado, precisão é mais importante que velocidade. A velocidade vem depois.'],
  unsupportedHint: 'Não há comando para este símbolo. Troque-o nas configurações ou adicione o símbolo ao mapa aberto de comandos.',
  finishedTitle: 'Texto concluído',
  finishedText: 'Você pode repetir este texto ou ir para as configurações.',
  settingsEyebrow: 'Configurações',
  settingsTitle: 'Texto de treino próprio',
  settingsLead: 'O texto próprio mantém maiúsculas e minúsculas. Símbolos sem comandos serão marcados no treinador.',
  useCustomText: 'Usar texto próprio',
  textLabel: 'Texto',
  save: 'Salvar',
  reset: 'Redefinir',
  space: 'espaço'
});

export const frCopy = createCopy({
  welcomeTitle: 'Dactylographie à l’aveugle avec commandes corporelles',
  welcomeMotivation: [
    'Pour les personnes qui travaillent sur ordinateur, la frappe à l’aveugle est une compétence professionnelle essentielle. Pourtant, beaucoup ne la maîtrisent toujours pas, car il n’existait pas de méthode rapide pour l’apprendre sans mémoriser des règles pendant des dizaines d’heures.',
    'MatrixType est un trainer unique en son genre qui permet de commencer à taper à l’aveugle tous les symboles dès le premier jour grâce à de courtes commandes corporelles.',
    'Deux heures et demie de pratique consciente suffisent pour construire une compétence qui travaillera pour vous pendant des années.'
  ],
  welcomeLead: 'Le trainer affiche le prochain symbole et une courte commande à dire à voix haute. Dites la commande, appuyez avec le doigt indiqué et avancez seulement après une saisie correcte.',
  architectureNote: 'La langue de l’interface et le clavier entraîné sont choisis séparément. Les commandes suivent la langue de l’interface.',
  methodStepsTitle: 'Que faire',
  methodSteps: ['Choisissez la langue de l’interface et le clavier à entraîner.', 'Regardez la commande à l’écran, pas le clavier.', 'Dites la commande à voix haute et sentez le mouvement de la main.', 'Appuyez seulement après avoir dit la commande.', 'Le principe de la frappe à l’aveugle est simple : chaque touche appartient à un doigt. Chaque doigt appuie sur son propre groupe de touches.', 'Le schéma de couleurs ci-dessous montre quel doigt appuie sur quelles touches. MatrixType en tient déjà compte, vous n’avez donc pas besoin de le mémoriser.', 'Le trainer affiche une commande courte, par exemple : « gauche, 1er, en place ». « Gauche » signifie main gauche, « 1er » signifie premier doigt et « en place » signifie la touche de la position de départ de ce doigt.', 'Les doigts sont comptés de l’index à l’auriculaire : index — 1, majeur — 2, annulaire — 3, auriculaire — 4. Le pouce n’est pas numéroté et sert à l’espace.', 'Si la commande est « droite, 1er, haut », appuyez avec l’index de la main droite sur la touche de la rangée supérieure, pas sur la touche de la position de départ.'],
  fingerRulesTitle: 'Numérotation des doigts',
  fingerRules: ['Le pouce ne compte pas.', 'Le premier doigt est celui après le pouce, puis le deuxième, le troisième et le quatrième.', 'Main gauche de gauche à droite : 4, 3, 2, 1.', 'Main droite de gauche à droite : 1, 2, 3, 4.'],
  interfaceLanguage: 'Langue de l’interface',
  keyboardLayout: 'Clavier',
  textMode: 'Texte',
  customTextLabel: 'Personnalisé',
  defaultTextLabel: 'Par défaut',
  start: 'Commencer',
  customTextAction: 'Texte personnel',
  settings: 'Réglages',
  sayCommand: 'Dites la commande',
  complete: 'terminé',
  unsupportedChar: 'symbole non pris en charge',
  currentChar: 'Symbole actuel',
  errorCount: 'Erreurs',
  restart: 'Recommencer',
  back: 'Retour',
  trainerHint: 'Dites d’abord la commande du haut à voix haute, puis appuyez sur la touche. Une mauvaise touche fait clignoter l’écran en rouge.',
  trainerRulesTitle: 'Comment s’entraîner',
  trainerRules: ['Ne regardez pas le clavier.', 'Dites toujours les commandes à voix haute.', 'Bougez lentement et précisément.', 'Pendant l’apprentissage, la précision compte plus que la vitesse. La vitesse viendra après.'],
  unsupportedHint: 'Aucune commande pour ce symbole. Remplacez-le dans les réglages ou ajoutez-le à la carte ouverte des commandes.',
  finishedTitle: 'Texte terminé',
  finishedText: 'Vous pouvez répéter ce texte ou aller aux réglages.',
  settingsEyebrow: 'Réglages',
  settingsTitle: 'Texte d’entraînement personnel',
  settingsLead: 'Le texte personnel conserve la casse. Les symboles sans commande seront signalés dans le trainer.',
  useCustomText: 'Utiliser le texte personnel',
  textLabel: 'Texte',
  save: 'Enregistrer',
  reset: 'Réinitialiser',
  space: 'espace'
});

export const deCopy = createCopy({
  welcomeTitle: 'Blindschreiben mit Körperkommandos',
  welcomeMotivation: [
    'Für Menschen, die am Computer arbeiten, ist Blindschreiben eine grundlegende berufliche Fähigkeit. Viele beherrschen sie trotzdem nicht, weil es früher keinen schnellen Weg gab, sie ohne dutzende Stunden Auswendiglernen aufzubauen.',
    'MatrixType ist ein einzigartiger Trainer, mit dem du vom ersten Tag an alle Zeichen blind tippen kannst, gestützt auf kurze Körperkommandos.',
    'Zweieinhalb Stunden bewusstes Training reichen aus, um eine Fähigkeit aufzubauen, die jahrelang für dich arbeitet.'
  ],
  welcomeLead: 'Der Trainer zeigt das nächste Zeichen und ein kurzes Kommando zum lauten Sprechen. Sprich das Kommando, drücke die Taste mit dem richtigen Finger und gehe erst nach korrekter Eingabe weiter.',
  architectureNote: 'Oberflächensprache und trainierte Tastatur werden getrennt gewählt. Kommandos folgen der Oberflächensprache.',
  methodStepsTitle: 'Was tun',
  methodSteps: ['Wähle Oberflächensprache und Tastatur.', 'Schau auf das Kommando am Bildschirm, nicht auf die Tastatur.', 'Sprich das Kommando laut und spüre die Handbewegung.', 'Drücke die Taste erst nach dem Kommando.', 'Das Prinzip des Blindschreibens ist einfach: Jede Taste gehört zu einem Finger. Jeder Finger drückt seine eigene Tastengruppe.', 'Das Farbschema unten zeigt, welcher Finger welche Tasten drückt. MatrixType berücksichtigt das bereits, du musst das Schema also nicht auswendig lernen.', 'Der Trainer zeigt ein kurzes Kommando, zum Beispiel: „links, 1., auf Platz“. „Links“ bedeutet linke Hand, „1.“ bedeutet erster Finger und „auf Platz“ bedeutet die Taste in der Grundposition dieses Fingers.', 'Die Finger werden vom Zeigefinger bis zum kleinen Finger gezählt: Zeigefinger — 1, Mittelfinger — 2, Ringfinger — 3, kleiner Finger — 4. Der Daumen wird nicht nummeriert und wird für die Leertaste verwendet.', 'Wenn das Kommando „rechts, 1., oben“ lautet, drücke mit dem Zeigefinger der rechten Hand die Taste in der oberen Reihe, nicht die Taste in der Grundposition.'],
  fingerRulesTitle: 'Fingerzählung',
  fingerRules: ['Der Daumen zählt nicht.', 'Der erste Finger ist der Finger nach dem Daumen, danach zweiter, dritter und vierter.', 'Linke Hand von links nach rechts: 4, 3, 2, 1.', 'Rechte Hand von links nach rechts: 1, 2, 3, 4.'],
  interfaceLanguage: 'Oberflächensprache',
  keyboardLayout: 'Tastatur',
  textMode: 'Text',
  customTextLabel: 'Eigener Text',
  defaultTextLabel: 'Standard',
  start: 'Start',
  customTextAction: 'Eigener Text',
  settings: 'Einstellungen',
  sayCommand: 'Kommando sagen',
  complete: 'fertig',
  unsupportedChar: 'nicht unterstütztes Zeichen',
  currentChar: 'Aktuelles Zeichen',
  errorCount: 'Fehler',
  restart: 'Neu starten',
  back: 'Zurück',
  trainerHint: 'Sprich zuerst das obere Kommando laut und drücke dann die Taste. Eine falsche Taste lässt den Bildschirm rot blinken.',
  trainerRulesTitle: 'So trainierst du',
  trainerRules: ['Schau nicht auf die Tastatur.', 'Sprich die Kommandos immer laut.', 'Bewege dich langsam und genau.', 'Beim Lernen ist Genauigkeit wichtiger als Geschwindigkeit. Geschwindigkeit kommt später.'],
  unsupportedHint: 'Für dieses Zeichen gibt es kein Kommando. Ersetze es in den Einstellungen oder ergänze die offene Kommandokarte.',
  finishedTitle: 'Text beendet',
  finishedText: 'Du kannst den Text wiederholen oder zu den Einstellungen gehen.',
  settingsEyebrow: 'Einstellungen',
  settingsTitle: 'Eigener Trainingstext',
  settingsLead: 'Eigener Text behält Groß- und Kleinschreibung. Zeichen ohne Kommando werden im Trainer markiert.',
  useCustomText: 'Eigenen Text verwenden',
  textLabel: 'Text',
  save: 'Speichern',
  reset: 'Zurücksetzen',
  space: 'Leertaste'
});

export const itCopy = createCopy({
  welcomeTitle: 'Dattilografia alla cieca con comandi corporei',
  welcomeMotivation: [
    'Per chi lavora al computer, la digitazione alla cieca è una competenza professionale essenziale. Eppure molti non la possiedono ancora, perché prima non esisteva un modo rapido per impararla senza memorizzare regole per decine di ore.',
    'MatrixType è un trainer unico nel suo genere che permette di iniziare a digitare alla cieca tutti i simboli fin dal primo giorno, usando brevi comandi corporei.',
    'Due ore e mezza di pratica consapevole bastano per costruire una competenza che lavorerà per te per anni.'
  ],
  welcomeLead: 'Il trainer mostra il prossimo simbolo e un breve comando da dire ad alta voce. Dici il comando, premi il tasto con il dito indicato e avanzi solo dopo l’inserimento corretto.',
  architectureNote: 'La lingua dell’interfaccia e la tastiera allenata sono scelte separatamente. I comandi seguono la lingua dell’interfaccia.',
  methodStepsTitle: 'Cosa fare',
  methodSteps: ['Scegli la lingua dell’interfaccia e la tastiera da allenare.', 'Guarda il comando sullo schermo, non la tastiera.', 'Dici il comando ad alta voce e nota il movimento della mano.', 'Premi il tasto solo dopo aver detto il comando.', 'Il principio della digitazione alla cieca è semplice: ogni tasto appartiene a un dito. Ogni dito preme il proprio gruppo di tasti.', 'Lo schema a colori qui sotto mostra quale dito preme quali tasti. MatrixType ne tiene già conto, quindi non devi memorizzare lo schema.', 'Il trainer mostra un comando breve, per esempio: “sinistra, 1º, al posto”. “Sinistra” significa mano sinistra, “1º” significa primo dito e “al posto” significa il tasto nella posizione iniziale di quel dito.', 'Le dita si contano dall’indice al mignolo: indice — 1, medio — 2, anulare — 3, mignolo — 4. Il pollice non è numerato e si usa per lo spazio.', 'Se il comando è “destra, 1º, su”, premi con l’indice della mano destra il tasto della riga superiore, non quello della posizione iniziale.'],
  fingerRulesTitle: 'Numerazione delle dita',
  fingerRules: ['Il pollice non si conta.', 'Il primo dito è quello dopo il pollice; poi secondo, terzo e quarto.', 'Mano sinistra da sinistra a destra: 4, 3, 2, 1.', 'Mano destra da sinistra a destra: 1, 2, 3, 4.'],
  interfaceLanguage: 'Lingua interfaccia',
  keyboardLayout: 'Tastiera',
  textMode: 'Testo',
  customTextLabel: 'Personalizzato',
  defaultTextLabel: 'Predefinito',
  start: 'Inizia',
  customTextAction: 'Testo proprio',
  settings: 'Impostazioni',
  sayCommand: 'Dici il comando',
  complete: 'fatto',
  unsupportedChar: 'simbolo non supportato',
  currentChar: 'Simbolo attuale',
  errorCount: 'Errori',
  restart: 'Ricomincia',
  back: 'Indietro',
  trainerHint: 'Prima dici ad alta voce il comando in alto, poi premi il tasto. Un tasto sbagliato fa lampeggiare lo schermo in rosso.',
  trainerRulesTitle: 'Come allenarsi',
  trainerRules: ['Non guardare la tastiera.', 'Dici sempre i comandi ad alta voce.', 'Muoviti lentamente e con precisione.', 'Durante l’apprendimento la precisione conta più della velocità. La velocità arriva dopo.'],
  unsupportedHint: 'Non c’è un comando per questo simbolo. Sostituiscilo nelle impostazioni o aggiungilo alla mappa aperta dei comandi.',
  finishedTitle: 'Testo completato',
  finishedText: 'Puoi ripetere questo testo o andare alle impostazioni.',
  settingsEyebrow: 'Impostazioni',
  settingsTitle: 'Testo di allenamento proprio',
  settingsLead: 'Il testo proprio conserva maiuscole e minuscole. I simboli senza comandi saranno segnalati nel trainer.',
  useCustomText: 'Usa testo proprio',
  textLabel: 'Testo',
  save: 'Salva',
  reset: 'Ripristina',
  space: 'spazio'
});

export const plCopy = createCopy({
  welcomeTitle: 'Pisanie bezwzrokowe przez komendy ciała',
  welcomeMotivation: [
    'Dla osób pracujących przy komputerze pisanie bezwzrokowe jest podstawową umiejętnością zawodową. Mimo to wiele osób nadal jej nie ma, bo wcześniej nie było szybkiego sposobu nauki bez zapamiętywania zasad przez dziesiątki godzin.',
    'MatrixType to jedyny w swoim rodzaju trenażer, który pozwala od pierwszego dnia pisać bezwzrokowo wszystkie symbole dzięki krótkim komendom ciała.',
    'Dwie i pół godziny świadomej praktyki wystarczą, żeby zbudować umiejętność, która będzie pracować dla ciebie przez lata.'
  ],
  welcomeLead: 'Trenażer pokazuje następny znak i krótką komendę do wypowiedzenia na głos. Powiedz komendę, naciśnij klawisz właściwym palcem i przejdź dalej dopiero po poprawnym wpisie.',
  architectureNote: 'Język interfejsu i ćwiczona klawiatura są wybierane osobno. Komendy są w języku interfejsu.',
  methodStepsTitle: 'Co robić',
  methodSteps: ['Wybierz język interfejsu i klawiaturę do ćwiczenia.', 'Patrz na komendę na ekranie, nie na klawiaturę.', 'Mów komendę na głos i zauważ ruch dłoni.', 'Naciśnij klawisz dopiero po wypowiedzeniu komendy.', 'Zasada pisania bezwzrokowego jest prosta: każdy klawisz należy do jednego palca. Każdy palec naciska własną grupę klawiszy.', 'Schemat kolorów poniżej pokazuje, którym palcem naciskać poszczególne klawisze. MatrixType już to uwzględnia, więc nie musisz uczyć się schematu na pamięć.', 'Trenażer pokazuje krótką komendę, na przykład: „lewą, 1., na miejscu”. „Lewą” oznacza lewą rękę, „1.” oznacza pierwszy palec, a „na miejscu” oznacza klawisz w pozycji początkowej tego palca.', 'Palce liczy się od wskazującego do małego: wskazujący — 1, środkowy — 2, serdeczny — 3, mały — 4. Kciuk nie jest numerowany i służy do spacji.', 'Jeśli komenda brzmi „prawą, 1., w górę”, naciśnij palcem wskazującym prawej ręki klawisz w górnym rzędzie, a nie klawisz w pozycji początkowej.'],
  fingerRulesTitle: 'Numeracja palców',
  fingerRules: ['Kciuk się nie liczy.', 'Pierwszy palec jest obok kciuka, potem drugi, trzeci i czwarty.', 'Lewa dłoń od lewej do prawej: 4, 3, 2, 1.', 'Prawa dłoń od lewej do prawej: 1, 2, 3, 4.'],
  interfaceLanguage: 'Język interfejsu',
  keyboardLayout: 'Klawiatura',
  textMode: 'Tekst',
  customTextLabel: 'Własny',
  defaultTextLabel: 'Domyślny',
  start: 'Start',
  customTextAction: 'Własny tekst',
  settings: 'Ustawienia',
  sayCommand: 'Powiedz komendę',
  complete: 'gotowe',
  unsupportedChar: 'nieobsługiwany znak',
  currentChar: 'Aktualny znak',
  errorCount: 'Błędy',
  restart: 'Od nowa',
  back: 'Wstecz',
  trainerHint: 'Najpierw powiedz górną komendę na głos, potem naciśnij klawisz. Zły klawisz miga ekranem na czerwono.',
  trainerRulesTitle: 'Jak ćwiczyć',
  trainerRules: ['Nie patrz na klawiaturę.', 'Zawsze mów komendy na głos.', 'Poruszaj się wolno i dokładnie.', 'Na etapie nauki dokładność jest ważniejsza niż szybkość. Szybkość przyjdzie później.'],
  unsupportedHint: 'Dla tego znaku nie ma komendy. Zmień go w ustawieniach albo dodaj znak do otwartej mapy komend.',
  finishedTitle: 'Tekst ukończony',
  finishedText: 'Możesz powtórzyć tekst albo przejść do ustawień.',
  settingsEyebrow: 'Ustawienia',
  settingsTitle: 'Własny tekst treningowy',
  settingsLead: 'Własny tekst zachowuje wielkość liter. Znaki bez komend będą oznaczone w trenażerze.',
  useCustomText: 'Użyj własnego tekstu',
  textLabel: 'Tekst',
  save: 'Zapisz',
  reset: 'Resetuj',
  space: 'spacja'
});

export const ukCopy = createCopy({
  welcomeTitle: 'Сліпий друк через тілесні команди',
  welcomeMotivation: [
    'Для людей, які працюють за комп’ютером, сліпий друк — обов’язковий атрибут фахівця. Водночас далеко не всі ним володіють, бо раніше не існувало способу швидко й без десятків годин зазубрювання набути цю навичку.',
    'MatrixType — єдиний у своєму роді тренажер, який дозволяє з першого дня друкувати наосліп одразу всі символи, спираючись на короткі тілесні команди.',
    'Достатньо двох з половиною годин усвідомленої практики, щоб набути навичку, яка працюватиме на вас роками.'
  ],
  welcomeLead: 'Тренажер показує наступний символ і коротку команду для промовляння вголос. Промовте команду, натисніть клавішу потрібним пальцем і рухайтеся далі лише після правильного введення.',
  architectureNote: 'Мова інтерфейсу і клавіатура для тренування вибираються окремо. Команди показуються мовою інтерфейсу.',
  methodStepsTitle: 'Що робити',
  methodSteps: ['Виберіть мову інтерфейсу і клавіатуру для тренування.', 'Дивіться на команду на екрані, а не на клавіатуру.', 'Промовляйте команду вголос і відчувайте рух руки.', 'Натискайте клавішу тільки після промовляння команди.', 'Принцип сліпого друку простий: кожній клавіші відповідає свій палець. Кожен палець натискає свою групу клавіш.', 'Кольорова схема нижче показує, яким пальцем натискати різні клавіші. У MatrixType це вже враховано, тому схему не потрібно зазубрювати.', 'Тренажер показує коротку команду, наприклад: «лівою, 1-м, на місці». «Лівою» означає лівою рукою, «1-м» — першим пальцем, «на місці» — клавішу в початковій позиції цього пальця.', 'Пальці рахуються від вказівного до мізинця: вказівний — 1, середній — 2, безіменний — 3, мізинець — 4. Великий палець не нумерується і використовується для пробілу.', 'Якщо команда звучить як «правою, 1-м, вгору», натисніть правою рукою вказівним пальцем клавішу у верхньому ряду, а не клавішу в початковій позиції.'],
  fingerRulesTitle: 'Нумерація пальців',
  fingerRules: ['Великий палець не рахується.', 'Перший палець — наступний після великого, потім другий, третій і четвертий.', 'На лівій руці зліва направо: 4, 3, 2, 1.', 'На правій руці зліва направо: 1, 2, 3, 4.'],
  interfaceLanguage: 'Мова інтерфейсу',
  keyboardLayout: 'Клавіатура',
  textMode: 'Текст',
  customTextLabel: 'Власний',
  defaultTextLabel: 'Типовий',
  start: 'Почати',
  customTextAction: 'Власний текст',
  settings: 'Налаштування',
  sayCommand: 'Промовте команду',
  complete: 'готово',
  unsupportedChar: 'символ не підтримується',
  currentChar: 'Поточний символ',
  errorCount: 'Помилки',
  restart: 'Спочатку',
  back: 'Назад',
  trainerHint: 'Спочатку промовте верхню команду вголос, потім натисніть клавішу. Помилка коротко блимає червоним.',
  trainerRulesTitle: 'Як тренуватися',
  trainerRules: ['Не дивіться на клавіатуру.', 'Обов’язково промовляйте команди вголос.', 'Рухайтесь повільно і точно.', 'Під час навчання точність важливіша за швидкість. Швидкість прийде пізніше.'],
  unsupportedHint: 'Для цього символу немає команди. Замініть його в налаштуваннях або додайте символ до відкритої карти команд.',
  finishedTitle: 'Текст завершено',
  finishedText: 'Можна повторити цей текст або перейти до налаштувань.',
  settingsEyebrow: 'Налаштування',
  settingsTitle: 'Власний тренувальний текст',
  settingsLead: 'Власний текст зберігає регістр. Символи без команд будуть позначені в тренажері.',
  useCustomText: 'Використовувати власний текст',
  textLabel: 'Текст',
  save: 'Зберегти',
  reset: 'Скинути',
  space: 'пробіл'
});

export const trCopy = createCopy({
  welcomeTitle: 'Beden komutlarıyla bakmadan yazma',
  welcomeMotivation: [
    'Bilgisayar başında çalışan insanlar için bakmadan yazmak temel bir uzmanlık becerisidir. Yine de pek çok kişi bu beceriye sahip değil; çünkü daha önce onlarca saat kural ezberlemeden hızlıca öğrenmenin bir yolu yoktu.',
    'MatrixType, kısa beden komutlarıyla daha ilk günden tüm sembolleri bakmadan yazmaya başlamanı sağlayan türünün tek örneği bir antrenördür.',
    'İki buçuk saatlik bilinçli çalışma, yıllarca senin için çalışacak bir beceri inşa etmeye yeter.'
  ],
  welcomeLead: 'Antrenör sonraki simgeyi ve yüksek sesle söylemen gereken kısa komutu gösterir. Komutu söyle, gereken parmakla tuşa bas ve yalnızca doğru girişten sonra ilerle.',
  architectureNote: 'Arayüz dili ve çalışılan klavye ayrı seçilir. Komutlar arayüz dilini takip eder.',
  methodStepsTitle: 'Ne yapmalı',
  methodSteps: ['Arayüz dilini ve çalışmak istediğin klavyeyi seç.', 'Klavyeye değil, ekrandaki komuta bak.', 'Komutu yüksek sesle söyle ve el hareketini fark et.', 'Komutu söyledikten sonra tuşa bas.', 'Bakmadan yazmanın ilkesi basittir: her tuş bir parmağa aittir. Her parmak kendi tuş grubuna basar.', 'Aşağıdaki renk şeması hangi tuşa hangi parmakla basılacağını gösterir. MatrixType bunu zaten hesaba katar, bu yüzden şemayı ezberlemen gerekmez.', 'Antrenör kısa bir komut gösterir, örneğin: “sol, 1., yerinde”. “Sol” sol el demektir, “1.” birinci parmak demektir, “yerinde” ise o parmağın başlangıç konumundaki tuş demektir.', 'Parmaklar işaret parmağından serçe parmağa doğru sayılır: işaret — 1, orta — 2, yüzük — 3, serçe — 4. Başparmak numaralandırılmaz ve boşluk için kullanılır.', 'Komut “sağ, 1., yukarı” ise sağ elinin işaret parmağıyla başlangıç konumundaki tuşa değil, üst sıradaki tuşa bas.'],
  fingerRulesTitle: 'Parmak numaraları',
  fingerRules: ['Başparmak sayılmaz.', 'Birinci parmak başparmaktan sonraki parmaktır; sonra ikinci, üçüncü ve dördüncü gelir.', 'Sol elde soldan sağa: 4, 3, 2, 1.', 'Sağ elde soldan sağa: 1, 2, 3, 4.'],
  interfaceLanguage: 'Arayüz dili',
  keyboardLayout: 'Klavye',
  textMode: 'Metin',
  customTextLabel: 'Özel',
  defaultTextLabel: 'Varsayılan',
  start: 'Başla',
  customTextAction: 'Özel metin',
  settings: 'Ayarlar',
  sayCommand: 'Komutu söyle',
  complete: 'bitti',
  unsupportedChar: 'desteklenmeyen simge',
  currentChar: 'Geçerli simge',
  errorCount: 'Hatalar',
  restart: 'Yeniden başlat',
  back: 'Geri',
  trainerHint: 'Önce üstteki komutu yüksek sesle söyle, sonra tuşa bas. Yanlış tuş ekranı kırmızı yakar.',
  trainerRulesTitle: 'Nasıl çalışılır',
  trainerRules: ['Klavyeye bakma.', 'Komutları her zaman yüksek sesle söyle.', 'Yavaş ve doğru hareket et.', 'Öğrenirken doğruluk hızdan önemlidir. Hız sonra gelir.'],
  unsupportedHint: 'Bu simge için komut yok. Ayarlardan değiştir veya açık komut haritasına ekle.',
  finishedTitle: 'Metin tamamlandı',
  finishedText: 'Bu metni tekrarlayabilir veya ayarlara gidebilirsin.',
  settingsEyebrow: 'Ayarlar',
  settingsTitle: 'Özel antrenman metni',
  settingsLead: 'Özel metin büyük/küçük harfi korur. Komutu olmayan simgeler antrenörde işaretlenir.',
  useCustomText: 'Özel metin kullan',
  textLabel: 'Metin',
  save: 'Kaydet',
  reset: 'Sıfırla',
  space: 'boşluk'
});

export const nlCopy = createCopy({
  welcomeTitle: 'Blind typen met lichaamscommando’s',
  welcomeMotivation: [
    'Voor mensen die achter een computer werken, is blind typen een essentiële professionele vaardigheid. Toch beheerst lang niet iedereen die, omdat er vroeger geen snelle manier bestond om dit te leren zonder tientallen uren regels uit het hoofd te leren.',
    'MatrixType is een unieke trainer waarmee je vanaf de eerste dag alle tekens blind kunt typen met korte lichaamscommando’s.',
    'Tweeënhalf uur bewuste oefening is genoeg om een vaardigheid op te bouwen die jarenlang voor je blijft werken.'
  ],
  welcomeLead: 'De trainer toont het volgende teken en een kort commando om hardop te zeggen. Zeg het commando, druk met de juiste vinger op de toets en ga pas verder na correcte invoer.',
  architectureNote: 'De interfacetaal en het getrainde toetsenbord worden apart gekozen. Commando’s volgen de interfacetaal.',
  methodStepsTitle: 'Wat te doen',
  methodSteps: ['Kies de interfacetaal en het toetsenbord dat je wilt trainen.', 'Kijk naar het commando op het scherm, niet naar het toetsenbord.', 'Zeg het commando hardop en voel de beweging van je hand.', 'Druk pas op de toets nadat je het commando hebt gezegd.', 'Het principe van blind typen is eenvoudig: elke toets hoort bij een vinger. Elke vinger drukt zijn eigen groep toetsen in.', 'Het kleurenschema hieronder laat zien welke vinger welke toetsen indrukt. MatrixType houdt hier al rekening mee, dus je hoeft het schema niet uit je hoofd te leren.', 'De trainer toont een kort commando, bijvoorbeeld: “links, 1e, op zijn plek”. “Links” betekent linkerhand, “1e” betekent eerste vinger en “op zijn plek” betekent de toets in de startpositie van die vinger.', 'De vingers worden geteld van wijsvinger tot pink: wijsvinger — 1, middelvinger — 2, ringvinger — 3, pink — 4. De duim krijgt geen nummer en wordt gebruikt voor spatie.', 'Als het commando “rechts, 1e, omhoog” is, druk je met de wijsvinger van je rechterhand op de toets in de bovenste rij, niet op de toets in de startpositie.'],
  fingerRulesTitle: 'Vingernummering',
  fingerRules: ['De duim telt niet mee.', 'De eerste vinger is de vinger naast de duim; daarna tweede, derde en vierde.', 'Linkerhand van links naar rechts: 4, 3, 2, 1.', 'Rechterhand van links naar rechts: 1, 2, 3, 4.'],
  interfaceLanguage: 'Interfacetaal',
  keyboardLayout: 'Toetsenbord',
  textMode: 'Tekst',
  customTextLabel: 'Eigen',
  defaultTextLabel: 'Standaard',
  start: 'Start',
  customTextAction: 'Eigen tekst',
  settings: 'Instellingen',
  sayCommand: 'Zeg het commando',
  complete: 'klaar',
  unsupportedChar: 'niet-ondersteund teken',
  currentChar: 'Huidig teken',
  errorCount: 'Fouten',
  restart: 'Opnieuw',
  back: 'Terug',
  trainerHint: 'Zeg eerst het bovenste commando hardop en druk daarna op de toets. Een foute toets laat het scherm rood knipperen.',
  trainerRulesTitle: 'Hoe te trainen',
  trainerRules: ['Kijk niet naar het toetsenbord.', 'Zeg de commando’s altijd hardop.', 'Beweeg langzaam en nauwkeurig.', 'Tijdens het leren is nauwkeurigheid belangrijker dan snelheid. Snelheid komt later.'],
  unsupportedHint: 'Er is geen commando voor dit teken. Vervang het in instellingen of voeg het toe aan de open commandokaart.',
  finishedTitle: 'Tekst voltooid',
  finishedText: 'Je kunt deze tekst herhalen of naar instellingen gaan.',
  settingsEyebrow: 'Instellingen',
  settingsTitle: 'Eigen trainingstekst',
  settingsLead: 'Eigen tekst behoudt hoofdletters en kleine letters. Tekens zonder commando worden in de trainer gemarkeerd.',
  useCustomText: 'Eigen tekst gebruiken',
  textLabel: 'Tekst',
  save: 'Opslaan',
  reset: 'Resetten',
  space: 'spatie'
});

export const csCopy = createCopy({
  welcomeTitle: 'Psaní poslepu pomocí tělesných povelů',
  welcomeMotivation: [
    'Pro lidi pracující u počítače je psaní poslepu základní profesní dovednost. Přesto ji mnoho lidí stále nemá, protože dříve neexistoval rychlý způsob, jak se ji naučit bez desítek hodin memorování pravidel.',
    'MatrixType je jedinečný trenažér, který umožňuje od prvního dne psát poslepu všechny symboly pomocí krátkých tělesných povelů.',
    'Dvě a půl hodiny vědomého tréninku stačí k vybudování dovednosti, která vám bude sloužit roky.'
  ],
  welcomeLead: 'Trenažér ukáže další znak a krátký povel k vyslovení nahlas. Řekni povel, stiskni klávesu správným prstem a pokračuj až po správném zadání.',
  architectureNote: 'Jazyk rozhraní a trénovaná klávesnice se volí odděleně. Povely jsou v jazyce rozhraní.',
  methodStepsTitle: 'Co dělat',
  methodSteps: ['Vyber jazyk rozhraní a klávesnici k tréninku.', 'Dívej se na povel na obrazovce, ne na klávesnici.', 'Říkej povel nahlas a vnímej pohyb ruky.', 'Stiskni klávesu až po vyslovení povelu.', 'Princip psaní poslepu je jednoduchý: každá klávesa patří jednomu prstu. Každý prst mačká svou vlastní skupinu kláves.', 'Barevné schéma níže ukazuje, kterým prstem mačkat různé klávesy. MatrixType to už zohledňuje, takže se schéma nemusíš učit nazpaměť.', 'Trenažér ukáže krátký povel, například: „levou, 1., na místě“. „Levou“ znamená levou rukou, „1.“ znamená prvním prstem a „na místě“ znamená klávesu ve výchozí pozici tohoto prstu.', 'Prsty se počítají od ukazováčku k malíčku: ukazováček — 1, prostředníček — 2, prsteníček — 3, malíček — 4. Palec se nečísluje a používá se pro mezeru.', 'Když povel zní „pravou, 1., nahoru“, stiskni ukazováčkem pravé ruky klávesu v horní řadě, ne klávesu ve výchozí pozici.'],
  fingerRulesTitle: 'Číslování prstů',
  fingerRules: ['Palec se nepočítá.', 'První prst je vedle palce, potom druhý, třetí a čtvrtý.', 'Levá ruka zleva doprava: 4, 3, 2, 1.', 'Pravá ruka zleva doprava: 1, 2, 3, 4.'],
  interfaceLanguage: 'Jazyk rozhraní',
  keyboardLayout: 'Klávesnice',
  textMode: 'Text',
  customTextLabel: 'Vlastní',
  defaultTextLabel: 'Výchozí',
  start: 'Start',
  customTextAction: 'Vlastní text',
  settings: 'Nastavení',
  sayCommand: 'Řekni povel',
  complete: 'hotovo',
  unsupportedChar: 'nepodporovaný znak',
  currentChar: 'Aktuální znak',
  errorCount: 'Chyby',
  restart: 'Znovu',
  back: 'Zpět',
  trainerHint: 'Nejprve řekni horní povel nahlas, potom stiskni klávesu. Špatná klávesa krátce blikne červeně.',
  trainerRulesTitle: 'Jak trénovat',
  trainerRules: ['Nedívej se na klávesnici.', 'Vždy říkej povely nahlas.', 'Pohybuj se pomalu a přesně.', 'Při učení je přesnost důležitější než rychlost. Rychlost přijde později.'],
  unsupportedHint: 'Pro tento znak není povel. Nahraď ho v nastavení nebo ho přidej do otevřené mapy povelů.',
  finishedTitle: 'Text dokončen',
  finishedText: 'Můžeš text zopakovat nebo přejít do nastavení.',
  settingsEyebrow: 'Nastavení',
  settingsTitle: 'Vlastní tréninkový text',
  settingsLead: 'Vlastní text zachová velikost písmen. Znaky bez povelů budou v trenažéru označeny.',
  useCustomText: 'Použít vlastní text',
  textLabel: 'Text',
  save: 'Uložit',
  reset: 'Resetovat',
  space: 'mezerník'
});

export const skCopy = createCopy({
  welcomeTitle: 'Písanie naslepo pomocou telesných povelov',
  welcomeMotivation: [
    'Pre ľudí pracujúcich pri počítači je písanie naslepo základná profesionálna zručnosť. Napriek tomu ju mnohí stále nemajú, pretože predtým neexistoval rýchly spôsob, ako sa ju naučiť bez desiatok hodín memorovania pravidiel.',
    'MatrixType je jedinečný trenažér, ktorý umožňuje od prvého dňa písať naslepo všetky symboly pomocou krátkych telesných povelov.',
    'Dve a pol hodiny vedomého tréningu stačia na vybudovanie zručnosti, ktorá vám bude slúžiť roky.'
  ],
  welcomeLead: 'Trenažér ukáže ďalší znak a krátky povel na vyslovenie nahlas. Povedz povel, stlač kláves správnym prstom a pokračuj až po správnom zadaní.',
  architectureNote: 'Jazyk rozhrania a trénovaná klávesnica sa volia oddelene. Povely sú v jazyku rozhrania.',
  methodStepsTitle: 'Čo robiť',
  methodSteps: ['Vyber jazyk rozhrania a klávesnicu na tréning.', 'Pozeraj na povel na obrazovke, nie na klávesnicu.', 'Hovor povel nahlas a vnímaj pohyb ruky.', 'Stlač kláves až po vyslovení povelu.', 'Princíp písania naslepo je jednoduchý: každému klávesu zodpovedá jeden prst. Každý prst stláča svoju vlastnú skupinu klávesov.', 'Farebná schéma nižšie ukazuje, ktorým prstom stláčať jednotlivé klávesy. MatrixType to už zohľadňuje, takže sa schému nemusíš učiť naspamäť.', 'Trenažér ukáže krátky povel, napríklad: „ľavou, 1., na mieste“. „Ľavou“ znamená ľavou rukou, „1.“ znamená prvým prstom a „na mieste“ znamená kláves vo východiskovej pozícii tohto prsta.', 'Prsty sa počítajú od ukazováka po malíček: ukazovák — 1, prostredník — 2, prstenník — 3, malíček — 4. Palec sa nečísluje a používa sa na medzeru.', 'Ak povel znie „pravou, 1., hore“, stlač ukazovákom pravej ruky kláves v hornom rade, nie kláves vo východiskovej pozícii.'],
  fingerRulesTitle: 'Číslovanie prstov',
  fingerRules: ['Palec sa nepočíta.', 'Prvý prst je vedľa palca, potom druhý, tretí a štvrtý.', 'Ľavá ruka zľava doprava: 4, 3, 2, 1.', 'Pravá ruka zľava doprava: 1, 2, 3, 4.'],
  interfaceLanguage: 'Jazyk rozhrania',
  keyboardLayout: 'Klávesnica',
  textMode: 'Text',
  customTextLabel: 'Vlastný',
  defaultTextLabel: 'Predvolený',
  start: 'Štart',
  customTextAction: 'Vlastný text',
  settings: 'Nastavenia',
  sayCommand: 'Povedz povel',
  complete: 'hotovo',
  unsupportedChar: 'nepodporovaný znak',
  currentChar: 'Aktuálny znak',
  errorCount: 'Chyby',
  restart: 'Znova',
  back: 'Späť',
  trainerHint: 'Najprv povedz horný povel nahlas, potom stlač kláves. Nesprávny kláves krátko blikne červeno.',
  trainerRulesTitle: 'Ako trénovať',
  trainerRules: ['Nepozeraj na klávesnicu.', 'Vždy hovor povely nahlas.', 'Pohybuj sa pomaly a presne.', 'Pri učení je presnosť dôležitejšia než rýchlosť. Rýchlosť príde neskôr.'],
  unsupportedHint: 'Pre tento znak nie je povel. Nahraď ho v nastaveniach alebo ho pridaj do otvorenej mapy povelov.',
  finishedTitle: 'Text dokončený',
  finishedText: 'Môžeš text zopakovať alebo prejsť do nastavení.',
  settingsEyebrow: 'Nastavenia',
  settingsTitle: 'Vlastný tréningový text',
  settingsLead: 'Vlastný text zachová veľkosť písmen. Znaky bez povelov budú v trenažéri označené.',
  useCustomText: 'Použiť vlastný text',
  textLabel: 'Text',
  save: 'Uložiť',
  reset: 'Resetovať',
  space: 'medzerník'
});

function createCopy(seed: CopySeed): AppCopy {
  return {
    supportTitle: 'Support MatrixType',
    supportText: 'MatrixType is free and open. If it helps you learn, you can send a coffee and support development.',
    supportAction: 'Send a coffee',
    ...seed
  };
}
