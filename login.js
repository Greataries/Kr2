window.onload = function () {
    const messageDiv = document.getElementById('message');
    const messageBox = document.getElementById('message-box');
    const nameForm = document.getElementById('name-form');
    const emailForm = document.getElementById('email-form');
    const nextButton = document.getElementById('next-button');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const genieGif = document.getElementById('genie-gif');

    // Event listener to trigger the rest of the sequence after the genie animation completes
    genieGif.addEventListener('animationend', function () {
        // Display the message box after the genie animation is done
        messageBox.style.display = 'block'; // Show the message box

        // Display the welcome message after the message box appears
        setTimeout(() => {
            messageDiv.innerHTML = "Welcome to Key Racer!";
            setTimeout(() => {
                messageDiv.innerHTML = "Please tell me your name:";
                nameForm.style.display = 'block'; // Show name input form
            }, 3000);
        }, 500); // Short delay to emphasize the entrance
    });

    // Handle the next button click to ask for the email
    nextButton.onclick = function () {
        const name = nameInput.value;
        if (name) {
            messageDiv.innerHTML = `Hello, ${name}! Now, please tell me your email:`;
            nameForm.style.display = 'none'; // Hide name input form
            emailForm.style.display = 'block'; // Show email input form
        } else {
            alert('Please enter your name!');
        }
    };

    // Handle the form submission
    emailForm.onsubmit = function (event) {
        event.preventDefault();
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

        if (email && emailPattern.test(email)) {
            alert(`Thank you, ${nameInput.value}! We have received your email: ${email}.`);
            messageDiv.innerHTML = "Thank you for submitting your details!";
            emailForm.style.display = 'none'; // Hide email input form

            // Show the game instructions after the user submits their details
            showGameInstructions();
        } else {
            alert('Please enter a valid email address!');
        }
    };

    function showGameInstructions() {
        setTimeout(() => {
            messageDiv.innerHTML = "Now, let me tell you how to play the game!";
            setTimeout(() => {
                messageDiv.innerHTML = "In this game, you need to write the words shown in the balloon. Try to be quick and accurate!";

                // After instructions, ask for game duration
                setTimeout(() => {
                    askForDuration();
                }, 3000); // Adjust timing to fit your needs
            }, 3000); // Display instructions after a short delay
        }, 1000); // Initial delay before starting instructions
    }

    function askForDuration() {
        messageDiv.innerHTML = "How long would you like to play? Choose a duration:";
        messageBox.innerHTML = ""; // Clear previous content

        const durationOptions = ["2 min", "5 min", "7 min"];
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'selection-buttons'; // Add a class for styling
        durationOptions.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.onclick = function () {
                const selectedDuration = option;
                messageDiv.innerHTML = `You've chosen to play for ${selectedDuration}. Now, select the difficulty level.`;
                clearButtons();
                askForDifficulty();
            };
            buttonContainer.appendChild(button);
        });
        messageBox.appendChild(buttonContainer);
    }

    function askForDifficulty() {
        messageDiv.innerHTML = "Select the difficulty level:";
        messageBox.innerHTML = ""; // Clear previous content

        const difficultyOptions = ["Easy", "Medium", "Hard"];
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'selection-buttons'; // Add a class for styling
        difficultyOptions.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.onclick = function () {
                const selectedDifficulty = option;
                messageDiv.innerHTML = `You've chosen ${selectedDifficulty} difficulty.`;
                clearButtons();

                // Start countdown and then redirect
                startCountdownAndRedirect();
            };
            buttonContainer.appendChild(button);
        });
        messageBox.appendChild(buttonContainer);
    }

    function clearButtons() {
        const buttonContainers = messageBox.getElementsByClassName('selection-buttons');
        while (buttonContainers.length > 0) {
            messageBox.removeChild(buttonContainers[0]);
        }
    }

    function startCountdownAndRedirect() {
        let countdown = 3; // Countdown duration in seconds
        messageDiv.innerHTML = `Get ready! The game will start in ${countdown} seconds...`;

        const countdownInterval = setInterval(() => {
            countdown--;
            messageDiv.innerHTML = `Get ready! The game will start in ${countdown} seconds...`;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                messageDiv.innerHTML = "See you in the game, best of luck!";
                setTimeout(() => {
                    genieGif.style.animation = 'slideOutToRight 1s forwards'; // Add a slide-out animation
                    setTimeout(() => {
                        window.location.href = 'game.html'; // Redirect to game page
                    }, 1000); // Delay for the genie animation to complete
                }, 1000); // Delay to show final message
            }
        }, 1000); // Update countdown every second
    }
};
