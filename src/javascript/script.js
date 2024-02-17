import questions from './questions.js';

const questionElement = document.getElementById('question');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const btnSound = document.getElementById('btn-sound');
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    noButton.classList.add('hide');
    const backgroundMusic = document.getElementById('backgroundAudio');
    const fxAudio = document.getElementById('fx');

    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            fxAudio.play();
        }
    });
});

const typeWriter = (text, element, index) => {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(text, element, index), 50);
    } else {
        yesButton.disabled = false;
        noButton.disabled = false;
    }
};

const showQuestion = () => {
    yesButton.disabled = true;
    noButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = '';
    typeWriter(currentQuestion.question, questionElement, 0);
    noButton.classList.remove('hide');
};

showQuestion();

const handleYesButtonClick = () => {
    questions[currentQuestionIndex].trueCount++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
    // Reproduzir o som do botão
    btnSound.play();
};

const handleNoButtonClick = () => {
    questions[currentQuestionIndex].falseCount++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
    // Reproduzir o som do botão
    btnSound.play();
};

const calculateResult = () => {
    let trueCount = 0;
    let falseCount = 0;
    for (const question of questions) {
        trueCount += question.trueCount;
        falseCount += question.falseCount;
    }

    if (trueCount < falseCount) {
        questionElement.innerText = 'Você apresenta um grau leve de dissonância com a realidade. O experimento de Volkov está em busca de pacientes com grais mais elevados de inadequação social. Agradecemos o tempo que você investiu no teste';
        noButton.classList.add('hide');
        yesButton.classList.add('hide');
    } else {
        questionElement.innerText = 'Você apresenta um caso severo de dissonancia com a realidade. Para o experimento Volkov, buscamos casos extremos, como o seu. Seja Bem-vindo ao experimento';
        noButton.classList.add('hide');
        yesButton.classList.add('hide');
    }
};

yesButton.addEventListener('click', handleYesButtonClick);
noButton.addEventListener('click', handleNoButtonClick);
