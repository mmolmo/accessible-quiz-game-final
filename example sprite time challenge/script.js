document.addEventListener("DOMContentLoaded", () => {
    //Progress Bar
    const progressBar = document.getElementById("progress-bar");
    const progressBarContainer = document.getElementById("progress-bar-container");
    const progressLabel = document.getElementById("progress-label");
    
    //Menus
    const settingsMenuContainer = document.getElementById("settings-menu-container");
    const quizMenuContainer = document.getElementById("quiz-menu-container");
    const mainNavMenu = document.getElementById("main-navmenu-container");
    
    //Settings options
    const settingsTitle = document.getElementById("settings-title");
    const timerDuration = document.getElementById("timer-duration");
    const practiceMode = document.getElementById("practice-mode");
    const failSafe = document.getElementById("fail-safe");

    //Questions
    const questionContainer = document.getElementById("question-container");
    const timerDisplay = document.getElementById("timer-display");
    const answersList = document.querySelector(".buttons.answers");

    //Post Quiz Rewards
    const resultsMenuContainer = document.getElementById("results-menu-container");
    const rewardsContainer = document.getElementById("rewards-container");

    //Character
    const characterImgContainer = document.getElementById("character-img-container");
    const characterDialogue = document.getElementById("character-dialogue");
    const characterContainer = document.getElementById("character-container");
    
    //Game Navigation Buttons
    const startQuizButton = document.getElementById("start-quiz-btn");
    const returnMainMenuButton = document.getElementById("return-main-menu-btn");
    const returnToSettingsMenuButton = document.getElementById("return-to-settings-menu-btn");

    //Character Expressions and Greetings
    /*const characterExpressions = {
        neutral: "https://via.placeholder.com/150?text=Neutral",
        joyful: "https://via.placeholder.com/150?text=Joyful",
        encouraging: "https://via.placeholder.com/150?text=Encouraging",
    };*/

    const characterExpressions = {
        neutral: "./assets/sprites/smile.png",
        joyful: "./assets/sprites/party.png",
        encouraging: "./assets/sprites/huggingface.png",
    };

    const characterGreetings = [
        {
            intro: ["Welcome! Are you ready to start the quiz?", "array item 2"],
            farewell: ["See you next time!", "Until next time!", "array item 2"]
        }
    ];
    
    //Game Questions
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

    //Rewards
    const rewards = [
        { 
            score: 75, 
            caption: "Gold Reward",
            image: "./assets/sprites/rewards/1st-place-medal.png", 
            alt: "Gold Reward" 
        },
        { 
            score: 60, 
            caption: "Silver Reward",
            image: "./assets/sprites/rewards/2nd-place-medal.png", 
            alt: "Silver Reward" },
        { 
            score: 30, 
            caption: "Bronze Reward",
            image: "./assets/sprites/rewards/3rd-place-medal.png", 
            alt: "Bronze Reward" 
        },
    ];

    //Game Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let duration = 30;
    let timer;
    let timerInterval;
    let correctAnswers = 0;
    let selectedAnswer;

    //Sounds
    const soundfx = {
        correctAnswer: new Audio("./assets/sounds/notification-5-140376.mp3"),
        wrongAnswer: new Audio("./assets/sounds/wrong-answer-129254.mp3"),
        celebration: new Audio("./assets/sounds/celebration-129255.mp3"),
        selectAnswer: new Audio("./assets/sounds/video-game-menu-click-sounds2.mp3")
    };

    const volumeIcons = {
        off: "./assets/icons/volume/volume-off.svg",
        low: "./assets/icons/volume/volume-low.svg",
        mid: "./assets/icons/volume/volume-1.svg",
        high: "./assets/icons/volume/volume-high.svg",
    };
    
    const volumeIcon2 = [
        { 
            volume: .66, 
            image: "./assets/icons/volume/volume-high.svg", 
            alt: "High Volume Icon" 
        },
        { 
            volume: .33, 
            image: "./assets/icons/volume/volume-1.svg", 
            alt: "Medium Volume Icon" 
        },
        { 
            volume: .1, 
            image: "./assets/icons/volume/volume-low.svg", 
            alt: "Low Volume Icon" },
        { 
            volume: 0, 
            image: "./assets/icons/volume/volume-off.svg", 
            alt: "Off Volume Icon" 
        },
    ];


    const music = {
        beep: new Audio("./assets/sounds/podcast-smooth-jazz-fashion-stylish-music-249305.mp3"),
    };

    let soundFXVolumeSlider = document.querySelector("#sound-fx-volume-slider");
    soundFXVolumeSlider.addEventListener("change", function(e) {
        const soundFXVolume = e.currentTarget.value / 100;
        let soundFXVolumeIcon = e.currentTarget.nextElementSibling;
        soundfx.correctAnswer.volume = soundFXVolume;
        soundfx.wrongAnswer.volume = soundFXVolume;
        console.log("Sound fx volume: " + soundfx.correctAnswer.volume);

        // Determine which icon to display based on volume level
        let iconPath = volumeIcons.mid; // Default to "off"
        if (soundFXVolume == 0) {
            iconPath = volumeIcons.off;
        } else if (soundFXVolume > 0 && soundFXVolume <= 0.33) {
            iconPath = volumeIcons.low;
        } else if (soundFXVolume > 0.33 && soundFXVolume <= 0.66) {
            iconPath = volumeIcons.mid;
        } else if (soundFXVolume > 0.66) {
            iconPath = volumeIcons.high;
        }

        // Update the icon dynamically
        soundFXVolumeIcon.innerHTML = `<img src="${iconPath}" alt="Volume icon">`;
    })

    let musicVolumeSlider = document.querySelector("#music-volume-slider");
    musicVolumeSlider.addEventListener("change", function(e) {
        const musicVolume = e.currentTarget.value / 100;
        let musicVolumeIcon = e.currentTarget.nextElementSibling;
        // Set the actual volume of the music
        music.beep.volume = musicVolume;
        console.log("Music fx volume: " + music.beep.volume);

        // Determine which icon to display based on volume level
        let iconPath = volumeIcons.mid; // Default to "off"

        /*
        if (musicVolume == 0) {
            iconPath = volumeIcons.off;
        } else if (musicVolume > 0 && musicVolume <= 0.33) {
            iconPath = volumeIcons.low;
        } else if (musicVolume > 0.33 && musicVolume <= 0.66) {
            iconPath = volumeIcons.mid;
        } else if (musicVolume > 0.66) {
            iconPath = volumeIcons.high;
        }*/

/*
    // Update the icon dynamically
    musicVolumeIcon.innerHTML = `<img src="${iconPath}" alt="Volume icon">`;*/

        // Find the correct icon by checking the volume thresholds
        const volumeIcon = volumeIcon2.find(icon => musicVolume >= icon.volume) || volumeIcon2[volumeIcon2.length - 1];

        // Get the span and set the icon dynamically
        const volumeIconSpan = e.currentTarget.nextElementSibling;
        volumeIconSpan.innerHTML = `<img src="${volumeIcon.image}" alt="${volumeIcon.alt}" />`;
    })
    
    //Functions
    showMainMenu();
    returnToSettingsMenuButton.addEventListener("click", showSettingsMenu);

    function showSettingsMenu() {
        //Hide Character, nav, quiz and results elements
        characterContainer.hidden = true;
        progressBarContainer.hidden = true;

        mainNavMenu.hidden = true;
        startQuizButton.hidden=true;
        returnToSettingsMenuButton.hidden=true;

        quizMenuContainer.hidden = true;
        resultsMenuContainer.hidden = true;

        //Show settings elements
        returnMainMenuButton.hidden=false;

        settingsMenuContainer.hidden = false;

        //console.log(mainNavMenu.hidden);
        //console.log(characterContainer);
        //console.log(settingsTitle);

        settingsTitle.focus();        
    };

    //Shows the Main Menu
    returnMainMenuButton.addEventListener("click", showMainMenu);

    function showMainMenu() {
        console.log(mainNavMenu);
        
        //Hide Character, nav, quiz and results elements
        settingsMenuContainer.hidden = true;
        resultsMenuContainer.hidden = true;
        quizMenuContainer.hidden = true;
        timerDisplay.hidden = true;
        returnMainMenuButton.hidden=true;

        progressBarContainer.hidden = true;
        
        characterContainer.hidden = false;
        mainNavMenu.hidden = false;
        
        startQuizButton.hidden=false;
        returnToSettingsMenuButton.hidden=false;
        
        
        startQuizButton.textContent = '1. Start Challenge';

        let timer = duration;
        timerDisplay.textContent = `Time Left: ${timer} seconds`;
        console.log(characterGreetings[0].intro[0]);
        updateCharacterExpression("neutral");
        updateCharacterDialogue(characterGreetings[0].intro[0]);
    }

    //Starts the quiz and hides certain elements
    startQuizButton.addEventListener("click", initializeQuiz);

    async function initializeQuiz() {
        playSoundLoop(music.beep);

        settingsMenuContainer.hidden = true;
        mainNavMenu.hidden = true;
        resultsMenuContainer.hidden = true;

        progressBarContainer.hidden = false;

        quizMenuContainer.hidden=false;
        characterContainer.hidden = false;
        questionContainer.hidden = false;
        timerDisplay.hidden = false;

        timer = duration;
        timerDisplay.textContent = `Time Left: ${timer} seconds`;
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

    //Updates the character expression dynamically
    function updateCharacterExpression(expressionKey) {
        const expression = characterExpressions[expressionKey];
        characterImgContainer.innerHTML = `
            <img id="character-img" src="${expression}" alt="Quiz Character ${expressionKey.charAt(0).toUpperCase() + expressionKey.slice(1)} Expression"  role="img" aria-describedby="character-dialogue">
        `;
    }

    //Updates the timer to account for custom time the player set to complete the quiz
    timerDuration.addEventListener("change", () => {
        duration = parseInt(timerDuration.value);
        //console.log(duration);
    });

    //Runs the quiz if the questions havent finished answering.
    async function runQuiz() {
        try {
            while (currentQuestionIndex < questions.length) {
                const questionResult = await handleQuestionCycle();
                
                // Break the loop if game is ended by time or all questions answered
                if (questionResult === 'gameEnded' || questionResult === 'timeUp') {
                    break;
                }
            }
            
            // If all questions are answered normally
            if (currentQuestionIndex >= questions.length) {
                console.log("All questions answered. Moving to results.");
                endQuiz();
            }
        } catch (error) {
            console.error("Quiz error:", error);
            endQuiz();
        }
    }

    
    
    function handleAnswer(selectedAnswer) {
        const questionData = questions[currentQuestionIndex];
       
        if (selectedAnswer === questionData.correct) {
            score += timer;
            correctAnswers++;
            playSound(soundfx.correctAnswer);
            updateCharacterDialogue(questionData.characterDialogue.correct);
            updateCharacterExpression("joyful");
        } else {
            playSound(soundfx.wrongAnswer);
            updateCharacterDialogue(questionData.characterDialogue.wrong);
            updateCharacterExpression("encouraging");
        }
        
        // Add a delay to allow the player to see the character's reaction
        return new Promise((resolve) => {
            setTimeout(() => {
                currentQuestionIndex++;
                
                // Check if game should end
                if (currentQuestionIndex >= questions.length) {
                    console.log("Current Question: " + currentQuestionIndex);
                    console.log("All questions answered. Moving to results.");
                    endQuiz();
                    resolve('gameEnded');
                } else {
                    // Continue with the next question
                    resolve('answered');
                }
            }, 1000); // 1-second delay
        });
    }
    
    // Modify handleQuestionCycle to handle the Promise return
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
                    clearInterval(timerIntervalId); // Stop the interval first
                    console.log("time's up. Moving to results.");
                    resolve('timeUp'); // Resolve before ending quiz
                    endQuiz(); // Call endQuiz after resolving
                    return;
                }
            }, 1000);
    
            // Override handleAnswer to work with Promise
            const originalHandleAnswer = handleAnswer;
            handleAnswer = async (selectedAnswer) => {
                clearInterval(timerIntervalId);
                const result = await originalHandleAnswer(selectedAnswer);
                
                // If game is ended by handleAnswer
                if (result === 'gameEnded') {
                    resolve('gameEnded');
                } else {
                    resolve('answered');
                }
            };
        });
    }
    
    // displays the intro and question dialogue, and any answers in the list
    function showQuestion() {
        const questionData = questions[currentQuestionIndex];
        
        // Display character intro for the question and updates the progress bar
        updateCharacterDialogue(questionData.characterDialogue.intro);
        updateCharacterExpression("neutral");
        updateProgressBar();
    
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

//Update Progress Bar
function updateProgressBar() {
    const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
    // Update progress bar value and text
    progressBar.value = progressPercentage;
    progressLabel.textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;
}

//Checks and displays the results on finishing quiz
function endQuiz() {
    
    questionContainer.hidden = true;
    timerDisplay.hidden = true;

    resultsMenuContainer.hidden = false;
    mainNavMenu.hidden = false;

    quizMenuContainer.hidden = true;
    progressBarContainer.hidden = true;

    stopSound(music.beep);

    const scoreMessage = correctAnswers === questions.length
        ? "Outstanding!"
        : correctAnswers >= Math.floor(questions.length / 2)
        ? "Good job! You did well!"
        : "Keep trying! Practice makes perfect.";

    //console.log("Practicemode " + practiceMode.checked);
    //console.log("Failsafe " + failSafe.checked);

    startQuizButton.textContent = '1. Play Again';

    if (practiceMode.checked) {
        score = 90;
        updateCharacterDialogue(
            `Challenge Completed in Practice Mode! No penalties. \n You got ${correctAnswers} out of ${questions.length} correct and your score is ${score}. ${scoreMessage}`
        );
        const reward = rewards.find(r => score >= r.score) || { image: "https://via.placeholder.com/100?text=No+Reward", caption: "No Reward", alt: "No Reward", role: "img"};
        rewardsContainer.innerHTML = `
            <img src="${reward.image}" alt="${reward.alt}" role="img", aria-describedby="rewards-description">
            <figcaption id="rewards-description">   
                ${reward.caption}
            </figcaption>
        `;
    } else if (failSafe.checked) {
        if (correctAnswers <= 1) {
            score = 30
        } else {
            score = score;
        }
        updateCharacterDialogue(
           `Challenge Completed in Failsafe Mode - Progress Unaffected. \n You got ${correctAnswers} out of ${questions.length} correct and your score is ${score}. ${scoreMessage}`
        );
        const reward = rewards.find(r => score >= r.score) || { image: "https://via.placeholder.com/100?text=No+Reward", caption: "No Reward", alt: "No Reward", role: "img"};
        rewardsContainer.innerHTML = `
            <img src="${reward.image}" alt="${reward.alt}" role="img", aria-describedby="rewards-description" >
            <figcaption id="rewards-description">   
                ${reward.caption}
            </figcaption>
        `;
    } else {
        updateCharacterDialogue(
            `Challenge Completed.
            You got ${correctAnswers} out of ${questions.length} correct and your score is ${score}. ${scoreMessage}`
        );
        const reward = rewards.find(r => score >= r.score) || { image: "https://via.placeholder.com/100?text=No+Reward", caption: "No Reward", alt: "No Reward", role: "img"};
        rewardsContainer.innerHTML = `
            <img src="${reward.image}" alt="${reward.alt}" role="img", aria-describedby="rewards-description"> 
            <figcaption id="rewards-description">
                ${reward.caption}
            </figcaption>`;
    }

}

//Update Character Dialogue
function updateCharacterDialogue(dialogue) {
    characterDialogue.textContent = dialogue;
}

//Manages sounds
function playSound(sound) {
    //let fx = new Audio(sound);
	sound.play();
}

function playSoundLoop(sound) {
    //let fx = new Audio(sound);
	sound.loop = true; 
    sound.play();
}
function stopSound(sound) {
    //let fx = new Audio(sound);
    sound.pause();
    sound.currentTime = 0;
}
function changeSoundFXVolume(){

}

// Get all focusable elements excluding those in hidden containers
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

// Keydown for selection of elements with number keys(focus only)
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
