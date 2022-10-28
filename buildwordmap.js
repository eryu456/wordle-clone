// Node script for preprocessing our word list JSON

const { readFileSync, writeFileSync } = require('fs');

const DICTIONARY_JSON = './dictionary.json';
const WORDLE_ANSWER_BANK_JSON = './wordle-answers.json';
const WORDLE_DICTIONARY_JSON = './wordle-dictionary.json';

const WORD_MAP_JSON = './docs/words.json';

const answerWords = JSON.parse(readFileSync(WORDLE_ANSWER_BANK_JSON, 'utf-8'));
const dictionaryWords = [
    ...Object.keys(JSON.parse(readFileSync(DICTIONARY_JSON, 'utf-8'))),
    ...answerWords,
    ...JSON.parse(readFileSync(WORDLE_DICTIONARY_JSON, 'utf-8')),
];

const answers = answerWords.reduce((prev, word) => {
    if (!prev[word.length]) prev[word.length] = {};
    prev[word.length][word] = 1;
    return prev;
}, {});
const dictionary = dictionaryWords.reduce((prev, word) => {
    if (!prev[word.length]) prev[word.length] = {};
    prev[word.length][word] = 1;
    return prev;
}, {});

writeFileSync(
    WORD_MAP_JSON,
    JSON.stringify({
        dictionary,
        answers,
    })
);
