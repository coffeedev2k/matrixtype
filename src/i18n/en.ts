import type { AppCopy } from './types';

export const enCopy: AppCopy = {
  welcomeTitle: 'Blind typing through body commands',
  welcomeLead:
    'The trainer shows the next character and a short command to say aloud. Say the command, press the key with the required finger, and advance only after the correct input.',
  architectureNote:
    'The interface language and the keyboard being trained are independent. Commands follow the interface language.',
  methodStepsTitle: 'What to do',
  methodSteps: [
    'Choose the interface language and the keyboard you want to train.',
    'Look at the command on the screen, not at the keyboard.',
    'Say the command aloud and notice the movement in your hand.',
    'Press the key only after saying the command.'
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
  settingsLead: 'Text is lowercased. Characters without commands will be marked in the trainer.',
  useCustomText: 'Use custom text',
  textLabel: 'Text',
  save: 'Save',
  reset: 'Reset',
  space: 'space'
};
