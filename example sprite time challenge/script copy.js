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


    let currentQuestionIndex = 0;
    let score = 0;
    let duration = 30;
    let timer;
    let timerInterval;
    let correctAnswers = 0;
    let selectedAnswer;
    


    showGameContainer();
    backtoSettingsButton.addEventListener("click", showSettingsMenu);

    function showSettingsMenu() {
        characterContainer.hidden = true;
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
        console.log(quizSelection);
        /*document.addEventListener('focusin', function() {
            console.log('focused: ', document.activeElement)
          }, true);*/
        settingsContainer.hidden = true;
        results.hidden = true;
        
        characterContainer.hidden = false;
        quizSelection.hidden = false;
        wholeQuizContainer.hidden = false;
        timerDisplay.hidden = false;

        
        startButton.textContent = 'Start Game';

        let timer = duration;
        timerDisplay.textContent = `Time Left: ${timer} seconds`;
        console.log(characterGreetings[0].intro[0]);
        updateCharacterExpression("neutral");
        updateCharacterDialogue(characterGreetings[0].intro[0]);
    }

    startButton.addEventListener("click", startGame);
    //restartButton.addEventListener("click", startGame);

    function startGame() {
        settingsContainer.hidden = true;
        quizSelection.hidden = true;
        results.hidden = true;

        wholeQuizContainer.hidden=false;
        characterContainer.hidden = false;
        questionContainer.hidden = false;
        timerDisplay.hidden = false;

        timer = duration;
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        // Reset character dialogue and expressions
        updateCharacterExpression("neutral");
    
    let questionAnsweredPromise = new Promise(function(myResolve, myReject) {
        // "Producing Code" (May take some time)
        
        showQuestion();

        //myResolve("Resolved"); // when successful
        //myReject("Promise error");  // when error
    });
        
        // "Consuming Code" (Must wait for a fulfilled Promise)
    questionAnsweredPromise.then(
        function(value) { /* code if successful */ 
            console.log("resolved");
            handleAnswer(selectedAnswer);
        },
        function(error) { /* code if some error */ 
            console.log("error");
        }
    );
    }

    function updateTimer() {
        timer--;
        timerDisplay.textContent = `Time Left: ${timer} seconds`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            console.log(timer);
            endGame();
        }
    }

    function updateCharacterExpression(expressionKey) {
        const expression = characterExpressions[expressionKey];
        console.log(expression);
        characterImgContainer.innerHTML = `
            <img src="${expression}" id="character-img" alt="Quiz Character ${expressionKey.charAt(0).toUpperCase() + expressionKey.slice(1)} Expression">
        `;
    }

    timerDuration.addEventListener("change", () => {
        duration = parseInt(timerDuration.value);
        //console.log(duration);
    });


    function showQuestion() {
        clearInterval(timerInterval);
        //console.log("whats the time " + timerInterval);
        const questionData = questions[currentQuestionIndex];
        // Display character intro for the question
        
        console.log(questionData.characterDialogue.intro);
        updateCharacterDialogue(questionData.characterDialogue.intro);
        updateCharacterExpression("neutral");
        // Nested timeout for the question dialogue
        setTimeout(() => {
            console.log(questionData.characterDialogue.question);
            updateCharacterDialogue(questionData.characterDialogue.question);
            timerInterval = setInterval(updateTimer, 1000);
        }, 1000); // Wait another 1 seconds
        // Initial 2-second delay
        
        //document.getElementById("question").textContent = questionData.question;
        answersList.innerHTML = "";
    
        questionData.answers.forEach((answer,index) => {
            const AnswerButton = document.createElement("button");
            AnswerButton.textContent = answer;
            AnswerButton.setAttribute("role", "button");
            AnswerButton.setAttribute("aria-label", `Answer Choice: ${answer}`);
            AnswerButton.tabIndex = 0;
    
            AnswerButton.addEventListener("click", () => {
                questionAnsweredPromise.resolve
                selectedAnswer = index;
            });
            AnswerButton.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    //handleAnswer(index);
                    questionAnsweredPromise.resolve;
                    selectedAnswer = index;
                    console.log(selectedAnswer);
                    //handleAnswer(index);
                } else {
                    console.log("not the key");
                }
            });
            answersList.appendChild(AnswerButton);
        });
        //timerInterval = setInterval(updateTimer, 1000);
    }
    
/*
function handleArrowNavigation() {
    const focusableElements = [...document.querySelectorAll("button, li, [tabindex]")];
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const currentIndex = focusableElements.indexOf(document.activeElement);
            const nextIndex = event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;

            if (nextIndex >= 0 && nextIndex < focusableElements.length) {
                focusableElements[nextIndex].focus();
            }
        }
    });
}
*/

function handleAnswer(selectedAnswer) {
    clearInterval(timerInterval);
    const questionData = questions[currentQuestionIndex];

    console.log("question:" + currentQuestionIndex + questionData);

    if (selectedAnswer == questionData.correct) {
        score += timer;
        //console.log(score);
        correctAnswers++;
        console.log(correctAnswers);
        
        updateCharacterDialogue(questionData.characterDialogue.correct);
        console.log(questionData.characterDialogue.correct);
        updateCharacterExpression("joyful");
        //console.log(updateCharacterExpression("joyful"));
        currentQuestionIndex++;
    } else {
        updateCharacterDialogue(questionData.characterDialogue.wrong);
        updateCharacterExpression("encouraging");
        console.log(questionData.characterDialogue.wrong);
        currentQuestionIndex++;
    }
    setTimeout(() => {
        if (currentQuestionIndex < questions.length && currentQuestionIndex  > -1) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1000);

}

function endGame() {
    questionContainer.hidden = true;
    timerDisplay.hidden = true;
    results.hidden = false;
    quizSelection.hidden = false;

    const scoreMessage = correctAnswers === questions.length
        ? "Outstanding!"
        : correctAnswers >= Math.floor(questions.length / 2)
        ? "Good job! You did well!"
        : "Keep trying! Practice makes perfect.";

    console.log("Practicemode " + practiceMode.checked);
    console.log("Failsafe " + failSafe.checked);

    startButton.textContent = 'Play Again';

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
});

 
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
    }
});

