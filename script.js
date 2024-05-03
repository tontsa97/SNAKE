(function () {
    const gameContainer = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');

    let snake = [{ x: 10, y: 10 }]; // Alusta käärmeen aloituspaikka
    let apple = { x: 5, y: 5 }; // Alusta omenan sijainti
    let dx = 0; // Käärmeen liikkeen muutos x-akselilla
    let dy = 0; // Käärmeen liikkeen muutos y-akselilla
    let score = 0; // Pisteet
    let intervalId = null;

    function draw() {
        // Tyhjennä pelialue
        gameContainer.innerHTML = '';

        // Piirrä käärme
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add('snake');
            gameContainer.appendChild(snakeElement);
        });

        // Piirrä omena
        const appleElement = document.createElement('div');
        appleElement.style.gridRowStart = apple.y;
        appleElement.style.gridColumnStart = apple.x;
        appleElement.classList.add('apple');
        gameContainer.appendChild(appleElement);

        // Päivitä pisteet
        scoreElement.textContent = score;
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head); // Lisää uusi pään sijainti

        // Tarkista törmäykset
        if (head.x === apple.x && head.y === apple.y) {
            // Syö omena
            apple = { x: Math.floor(Math.random() * 20) + 1, y: Math.floor(Math.random() * 20) + 1 };
            score++;
        } else {
            // Poista häntä, jos ei syö omenaa
            snake.pop();
        }
    }

    document.addEventListener('keydown', e => {
        // Pelaajan syötteet
        switch (e.key) {
            case 'ArrowUp':
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    });

    function startGame() {
        intervalId = setInterval(main, 100); // Päivitä peli 100 millisekunnin välein
    }

    function stopGame() {
        clearInterval(intervalId);
    }

    function main() {
        moveSnake();
        draw();

        // Tarkista törmäykset
        if (snake[0].x < 1 || snake[0].x > 20 || snake[0].y < 1 || snake[0].y > 20 || snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
            stopGame();
        }
    }

    startGame();
})();

