// Learnt from watching 
document.addEventListener("DOMContentLoaded", () => {
    let quizData = [
        {
            question: "Which of the following is the correct syntax for a main function in C?",
            options: ["int main(){}", "void main(){}", "main(){}"],
            correct: "int main(){}"
        },
        {
            question: "How do you define a variable in C that holds an integer?",
            options: ["int num;", "float num;", "char num;"],
            correct: "int num;"
        },
        {
            question: "Which statement is used to print output to the console in C?",
            options: ["print(\"Hello World\");", "cout &lt;&lt; \"Hello World\";", "printf(\"Hello World\");"],
            correct: "printf(\"Hello World\");"
        },
        {
            question: "What is the correct way to declare a pointer to an integer in C?",
            options: ["int* ptr;", "int ptr*;", "ptr int*;"],
            correct: "int* ptr;"
        },
        {
            question: "Which of these is a valid way to create a string in C?",
            options: ["char str[] = \"Hello\";", "string str = \"Hello\";", "char str(5) = \"Hello\";"],
            correct: "char str[] = \"Hello\";"
        },
        {
            question: "Which data type is used to store a single character in C?",
            options: ["char", "string", "character"],
            correct: "char"
        },
        {
            question: "Which operator is used for memory allocation in C?",
            options: ["malloc()", "new", "allocate()"],
            correct: "malloc()"
        },
        {
            question: "Which header file must be included to use the printf() function?",
            options: ["stdlib.h", "stdio.h", "string.h"],
            correct: "stdio.h"
        },
        {
            question: "How do you correctly write a for loop in C?",
            options: ["for i in range(5):", "for i = 0 to 5", "for(int i = 0; i < 5; i++) {}"],
            correct: "for(int i = 0; i < 5; i++) {}"
        },
    ];

    const quizContainer = document.querySelector(".quiz-container");
    const question = document.querySelector(".question");
    const options = document.querySelector(".options");
    const nextQuestion = document.querySelector(".quiz-container .btn");
    const result = document.querySelector(".result");
    const startQuiz = document.querySelector(".start-quiz");
    const startBtn = document.querySelector(".start-quiz .btn");
    const startGameImg = document.querySelector(".image-container .start-img");
    const endGameImg = document.querySelector(".image-container .end-img");
    const intro = document.querySelector(".intro");

    let questionNumber = 0;
    const MAX_QUESTIONS = 9;
    let score = 0;
    let timerInterval;

    const shuffleArray = (array) => {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    quizData = shuffleArray(quizData);

    const checkAnswer = (e) => {
        let answer = e.target.textContent;
        if(answer === quizData[questionNumber].correct){
            score++;
            e.target.classList.add("right-answer");
        } else {
            e.target.classList.add("wrong-answer");
        }

        let selectAllOptions = document.querySelectorAll(".option");
        selectAllOptions.forEach((o) => {
            o.classList.add("disabled");
        });
    };

    const showQuestion = () => {
        endGameImg.style.display = "none";
        clearInterval(timerInterval);

        let secondsLeft = 9;
        const timer = document.querySelector(".timer");
        timer.classList.remove("danger");

        timer.textContent = `Time Left: 10 seconds`;

        timerInterval = setInterval(() => {
            timer.textContent = `Time Left: ${secondsLeft
            .toString()
            .padStart(2,"0")} seconds`;
            secondsLeft--;

            if(secondsLeft < 3){
                timer.classList.add("danger");
            }

            if(secondsLeft < 0) {
                clearInterval(timerInterval);
                displayNextQuestion();
            }
        }, 1000);

        options.innerHTML = "";
        question.innerHTML = `<span class="question-number">${questionNumber + 1}/${MAX_QUESTIONS}</span> 
                            ${quizData[questionNumber].question}`;

        const shuffledOptions = shuffleArray(quizData[questionNumber].options);
        
        shuffledOptions.forEach(o => {
            const option = document.createElement("button");
            option.classList.add("option");
            option.innerHTML = o;
            option.addEventListener("click", (e) => {
                checkAnswer(e);
            });
            options.appendChild(option);
        });


    };

    const retakeQuiz = () => {
        questionNumber = 0;
        score = 0;
        quizData = shuffleArray(quizData);

        showQuestion();
        result.style.display = "none";
        quizContainer.style.display = "block";
        intro.style.display = "block";
    };

    const displayResult = () => {
        result.style.display = "block";
        quizContainer.style.display = "none";
        intro.style.display = "none";
        result.innerHTML = "";

        const finalScore = document.createElement("h2");

        if(score === MAX_QUESTIONS){
            finalScore.innerHTML = `Genius! You have scored ${score} out of ${MAX_QUESTIONS}.`;
        } else {
            finalScore.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}. Keep Going!`;
        }
        result.appendChild(finalScore);

        const retakeBtn = document.createElement("button");
        retakeBtn.classList.add("btn");
        retakeBtn.innerHTML = "Retake Quiz?"
        retakeBtn.addEventListener("click", retakeQuiz);
        result.appendChild(retakeBtn);

        endGameImg.style.display = "block";
    };

    const displayNextQuestion = () => {
        if (questionNumber >= MAX_QUESTIONS - 1){
            displayResult();
            return;
        }

        questionNumber++;
        showQuestion();
    };

    nextQuestion.addEventListener("click", displayNextQuestion);

    startBtn.addEventListener("click", () => {
        startQuiz.style.display = "none";
        startGameImg.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion();
    })
});