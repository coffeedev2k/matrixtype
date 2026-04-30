import type { AppCopy } from './types';

export const enCopy: AppCopy = {
  welcomeTitle: 'Blind typing through body commands',
  welcomeMotivation: [
    'For people who work at a computer, blind typing is a core professional skill. Many still do not have it because there was no fast way to learn without memorizing rules for dozens of hours.',
    'MatrixType is a one-of-a-kind trainer that lets you start blind typing every symbol from day one through short body commands.',
    'Two and a half hours of focused practice is enough to build a skill that will work for you for years.'
  ],
  welcomeLead:
    'The trainer shows the next character and a short command to say aloud. Say the command, press the key with the required finger, and advance only after the correct input.',
  architectureNote:
    'The interface language and the keyboard being trained are independent. Commands follow the interface language.',
  methodStepsTitle: 'What to do',
  methodSteps: [
    'Choose the interface language and the keyboard you want to train.',
    'Look at the command on the screen, not at the keyboard.',
    'Say the command aloud and notice the movement in your hand.',
    'Press the key only after saying the command.',
    'The principle of blind typing is simple: every key belongs to a finger. Each finger presses its own group of keys.',
    'The color scheme below shows which finger presses which keys. MatrixType already accounts for this, so you do not need to memorize the scheme.',
    'The trainer shows a short command, for example: “left, 1st, in place”. “Left” means the left hand, “1st” means the first finger, and “in place” means the key in that finger’s home position.',
    'Fingers are counted from index finger to little finger: index is 1, middle is 2, ring is 3, little finger is 4. The thumb is not numbered and is used for space.',
    'If the command is “right, 1st, up”, press the upper-row key with the first finger of your right hand, not the key in its home position.'
  ],
  fingerRulesTitle: 'Finger numbering',
  fingerRules: [
    'The thumb is not counted.',
    'The first finger is the one after the thumb, then second, third, and fourth.',
    'On the left hand from left to right: 4, 3, 2, 1.',
    'On the right hand from left to right: 1, 2, 3, 4.'
  ],
  interfaceLanguage: 'Interface language',
  keyboardLayout: 'Keyboard',
  textMode: 'Text',
  customTextLabel: 'Custom',
  defaultTextLabel: 'Default',
  start: 'Start',
  customTextAction: 'Custom text',
  settings: 'Settings',
  sayCommand: 'Say the command',
  complete: 'done',
  unsupportedChar: 'unsupported character',
  currentChar: 'Current character',
  errorCount: 'Errors',
  restart: 'Restart',
  back: 'Back',
  trainerHint: 'Say the top command aloud first, then press the key. A wrong key flashes the screen red.',
  trainerRulesTitle: 'How to train',
  trainerRules: [
    'Do not look at the keyboard.',
    'Always say the commands aloud.',
    'Move slowly and accurately.',
    'Accuracy matters more than speed while learning. Speed comes later.'
  ],
  unsupportedHint: 'There is no command for this character. Replace it in settings or add it to the open command map.',
  finishedTitle: 'Text complete',
  finishedText: 'You can repeat this text or go to settings.',
  settingsEyebrow: 'Settings',
  settingsTitle: 'Custom training text',
  settingsLead: 'Custom text keeps its case. Characters without commands will be marked in the trainer.',
  supportTitle: 'Support MatrixType',
  supportText: 'MatrixType is free and open. If it helps you learn, you can send a coffee and support development.',
  supportAction: 'Send a coffee',
  useCustomText: 'Use custom text',
  textLabel: 'Text',
  save: 'Save',
  reset: 'Reset',
  space: 'space'
};
