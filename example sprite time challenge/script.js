document.addEventListener("DOMContentLoaded", () => {
    //Progress Bar
    const progressBar = document.getElementById("progress-bar");
    const progressBarContainer = document.getElementById("progress-bar-container");
    const progressLabel = document.getElementById("progress-label");
    
    //Menus
    const settingsMenuContainer = document.getElementById("settings-menu-container");
    const quizMenuContainer = document.getElementById("quiz-menu-container");
    const mainNavMenu = document.getElementById("main-navmenu-container");
    const tutorialMenu = document.getElementById("tutorial-menu-container");
    
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
    const mainMenuTimerDisplay = document.getElementById("mainmenu-timer-display");
    
    //Game Navigation Buttons
    const startQuizButton = document.getElementById("start-quiz-btn");
    const returnMainMenuButton = document.getElementById("return-main-menu-btn");
    const returnToSettingsMenuButton = document.getElementById("return-to-settings-menu-btn");
    const returnMainMenuButtonExternal = document.getElementById("return-main-menu-btn-external");
    const tutorialMenuButton = document.getElementById("tutorial-menu-btn");

    //Character Expressions and Greetings

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
    

    // Game Questions with icons added
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", icon: "./assets/icons/answer-choices/diamonds-2.svg" },
            { text: "Berlin", icon: "./assets/icons/answer-choices/heart.svg" },
            { text: "Madrid", icon: "./assets/icons/answer-choices/moon-half-right-5.svg" },
            { text: "Rome", icon: "./assets/icons/answer-choices/star-fat.svg" }
        ],
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
        answers: [
            { text: "5", icon: "./assets/icons/answer-choices/diamonds-2.svg" },
            { text: "7", icon: "./assets/icons/answer-choices/heart.svg" },
            { text: "8", icon: "./assets/icons/answer-choices/moon-half-right-5.svg" },
            { text: "9", icon: "./assets/icons/answer-choices/star-fat.svg" }
        ],
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
        answers: [
            { text: "Earth", icon: "./assets/icons/answer-choices/diamonds-2.svg" },
            { text: "Venus", icon: "./assets/icons/answer-choices/heart.svg" },
            { text: "Mars", icon: "./assets/icons/answer-choices/moon-half-right-5.svg" },
            { text: "Jupiter", icon: "./assets/icons/answer-choices/star-fat.svg" }
        ],
        correct: 2,
        characterDialogue: {
            intro: "Last question! Let's see how you do.",
            question: "Which planet is known as the Red Planet?",
            correct: "Well done! Mars is the right answer.",
            wrong: "Close, but no. Hint: The answer starts with 'M'. Don't give up!"
        }
    }
];


    const totalQuestions = questions.length;

    //Rewards
    const rewards = [
        { 
            score: 90, 
            caption: "Gold Reward",
            image: "./assets/sprites/rewards/1st-place-medal.png", 
            alt: "Gold Reward" 
        },
        { 
            score: 70, 
            caption: "Silver Reward",
            image: "./assets/sprites/rewards/2nd-place-medal.png", 
            alt: "Silver Reward" },
        { 
            score: 25, 
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
        wrongAnswer: new Audio("./assets/sounds/wronganswer-37702.mp3"),
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

    
document.querySelectorAll('input[type="range"]').forEach(slider => {
  const updateGradient = () => {
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${val}%, var(--bg-secondary-color) ${val}%, var(--bg-secondary-color) 100%)`;
    };
    slider.addEventListener('input', updateGradient);
    updateGradient();
});



    let soundFXVolumeSlider = document.querySelector("#sound-fx-volume-slider");
    const valueDisplay = document.getElementById('sound-fx-volume-value');
    const musicvalueDisplay = document.getElementById('music-volume-value');
    let musicVolumeSlider = document.querySelector("#music-volume-slider");

    // Attach listener
    soundFXVolumeSlider.addEventListener("change", (e) => handleVolumeChange(e, e.currentTarget));
    musicVolumeSlider.addEventListener("change", (e) => handleMusicVolumeChange(e, e.currentTarget));
    

    function handleMusicVolumeChange(e, sliderElement) {
        const musicVolume = e.currentTarget.value / 100;
        let musicVolumesetting = sliderElement.parentElement.nextElementSibling;
        let musicVolumeIcon = musicVolumesetting.firstElementChild;
        // Set the actual volume of the music
        music.beep.volume = musicVolume;
        console.log("Music fx volume: " + music.beep.volume);

        // Determine which icon to display based on volume level
        let iconPath = volumeIcons.mid; // Default to "off"

        // Find the correct icon by checking the volume thresholds
        const volumeIcon = volumeIcon2.find(icon => musicVolume >= icon.volume) || volumeIcon2[volumeIcon2.length - 1];

        // Get the span and set the icon dynamically
        musicVolumeIcon.innerHTML = `<img src="${volumeIcon.image}" alt="${volumeIcon.alt}" />`;

        const val = musicVolumeSlider.value;
        musicvalueDisplay.textContent = `${val}%`;

        musicvalueDisplay.classList.add('active');   
    }

    function handleVolumeChange(e, sliderElement) {
        const soundFXVolume = sliderElement.value / 100;
        let soundFXVolumesetting = sliderElement.parentElement.nextElementSibling;
        let soundFXVolumeIcon = soundFXVolumesetting.firstElementChild;

        soundfx.correctAnswer.volume = soundFXVolume;
        soundfx.wrongAnswer.volume = soundFXVolume;

        let iconPath = volumeIcons.mid;
        // Find the correct icon by checking the volume thresholds
        const volumeIcon = volumeIcon2.find(icon => soundFXVolume >= icon.volume) || volumeIcon2[volumeIcon2.length - 1];

        soundFXVolumeIcon.innerHTML = `<img src="${volumeIcon.image}" alt="${volumeIcon.alt}">`;

        const val = sliderElement.value;
        valueDisplay.textContent = `${val}%`;
        valueDisplay.classList.add('active');
    }

    //Functions
    showMainMenu();
    returnToSettingsMenuButton.addEventListener("click", showSettingsMenu);

    function showSettingsMenu() {
        //Hide Character, nav, quiz and results elements
        characterContainer.hidden = true;
        progressBarContainer.hidden = true;
        tutorialMenu.hidden = true;

        mainNavMenu.hidden = true;
        startQuizButton.hidden=true;
        returnToSettingsMenuButton.hidden=true;
        mainMenuTimerDisplay.hidden = true;

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

    tutorialMenuButton.addEventListener("click", showTutorialMenu);

    function showTutorialMenu() {
        //Hide Character, nav, quiz and results elements
        characterContainer.hidden = true;
        progressBarContainer.hidden = true;
        settingsMenuContainer.hidden = true;

        // mainNavMenu.hidden = true;
        startQuizButton.hidden=true;
        tutorialMenuButton.hidden=true;
        mainMenuTimerDisplay.hidden = true;

        quizMenuContainer.hidden = true;
        resultsMenuContainer.hidden = true;

        //Show tutorial elements
        returnMainMenuButtonExternal.hidden=false;
        returnToSettingsMenuButton.hidden=false;

        tutorialMenu.hidden = false;

        //console.log(mainNavMenu.hidden);
        //console.log(characterContainer);
        //console.log(settingsTitle);

        // settingsTitle.focus();        
    };


    //Shows the Main Menu
    returnMainMenuButton.addEventListener("click", showMainMenu);
    returnMainMenuButtonExternal.addEventListener("click", showMainMenu);

    function showMainMenu() {
        console.log(mainNavMenu);
        
        //Hide Character, nav, quiz and results elements
        settingsMenuContainer.hidden = true;
        resultsMenuContainer.hidden = true;
        quizMenuContainer.hidden = true;
        timerDisplay.hidden = true;
        returnMainMenuButtonExternal.hidden=true;
        tutorialMenu.hidden = true;

        progressBarContainer.hidden = true;
        
        characterContainer.hidden = false;
        mainNavMenu.hidden = false;
        
        mainMenuTimerDisplay.hidden = false;
        // indicate how much time the suer set on the main page
        mainMenuTimerDisplay.firstElementChild.firstElementChild.textContent = duration;

        startQuizButton.hidden=false;
        returnToSettingsMenuButton.hidden=false;
        tutorialMenuButton.hidden=false;
        
        startQuizButton.innerHTML = '1. Start Challenge <i class="fa-solid fa-play"></i>';

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
        mainMenuTimerDisplay.hidden = true;

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
                console.log("Question Result: " + questionResult);
                if (questionResult === 'gameEnded' || questionResult === 'timeUp') {
                    endQuiz();
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
            // score += timer;
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
                    // console.log("All questions answered. Moving to results.");
                    // endQuiz();
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
            //
            // Show current question
            showQuestion();
            
            // Start timer interval
            const timerIntervalId = setInterval(() => {
                timer--;
                timerDisplay.textContent = `Time Left: ${timer} seconds`;
                
                // Check if time is up
                if (timer <= 0) {
                    clearInterval(timerIntervalId); // Stop the interval first
                    // console.log("time's up. Moving to results.");
                    resolve('timeUp'); // Resolve before ending quiz
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
    
        // Display character intro and update progress
        updateCharacterDialogue(questionData.characterDialogue.intro);
        updateCharacterExpression("neutral");
        updateProgressBar();
    
        // Show question after a delay
        setTimeout(() => {
            updateCharacterDialogue(questionData.characterDialogue.question);
    
            // Clear and prepare answers
            answersList.innerHTML = "";
            questionData.answers.forEach((answer, index) => {
                const answerButton = document.createElement("button");
                answerButton.classList.add("btn");
    
                // Use innerHTML for both text and image
                answerButton.innerHTML = `
                    <span class="btn-text">${answer.text}</span>
                    <img src="${answer.icon}" alt="Icon for ${answer.text}" class="icon shape-btn" />
                `;
                answerButton.setAttribute("role", "button");
                answerButton.setAttribute("aria-label", `Answer Choice: ${answer.text}`);
                answerButton.tabIndex = 0;
    
                // Event listeners for click and keyboard interaction
                answerButton.addEventListener("click", () => handleAnswer(index));
                answerButton.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        answerButton.click();
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

    startQuizButton.innerHTML = '1. Play Again <i class="fa-solid fa-play"></i>';

    
    speedRatio = timer / duration
    correctPoints = correctAnswers * 25
    finalScore = Math.round((correctPoints + (speedRatio * 25)));

    console.log("time left:", timer);
    console.log("speed ratio", speedRatio);
    console.log("correct points:", correctPoints);
    console.log("final score:", finalScore);

    let score = finalScore;

    if (practiceMode.checked) {
        finalScore = 0;

        updateCharacterDialogue(
            `Practice Complete! 
            You got ${correctAnswers} out of ${questions.length} correct with a final score of <strong>${finalScore}</strong>. 
            Keep it up—no pressure here!`
        );
        const rewardLevel = "none";
        displayReward(rewardLevel);

    } else if (failSafe.checked) {

        // Always guarantee at least 25 points in failsafe mode
        let safeScore = Math.max(finalScore, 25);
        finalScore = safeScore;

        updateCharacterDialogue(
           `Challenge Completed!
           You got ${correctAnswers} out of ${questions.length} correct with a final score of <strong>${finalScore}</strong> — and a guaranteed reward! ${scoreMessage} `
        );

        console.log("Final score with failsafe:", finalScore);

        console.log("Evaluating reward for score:", finalScore, "and correct answers:", correctAnswers);
        
        let rewardLevel = "";

        if (correctAnswers >= 0 && correctAnswers < 2) { 
            let failSafeReward = "bronze";
            rewardLevel = failSafeReward;
            // console.log("Failsafe reward level:", failSafeReward);
        } else {
            let failSafeReward = evaluateReward(correctAnswers, finalScore);
            rewardLevel = failSafeReward;
            // console.log("Failsafe reward level:", failSafeReward);
        }

        displayReward(rewardLevel);

    } else {

        // Display
        updateCharacterDialogue(
            `Challenge Completed!
            You got ${correctAnswers} out of ${questions.length} correct with a final score of <strong>${finalScore}</strong>. ${scoreMessage}`
        );

        console.log("Evaluating reward for score:", finalScore, "and correct answers:", correctAnswers);
        const rewardLevel = evaluateReward(correctAnswers, finalScore);
        displayReward(rewardLevel);
    }

}

//Update Character Dialogue
function updateCharacterDialogue(dialogue) {
    characterDialogue.textContent = dialogue;
}

function evaluateReward(correctAnswers, finalScore) {
    // 3/3 correct
    if (correctAnswers === 3) {
        if (finalScore >= 90) return "gold";
        if (finalScore >= 75) return "silver";
        // Always at least bronze
        return "bronze";
    }

    // 2/3 correct
    if (correctAnswers === 2) {
        if (finalScore >= 70) return "silver";
        if (finalScore >= 50) return "bronze";
        return "none";
    }

    // 1/3 correct
    if (correctAnswers === 1) {
        if (finalScore >= 30) return "bronze";
        return "none";
    }

    // 0/3 correct
    return "none";
}

function displayReward(rewardLevel) {
    // Determine reward

    // Map reward strings to existing reward objects
    let reward;
    switch (rewardLevel) {
        case "gold":
            reward = rewards.find(r => r.caption.includes("Gold"));
            break;
        case "silver":
            reward = rewards.find(r => r.caption.includes("Silver"));
            break;
        case "bronze":
            reward = rewards.find(r => r.caption.includes("Bronze"));
            break;
        default:
            reward = { 
                image: "./assets/sprites/rewards/rejected.png",
                caption: "No Reward",
                alt: "No Reward"
            };
    }
    
    rewardsContainer.innerHTML = `
        <img src="${reward.image}" alt="${reward.alt}" role="img" aria-describedby="rewards-description">
        <figcaption id="rewards-description">${reward.caption}</figcaption>
    `;
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
