const questions = [
    {
        question: "Apa peran CSS dalam pengembangan web?",
        answers: [
            { text: "Menyusun konten web", correct: false },
            { text: "Mengatur gaya dan tata letak halaman web", correct: true },
            { text: "Memprogram logika di sisi server", correct: false },
            { text: "Menghubungkan basis data ke aplikasi web", correct: false },
        ]
    },
    {
        question: "Framework CSS yang populer untuk desain responsif adalah",
        answers: [
            { text: "Laravel", correct: false },
            { text: "Django", correct: false },
            { text: "Bootstrap", correct: true },
            { text: "Angular", correct: false },
        ]
    },
    {
        question: "Apa yang dimaksud dengan 'attribute' dalam HTML?",
        answers: [
            { text: "Metode untuk menyusun elemen", correct: false },
            { text: "Properti tambahan pada elemen HTML yang memberikan informasi tambahan", correct: true },
            { text: "Gaya yang diterapkan pada elemen HTML", correct: false },
            { text: "Fungsi yang digunakan dalam JavaScript", correct: false },
        ]
    },
    {
        question: "Untuk apa tag '<meta>' dalam HTML digunakan?",
        answers: [
            { text: "Menambahkan konten ke halaman web", correct: false },
            { text: "Menampilkan gambar", correct: false },
            { text: "Menyimpan informasi meta tentang dokumen HTML", correct: true },
            { text: "Menghubungkan halaman ke database", correct: false },
        ]
    },
    {
        question: "Apa kegunaan dari 'document.getElementById()' dalam JavaScript?",
        answers: [
            { text: "Mengubah gaya elemen HTML", correct: false },
            { text: "Mengakses elemen HTML berdasarkan id-nya", correct: true },
            { text: "Menambahkan elemen baru ke dokumen HTML", correct: false },
            { text: "Menghapus elemen HTML", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
 