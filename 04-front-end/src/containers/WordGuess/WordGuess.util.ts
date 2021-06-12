import {LetterCount} from "./WordGuess.type";

const MAX_LETTERS: number = 10;

const generateRandomLetters = (): string[] => {
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
    const letterArr: string[] = [];

    for (let i: number = 0; i < MAX_LETTERS; i++) {
        letterArr.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    return letterArr;
};

const countLetterOccurrences = (arr: string[]): LetterCount =>
    arr.reduce((prev: LetterCount, curr: string) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {});

const adjustLetterOccurrence = (
    letterCount: LetterCount,
    letter: string,
    shouldBeIncreased: boolean
): LetterCount => {
    return shouldBeIncreased
        ? { ...letterCount, ...{ [letter]: letterCount[letter] + 1 } }
        : { ...letterCount, ...{ [letter]: letterCount[letter] - 1 } };
};

export {
    generateRandomLetters,
    countLetterOccurrences,
    adjustLetterOccurrence,
};
