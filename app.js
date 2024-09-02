document.addEventListener('DOMContentLoaded', () => {
    const words = [
        'apple', 'banana', 'orange', 'grape', 'pear', 'peach', 'plum',
        'cherry', 'mango', 'kiwi'
    ];

    const colors = [
        'pink', 'lightblue', 'lightgreen', 'yellow', 'coral', 'violet',
        'lightcoral', 'lightgoldenrodyellow', 'lightseagreen', 'lightsalmon'
    ];

    const gameContainer = document.getElementById('game-container');
    let typedWord = '';

    function createBalloon() {
        const word = words[Math.floor(Math.random() * words.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = color;
        balloon.style.left = `${Math.random() * (gameContainer.clientWidth - 80)}px`;
        balloon.style.animationDuration = `${Math.random() * 5 + 5}s`;

        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.textContent = word;
        balloon.appendChild(wordDiv);

        gameContainer.appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }

    function createPin(balloon) {
        const pin = document.createElement('div');
        pin.classList.add('pin');
        gameContainer.appendChild(pin);
        pin.style.left = `${balloon.offsetLeft + balloon.clientWidth / 2 - pin.clientWidth / 2}px`;
        pin.style.bottom = `${window.innerHeight - balloon.getBoundingClientRect().top}px`;

        pin.style.animation = 'rise 0.3s linear forwards';

        // Remove the pin and burst the balloon immediately after animation ends
        pin.addEventListener('animationend', () => {
            balloon.classList.add('burst');
            pin.remove();
            setTimeout(() => balloon.remove(), 150); // Ensure balloon is removed right after burst
        });
    }

    function checkWord(event) {
        typedWord += event.key.toLowerCase();
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            const wordDiv = balloon.querySelector('.word');
            const word = wordDiv.textContent;
            if (word.startsWith(typedWord)) {
                wordDiv.textContent = word.slice(typedWord.length);
                if (wordDiv.textContent === '') {
                    createPin(balloon);
                    typedWord = '';
                }
            }
        });
        if (!Array.from(balloons).some(balloon => balloon.querySelector('.word').textContent.startsWith(typedWord))) {
            typedWord = '';
        }
    }

    setInterval(createBalloon, 2000);
    document.addEventListener('keypress', checkWord);
});