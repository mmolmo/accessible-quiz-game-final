document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const answersList = document.getElementById("answers");
    const feedback = document.getElementById("feedback");
    const timerDisplay = document.getElementById("time");
    const results = document.getElementById("results");
    const scoreDisplay = document.getElementById("score");
    const encouragementDisplay = document.getElementById("encouragement");
    const restartButton = document.getElementById("restart-btn");

    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Paris", "Berlin", "Madrid", "Rome"],
            correct: 0,
        },
        {
            question: "What is 5 + 3?",
            answers: ["5", "7", "8", "9"],
            correct: 2,
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Venus", "Mars", "Jupiter"],
            correct: 2,
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer = 30;
    let timerInterval;
    let correctAnswers = 0;

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        timer = 30;
        results.hidden = true;
        startButton.hidden = true;
        questionContainer.hidden = false;
        feedback.textContent = "";
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        showQuestion();
    }

    function updateTimer() {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }

    function showQuestion() {
        const questionData = questions[currentQuestionIndex];
        document.getElementById("question").textContent = questionData.question;
        answersList.innerHTML = "";

        questionData.answers.forEach((answer, index) => {
            const li = document.createElement("li");
            li.textContent = answer;
            li.tabIndex = 0;
            li.addEventListener("click", () => handleAnswer(index));
            li.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleAnswer(index);
                }
            });
            answersList.appendChild(li);
        });
    }

    function handleAnswer(selectedIndex) {
        const questionData = questions[currentQuestionIndex];
        if (selectedIndex === questionData.correct) {
            feedback.textContent = "Correct!";
            score += timer; // Bonus for answering quickly
            correctAnswers++;
        } else {
            feedback.textContent = "Incorrect.";
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(showQuestion, 1000);
        } else {
            setTimeout(endGame, 1000);
        }
    }

    function endGame() {
        clearInterval(timerInterval);
        questionContainer.hidden = true;
        results.hidden = false;

        scoreDisplay.textContent = `Your score: ${score}`;
        const encouragement = correctAnswers === 0
            ? "Keep trying! You'll get better!"
            : `You got ${correctAnswers} out of ${questions.length} correct. Great job!`;
        encouragementDisplay.textContent = encouragement;
    }
});
