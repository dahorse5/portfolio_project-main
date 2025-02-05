let difficulty = 'easy';
let operator = 'random'; // Default is random
let score = 0;
let currentQuestion = 0;
let maxQuestions = 10;
let currentAnswer = 0;
let answers = [];

document.getElementById('answerInput').addEventListener('keypress', function (event) {
    if (event.key < '0' || event.key > '9') {
        event.preventDefault();
    }
});

function startGame() {
    difficulty = document.getElementById('difficultySelection').value;
    operator = document.getElementById('operatorChange').value; // Get operator or "random"

    score = 0;
    currentQuestion = 0;
    answers = [];

    // Hide start menu and show game UI
    document.getElementById('difficultySelection').style.display = 'none';
    document.getElementById('operatorChange').style.display = 'none';
    document.getElementById('gameStart').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('feedback').textContent = '';
    nextQuestion();
}

function getRandomOperator() {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
}

function generateQuestion() {
    let num1, num2;

    // Set number ranges based on difficulty
    if (difficulty === 'easy') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    } else if (difficulty === 'medium') {
        num1 = Math.floor(Math.random() * 91) + 10;
        num2 = Math.floor(Math.random() * 91) + 10;
    } else if (difficulty === 'hard') {
        num1 = Math.floor(Math.random() * 901) + 100;
        num2 = Math.floor(Math.random() * 901) + 100;
    }

    // Determine operator
    let chosenOperator = operator === 'random' ? getRandomOperator() : operator;

    // Calculate the correct answer based on the operator
    switch (chosenOperator) {
        case '+':
            currentAnswer = num1 + num2;
            break;
        case '-':
            currentAnswer = num1 - num2;
            break;
        case '*':
            currentAnswer = num1 * num2;
            break;
        case '/':
            currentAnswer = parseFloat((num1 / num2).toFixed(2)); // Round to 2 decimal places
            break;
    }

    return `${num1} ${chosenOperator} ${num2}`;
}

function nextQuestion() {
    if (currentQuestion < maxQuestions) {
        const question = generateQuestion();
        document.getElementById('question').textContent = question;
        document.getElementById('answerInput').value = '';
        document.getElementById('progress').textContent = `Question ${currentQuestion + 1} of ${maxQuestions}`;
        currentQuestion++;
    } else {
        endGame();
    }
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answerInput').value);
    const isCorrect = userAnswer === currentAnswer;

    if (isCorrect) {
        score++;
        document.getElementById('feedback').textContent = 'Correct! ✅';
        document.getElementById('feedback').style.color = '#28a745';
    } else {
        document.getElementById('feedback').textContent = `Incorrect ❌ (Correct Answer: ${currentAnswer})`;
        document.getElementById('feedback').style.color = '#dc3545';
    }

    answers.push({ question: document.getElementById('question').textContent, userAnswer, isCorrect });
    nextQuestion();
}

function changeOperator() {
    const newOperator = document.getElementById('operatorChange').value;
    operator = newOperator === 'random' ? getRandomOperator() : newOperator;

    document.getElementById('feedback').textContent = `Operator changed to: ${
        operator === 'random' ? 'Random' : operator
    }`;
    document.getElementById('feedback').style.color = '#17a2b8'; // Informational color
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = `You scored ${score} out of ${maxQuestions} on ${difficulty} difficulty using ${
        operator === 'random' ? 'Random Operators' : `"${operator}" Operator`
    }.`;

    const answerList = document.getElementById('answerList');
    answerList.innerHTML = '';

    answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = `Q${index + 1}: ${answer.question} | Your Answer: ${answer.userAnswer} | ${
            answer.isCorrect ? '✅ Correct' : '❌ Incorrect'
        }`;
        li.className = answer.isCorrect ? 'correct' : 'incorrect';
        answerList.appendChild(li);
    });
}

function restartGame() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('difficultySelection').style.display = 'inline-block';
    document.getElementById('operatorChange').style.display = 'inline-block';
    document.getElementById('gameStart').style.display = 'inline-block';
}

function saveResultsToLocalStorage() {
    const results = {
        score: score,
        maxQuestions: maxQuestions,
        difficulty: difficulty,
        operator: operator,
        answers: answers
    };
    localStorage.setItem('mathGameResults', JSON.stringify(results));
}

function loadResultsFromLocalStorage() {
    const savedResults = localStorage.getItem('mathGameResults');
    if (savedResults) {
        const results = JSON.parse(savedResults);
        score = results.score;
        maxQuestions = results.maxQuestions;
        difficulty = results.difficulty;
        operator = results.operator;
        answers = results.answers;
    }
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = `You scored ${score} out of ${maxQuestions} on ${difficulty} difficulty using ${
        operator === 'random' ? 'Random Operators' : `"${operator}" Operator`
    }.`;

    const answerList = document.getElementById('answerList');
    answerList.innerHTML = '';

    answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = `Q${index + 1}: ${answer.question} | Your Answer: ${answer.userAnswer} | ${
            answer.isCorrect ? '✅ Correct' : '❌ Incorrect'
        }`;
        li.className = answer.isCorrect ? 'correct' : 'incorrect';
        answerList.appendChild(li);
    });

    saveResultsToLocalStorage();
}

loadResultsFromLocalStorage();

