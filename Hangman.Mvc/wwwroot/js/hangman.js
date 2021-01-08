const Hangman = () => {

    let secretWord;
    let numMissedGuessToLose;
    let guesses = [];
    let state;
    let maskedWord = [];
    
    const words = ['apple', 'banana', 'cherry', 'pineapple', 'strawberry', 'melon'];

    const start = () => {
        let random = Math.floor(Math.random() * words.length);

        init(words[random]);

        return gameState();
    }

    const init = (word) => {
        secretWord = word;
        maskedWord = [];
        for (i = 0; i < secretWord.length; i++)
            maskedWord.push(false);
        numMissedGuessToLose = 6;
        guesses = [];
        setState();
    }

    const guess = (letter) => {
        if (gameStillOn()) {
            let validationResult = validateLetter(letter);

            if (!validationResult.isValid)
                return validationResult;

            
            let found = placeLetter(letter);

            if (!found) {
                numMissedGuessToLose--;
            }

            guesses.push({ 'letter': letter, 'right': found });

            setState();
        }

        return gameState();
    }

    const placeLetter = (letter) => {
        let found = false;

        for (i = 0; i < secretWord.length; i++) {
            if (secretWord[i] == letter) {
                maskedWord[i] = letter;
                found = true;
            }
        }

        return found;
    }

    const gameState = () => {
        return {
            'state': state,
            'output': output(),
            'guesses': guessedLetters()
        };
    }

    const setState = () => {
        if (checkLoss())
            state = 'loss';
        else if (checkWin())
            state = 'win';
        else
            state = numMissedGuessToLose.toString();
    }

    const gameStillOn = () => state != 'loss' && state != 'win';

    const isOver = () => !gameStillOn();

    const checkWin = () => {
        for (i = 0; i < maskedWord.length; i++)
            if (maskedWord[i] == false)
                return false;

        return true;
    }

    const checkLoss = () => {
        return numMissedGuessToLose == 0;
    }

    const guessedLetters = () => guesses.slice();

    const validateLetter = (c) => {
        if (!c || c.length != 1)
            return { isValid: false, message: 'Invalid letter' };

        c = c.toLowerCase();

        if (c < 'a' || c > 'z')
            return { isValid: false, message: 'Letter must be a-z' };

        if (guesses.find(g => g.letter == c))
            return { isValid: false, message: 'Letter already guessed' };

        return { isValid: true };
    }

    const output = () => {
        return maskedWord.map( v => !v ? '_' : v );
    }

    start();

    return {
        guess,
        gameState,
        isOver,
        start
    }
}