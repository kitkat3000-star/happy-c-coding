// Short C Quiz
function checkQuizAnswers() {
    let score = 0;
    const totalQuestions = 5;

    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');

    if (q1 && q1.value === 'a') score++;
    if (q2 && q2.value === 'a') score++;
    if (q3 && q3.value === 'c') score++;
    if (q4 && q4.value === 'a') score++;
    if (q5 && q5.value === 'a') score++;


    const result = document.getElementById('quizResult');
    result.innerHTML = `You scored ${score} out of ${totalQuestions}!`;

    if (score === totalQuestions) {
        result.innerHTML += "<br>Great job! You nailed it! 🐐🏁";
    } else {
        result.innerHTML += "<br><br>Keep practicing! You'll get there! 💪";
    }
}