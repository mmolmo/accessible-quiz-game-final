document.addEventListener("DOMContentLoaded", () => {
    const settingsContainer = document.getElementById("settings-container");
    const quizSelection = document.getElementById("quiz-selection-container");
    //const buttonsSettings = document.getElementsByClassName("buttons-settings")
    const startButton = document.getElementById("start-btn");
    const backtoSettingsButton = document.getElementById("backto-settings-btn");
    const questionContainer = document.getElementById("question-container");
    
    const answersList = document.querySelector(".buttons.answers");
    const timerDisplay = document.getElementById("timer-display");
    const results = document.getElementById("results");
    const characterImgContainer = document.getElementById("character-img-container");
    const characterDialogue = document.getElementById("character-dialogue");
    const characterContainer = document.getElementById("character-container");
    const rewardsContainer = document.getElementById("rewards");
    const wholeQuizContainer = document.getElementById("whole-quiz-container");
    const quizButton = document.getElementById("toquiz-btn");
    const timerDuration = document.getElementById("timer-duration");

    const settingsTitle = document.getElementById("settings-title");

    const practiceMode = document.getElementById("practice-mode");
    const failSafe = document.getElementById("fail-safe");

    const progressBar = document.getElementById("progress-bar");
    const progressBarContainer = document.getElementById("progress-bar-container");
    const progressLabel = document.getElementById("progress-label");

    const characterExpressions = {
        neutral: "https://via.placeholder.com/150?text=Neutral",
        joyful: "https://via.placeholder.com/150?text=Joyful",
        encouraging: "https://via.placeholder.com/150?text=Encouraging",
    };

    const rewards = [
        { score: 75, image: "https://via.placeholder.com/100?text=Gold+Reward", alt: "Gold Reward" },
        { score: 60, image: "https://via.placeholder.com/100?text=Silver+Reward", alt: "Silver Reward" },
        { score: 30, image: "https://via.placeholder.com/100?text=Bronze+Reward", alt: "Bronze Reward" },
    ];

    const characterGreetings = [
        {
            intro: ["Welcome! Are you ready to start the quiz?", "array item 2"],
            farewell: ["See you next time!", "Until next time!", "array item 2"]
        }
    ];

    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Paris", "Berlin", "Madrid", "Rome"],
            correct: 0,
            characterDialogue: {
                intro: "Let's get started! Here's your first question.",
                question: "What is the capital of France?",
                correct: "Great job! Paris is indeed the capital of France.",
                wrong: "Not quite. The answer starts with 'P'. Keep going!"
            }
        },
        {
            question: "What is 5 + 3?",
            answers: ["5", "7", "8", "9"],
            correct: 2,
            characterDialogue: {
                intro: "Ready for the next one? Let's see how you do.",
                question: "What is 5 + 3?",
                correct: "Well done! 8 is the right answer.",
                wrong: "Close, but no. Hint: It's the sum of 5 and 3. Don't give up!"
            }
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Venus", "Mars", "Jupiter"],
            correct: 2,
            characterDialogue: {
                intro: "Last question! Let's see how you do.",
                question: "Which planet is known as the Red Planet?",
                correct: "Well done! Mars is the right answer.",
                wrong: "Close, but no. Hint: The answer starts with 'M'. Don't give up!"
            }
        },
    ];

    const totalQuestions = questions.length;


    let currentQuestionIndex = 0;
    let score = 0;
    let duration = 30;
    let timer;
    let timerInterval;
    let correctAnswers = 0;
    let selectedAnswer;
    
    const soundfx = {
        beep: new Audio("./assets/sounds/podcast-smooth-jazz-fashion-stylish-music-249305.mp3"),
        correctAnswer: new Audio("./assets/sounds/notification-5-140376.mp3"),
        wrongAnswer: new Audio("./assets/sounds/wrong-answer-129254.mp3"),
        celebration: new Audio("./assets/sounds/celebration-129255.mp3"),
        selectAnswer: new Audio("./assets/sounds/video-game-menu-click-sounds2.mp3")
    };

    
    showGameContainer();
    backtoSettingsButton.addEventListener("click", showSettingsMenu);

    function showSettingsMenu() {
        console.log (characterContainer);
        characterContainer.hidden = true;
        progressBarContainer.hidden = true;

        startButton.hidden=true;
        backtoSettingsButton.hidden=true;
        quizButton.hidden=false;

        quizSelection.hidden = true;
        wholeQuizContainer.hidden = true;
        results.hidden = true;

        settingsContainer.hidden = false;

        console.log(quizSelection.hidden);
        console.log(characterContainer);
        console.log(settingsTitle);

        settingsTitle.focus();
        //answersList.hidden=false;
    };

    quizButton.addEventListener("click", showGameContainer);

    function showGameContainer() {
        //move();
        console.log(quizSelection);
        /*document.addEventListener('focusin', function() {
            console.log('focused: ', document.activeElement)
          }, true);*/
        settingsContainer.hidden = true;
        results.hidden = true;

        progressBarContainer.hidden = true;
        
        characterContainer.hidden = false;
        quizSelection.hidden = false;
        wholeQuizContainer.hidden = true;
        timerDisplay.hidden = true;

        startButton.hidden=false;
        backtoSettingsButton.hidden=false;
        quizButton.hidden=true;
        
        startButton.textContent = '1. Start Challenge';

        let timer = duration;
        timerDisplay.textContent = `Time Left: ${timer} seconds`;
        console.log(characterGreetings[0].intro[0]);
        updateCharacterExpression("neutral");
        updateCharacterDialogue(characterGreetings[0].intro[0]);
    }

    startButton.addEventListener("click", startGame);
    //restartButton.addEventListener("click", startGame);

    async function startGame() {
        playSound(soundfx.beep);
        settingsContainer.hidden = true;
        quizSelection.hidden = true;
        results.hidden = true;
        progressBarContainer.hidden = false;

        wholeQuizContainer.hidden=false;
        characterContainer.hidden = false;
        questionContainer.hidden = false;
        timerDisplay.hidden = false;

        timer = duration;
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        
        // Update progress bar value and labels
        progressBar.value = 0; 
        progressLabel.textContent = `${0}/${totalQuestions} questions answered.`;

        // Reset character dialogue and expressions
        updateCharacterExpression("neutral");
        
        runQuiz();
    }

   

    function updateTimer() {
        timer--;
        timerDisplay.textContent = `Time Left: ${timer} seconds`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            console.log(timer);
           
        }
    }

    function updateCharacterExpression(expressionKey) {
        const expression = characterExpressions[expressionKey];
        console.log(expression);
        characterImgContainer.innerHTML = `
            <img id="character-img" src="${expression}" alt="Quiz Character ${expressionKey.charAt(0).toUpperCase() + expressionKey.slice(1)} Expression"  role="img">
        `;
    }

    timerDuration.addEventListener("change", () => {
        duration = parseInt(timerDuration.value);
        //console.log(duration);
    });


    

    async function runQuiz() {
        try {
            while (currentQuestionIndex < questions.length) {
                const questionResult = await handleQuestionCycle();
                
                // Break the loop if game is ended
                if (questionResult === 'gameEnded') {
                    break;
                }
            }
            
            // If all questions are answered normally
            if (currentQuestionIndex >= questions.length) {

                console.log("All questions answered. Moving to results.");
                endGame();
            }
        } catch (error) {
            console.error("Quiz error:", error);
            endGame();
        }
    }
    
    function handleQuestionCycle() {
        return new Promise((resolve, reject) => {
            // Reset timer
            timer = duration;
            // Show current question
            showQuestion();
            
            // Start timer interval
            const timerIntervalId = setInterval(() => {
                timer--;
                timerDisplay.textContent = `Time Left: ${timer} seconds`;
                
                // Check if time is up
                if (timer <= 0) {
                    clearInterval(timerIntervalId);
                    console.log("time's up. Moving to results.");
                    endGame(); // Directly call endGame when timer reaches 0
                    resolve('timeUp');
                    return;
                }
            }, 1000);
    
            // Override handleAnswer to work with Promise
            const originalHandleAnswer = handleAnswer;
            handleAnswer = (selectedAnswer) => {
                clearInterval(timerIntervalId);
                const result = originalHandleAnswer(selectedAnswer);
                
                // If game is ended by handleAnswer
                if (result === 'gameEnded') {
                    resolve('gameEnded');
                } else {
                    resolve('answered');
                }
            };
        });
    }
    function handleAnswer(selectedAnswer) {
        const questionData = questions[currentQuestionIndex];
    
        if (selectedAnswer === questionData.correct) {
            score += timer;
            correctAnswers++;
            
            updateCharacterDialogue(questionData.characterDialogue.correct);
            updateCharacterExpression("joyful");
            playSound(soundfx.correctAnswer);
        } else {
            updateCharacterDialogue(questionData.characterDialogue.wrong);
            updateCharacterExpression("encouraging");
            playSound(soundfx.wrongAnswer);
        }
        
        currentQuestionIndex++;
    
        // Check if game should end
        if (currentQuestionIndex >= questions.length) {
            console.log(currentQuestionIndex);
            console.log("All questions answered. Moving to results.");
            endGame();
            return 'gameEnded';
        }
        
        return 'answered';
    }
    
    function showQuestion() {
        const questionData = questions[currentQuestionIndex];
        
        // Display character intro for the question
        updateCharacterDialogue(questionData.characterDialogue.intro);
        updateCharacterExpression("neutral");
        updateProgress();
    
        // Show question after a short delay
        setTimeout(() => {
            updateCharacterDialogue(questionData.characterDialogue.question);
            
            // Prepare answers
            answersList.innerHTML = "";
            questionData.answers.forEach((answer, index) => {
                const answerButton = document.createElement("button");
                answerButton.textContent = answer;
                answerButton.setAttribute("role", "button");
                answerButton.setAttribute("aria-label", `Answer Choice: ${answer}`);
                answerButton.tabIndex = 0;
                
                answerButton.addEventListener("click", () => {
                    //console.log("click?");
                    //console.log("index" + index);
                    handleAnswer(index);
                });
                
                answerButton.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        answerButton.click();
                        //handleAnswer(index);
                    }
                });
                
                answersList.appendChild(answerButton);
            });
        }, 1000);
    }
    
/*    function updateProgress() {
        const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
        progressBar.value = progressPercentage;
        progressLabel.textContent = `${currentQuestionIndex + 1}/${totalQuestions} questions answered.`;
    }*/
    
    

function updateProgress() {
    console.log("progess");
    const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

    // Update progress bar value
    progressBar.value = progressPercentage;

    // Update progress label text
    progressLabel.textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;
}


function endGame() {
    
    questionContainer.hidden = true;
    timerDisplay.hidden = true;
    results.hidden = false;
    quizSelection.hidden = false;
    wholeQuizContainer.hidden = true;
    progressBarContainer.hidden = true;

    stopSound(soundfx.beep);

    const scoreMessage = correctAnswers === questions.length
        ? "Outstanding!"
        : correctAnswers >= Math.floor(questions.length / 2)
        ? "Good job! You did well!"
        : "Keep trying! Practice makes perfect.";

    console.log("Practicemode " + practiceMode.checked);
    console.log("Failsafe " + failSafe.checked);

    startButton.textContent = '1. Play Again';

    if (practiceMode.checked) {
        score = 90;
        updateCharacterDialogue(
            `Challenge Completed in Practice Mode! No penalties. \n You got ${correctAnswers} out of ${questions.length} correct and your score is ${score}. ${scoreMessage}`
        );
        const reward = rewards.find(r => score >= r.score) || { image: "https://via.placeholder.com/100?text=No+Reward", alt: "No Reward"};
        rewardsContainer.innerHTML = `<img src="${reward.image}" alt="${reward.alt}">`;
    } else if (failSafe.checked) {
        if (correctAnswers <= 1) {
            score = 30
        } else {
            score = score;
        }
        updateCharacterDialogue(
           `Challenge Completed in Failsafe Mode - Progress Unaffected. \n You got ${correctAnswers} out of ${questions.length} correct and your score is ${score}. ${scoreMessage}`
        );
        const reward = rewards.find(r => score >= r.score) || { image: "https://via.placeholder.com/100?text=No+Reward", alt: "No Reward"};
        rewardsContainer.innerHTML = `<img src="${reward.image}" alt="${reward.alt}">`;
    } else {
        updateCharacterDialogue(
            `Challenge Completed.
            You got ${correctAnswers} out of ${questions.length} correct and your score is ${score}. ${scoreMessage}`
        );
        const reward = rewards.find(r => score >= r.score) || { image: "https://via.placeholder.com/100?text=No+Reward", alt: "No Reward"};
        rewardsContainer.innerHTML = `<img src="${reward.image}" alt="${reward.alt}">`;
    }

    /*updateCharacterDialogue(
        `Good game! You got ${correctAnswers} out of ${questions.length} correct and your score is . ${scoreMessage}`
    );*/
}

function updateCharacterDialogue(dialogue) {
    characterDialogue.textContent = dialogue;
}

function playSound(sound) {
    //let fx = new Audio(sound);
	sound.play();
}

function stopSound(sound) {
    //let fx = new Audio(sound);
    sound.pause();
    sound.currentTime = 0;
}



    // Function to get all focusable elements excluding those in hidden containers
// Function to get all focusable elements excluding those in hidden containers
function getFocusableElements() {
    const focusableSelectors = [
        "button",
        "a[href]",
        "input:not([type='hidden'])",
        "select",
        "textarea",
        "[tabindex]:not([tabindex='-1'])"
    ];
    const focusableElements = Array.from(document.querySelectorAll(focusableSelectors.join(',')));

    // Exclude elements in hidden containers
    return focusableElements.filter(el => {
        return el.offsetParent !== null; // Ensures the element is not hidden
    });
}

// Keydown event listener for number selection (focus only)
document.addEventListener("keydown", (event) => {
    // Allow only number keys (digits 1 through 9)
    if (event.key >= '1' && event.key <= '9') {
        event.preventDefault(); // Prevent the default behavior (e.g., form submission, or accidental clicks)
        
        const numKeyIndex = parseInt(event.key) - 1; // Convert number key to 0-based index
        const focusableElements = getFocusableElements();

        if (numKeyIndex >= 0 && numKeyIndex < focusableElements.length) {
            focusableElements[numKeyIndex].focus();
            console.log(`Focused on: ${focusableElements[numKeyIndex].tagName}`);
        } else {
            console.log("Invalid index");
        }
    } else {
        console.log("not a number key");
    }
});


});

 


document.addEventListener("focus", (event) => {
    // Allow only number keys (digits 1 through 9)
    const focusableElements = getFocusableElements();
    
});
