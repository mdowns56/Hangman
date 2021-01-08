$(function () {
    let wins = 0;
    let losses = 0;
    let game = Hangman();
    display(game.gameState());

    $('.guess:not(.right,.wrong)').on('click', function () {
        let letter = $(this).val();
        let result = game.guess(letter);

        if (result.state) {
            display(result);

            $(this).addClass(result.guesses.find(c => c.letter == letter).right ? 'right' : 'wrong');

            if (game.isOver()) {
                if (result.state == 'win')
                    wins++;
                else losses++;
                endGame(game, wins, losses);
            }
        }
    });

    $('.restart').on('click', function () {
        restart(game);
        $(this).hide();
    });
});

const display = (gameState) => {
    let outputElements = gameState.output.map((x) => $(`<span>${x}</span>`));
    $('.output').html(outputElements);

    $('.picture').html(gameState.state);
}

const endGame = (game, wins, losses) => {
    let result = game.gameState();
    $('.guess').prop('disabled', 'disabled');
    $('.restart').show();
    $('.picture').html('');
    $('.ending').addClass(result.state).html(result.state);
    $('.record').html($(`<span>${wins}-${losses}</span>`));
}

const restart = (game) => {
    game.start();
    display(game.gameState());

    $('.guess').removeClass(['right', 'wrong']).prop('disabled', false);
    $('.ending').removeClass(['win','loss']).html('');
}