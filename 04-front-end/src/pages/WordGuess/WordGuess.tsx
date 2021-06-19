import React, { useState } from 'react';
import {
    generateRandomLetters,
    countLetterOccurrences,
    adjustLetterOccurrence,
} from './WordGuess.util';

const WordGuess = (): JSX.Element => {
    const [randomLetters] = useState(() => generateRandomLetters());
    const [letterCount, setLetterCount] = useState(() =>
        countLetterOccurrences(randomLetters)
    );
    const [selectedWord, setSelectedWord] = useState('');

    const handleInputChange = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        const lastTypedLetter = e.key;
        const isValid =
            randomLetters.includes(lastTypedLetter) &&
            letterCount[lastTypedLetter] > 0;

        if (!isValid) {
            e.preventDefault();
            if (e.code !== 'Backspace')
                alert(`Character ${lastTypedLetter} is not available`);
        }

        if (isValid) {
            setSelectedWord(selectedWord.concat(lastTypedLetter));
            setLetterCount({
                ...letterCount,
                ...adjustLetterOccurrence(letterCount, lastTypedLetter, false),
            });
        }

        if (e.code === 'Backspace' && !!selectedWord.length) {
            const lastCharacter = selectedWord.slice(-1);
            setSelectedWord(selectedWord.slice(0, -1));
            setLetterCount({
                ...letterCount,
                ...adjustLetterOccurrence(letterCount, lastCharacter, true),
            });
        }
    };

    return (
        <div>
            <div>{randomLetters}</div>
            <input
                type="text"
                readOnly
                onKeyDown={handleInputChange}
                value={selectedWord}
            />
        </div>
    );
};

export default WordGuess;
