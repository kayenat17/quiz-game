// Quiz questions data
const questions = [
    {
        question: "Who wrote the play Romeo and Juliet?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "J.K Rowling"],
        correct: 0,
        explanation: "Romeo and Juliet, play by William Shakespeare, written about 1594–96."
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correct: 2,
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than twice that of Saturn."
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2,
        explanation: "JavaScript is often called the 'language of the web' because it's the primary language used for web development and runs in all modern browsers."
    },
    {
        question: "What year did the first iPhone launch?",
        options: ["2005", "2006", "2007", "2008"],
        correct: 2,
        explanation: "The first iPhone was announced by Steve Jobs on January 9, 2007, and released on June 29, 2007."
    },
    {
        question: "Which country has the most Olympic gold medals in history?",
        options: ["Soviet Union", "United States", "China", "Germany"],
        correct: 1,
        explanation: "The United States has won the most Olympic gold medals in history, with over 1,000 gold medals across all Olympic Games."
    },
    {
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "O2", "N2"],
        correct: 0,
        explanation: "Water is composed of two hydrogen atoms and one oxygen atom, giving it the chemical formula H2O."
    },
    {
        question: "Which social media platform was founded by Mark Zuckerberg?",
        options: ["Twitter", "Instagram", "Facebook", "LinkedIn"],
        correct: 2,
        explanation: "Facebook was founded by Mark Zuckerberg in 2004 while he was a student at Harvard University."
    },
    {
        question: "What is the capital of Japan?",
        options: ["Kyoto", "Osaka", "Tokyo", "Yokohama"],
        correct: 2,
        explanation: "Tokyo is the capital and largest city of Japan, serving as the country's political, economic, and cultural center."
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
        correct: 1,
        explanation: "Albert Einstein developed the theory of relativity, which revolutionized our understanding of space, time, and gravity."
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomatoes", "Avocados", "Onions", "Limes"],
        correct: 1,
        explanation: "Guacamole is primarily made from avocados, which give it its characteristic green color and creamy texture."
    }
];

// Game state
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let gameStarted = false;

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options');
const questionCounter = document.getElementById('question-counter');
const currentScore = document.getElementById('current-score');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const totalQuestions = document.getElementById('total-questions');
const percentage = document.getElementById('percentage');
const performanceMessage = document.getElementById('performance-message');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);

// Initialize the game
function init() {
    updateQuestionCounter();
    updateProgress();
    updateScore();
}

// Start the quiz
function startQuiz() {
    gameStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    showScreen(quizScreen);
    loadQuestion();
    init();
}

// Load current question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    updateQuestionCounter();
    updateProgress();
    nextBtn.disabled = true;
}

// Handle option selection
function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const question = questions[currentQuestionIndex];
    
    // Disable all options
    options.forEach(option => {
        option.disabled = true;
        option.classList.add('disabled');
    });
    
    // Mark selected option
    options[selectedIndex].classList.add('selected');
    
    // Check if answer is correct
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        // Show correct answer
        options[question.correct].classList.add('correct');
    }
    
    // Store user answer
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    // Enable next button
    nextBtn.disabled = false;
    updateScore();
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show results screen
function showResults() {
    const percentageScore = Math.round((score / questions.length) * 100);
    
    finalScore.textContent = score;
    totalQuestions.textContent = questions.length;
    percentage.textContent = `${percentageScore}%`;
    
    // Set performance message
    if (percentageScore >= 90) {
        performanceMessage.textContent = "Excellent! You're a quiz master! 🏆";
    } else if (percentageScore >= 80) {
        performanceMessage.textContent = "Great job! You did really well! 🌟";
    } else if (percentageScore >= 70) {
        performanceMessage.textContent = "Good work! You have solid knowledge! 👍";
    } else if (percentageScore >= 60) {
        performanceMessage.textContent = "Not bad! Keep learning and improving! 📚";
    } else {
        performanceMessage.textContent = "Keep practicing! You'll get better! 💪";
    }
    
    showScreen(resultScreen);
}

// Restart the quiz
function restartQuiz() {
    gameStarted = false;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    showScreen(startScreen);
}

// Show review modal
function showReview() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'review-modal';
    modal.innerHTML = `
        <div class="review-content">
            <div class="review-header">
                <h2>📋 Quiz Review</h2>
                <button class="close-btn" onclick="closeReview()">&times;</button>
            </div>
            <div class="review-summary">
                <div class="summary-item">
                    <span class="label">Total Questions:</span>
                    <span class="value">${questions.length}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Correct Answers:</span>
                    <span class="value correct">${score}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Incorrect Answers:</span>
                    <span class="value incorrect">${questions.length - score}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Score:</span>
                    <span class="value">${Math.round((score / questions.length) * 100)}%</span>
                </div>
            </div>
            <div class="review-questions">
                ${generateReviewQuestions()}
            </div>
            <div class="review-actions">
                <button class="btn" onclick="closeReview()">Close Review</button>
                <button class="btn secondary" onclick="restartQuiz()">Play Again</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add CSS for modal
    if (!document.getElementById('review-styles')) {
        const style = document.createElement('style');
        style.id = 'review-styles';
        style.textContent = `
            .review-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-in-out;
            }
            
            .review-content {
                background: white;
                border-radius: 20px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                padding: 30px;
                position: relative;
                animation: slideIn 0.3s ease-in-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .review-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #e2e8f0;
            }
            
            .review-header h2 {
                color: #4a5568;
                margin: 0;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #718096;
                padding: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: #f7fafc;
                color: #4a5568;
            }
            
            .review-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
                padding: 20px;
                background: #f7fafc;
                border-radius: 15px;
            }
            
            .summary-item {
                text-align: center;
            }
            
            .summary-item .label {
                display: block;
                font-size: 0.9rem;
                color: #718096;
                margin-bottom: 5px;
            }
            
            .summary-item .value {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
                color: #4a5568;
            }
            
            .summary-item .value.correct {
                color: #48bb78;
            }
            
            .summary-item .value.incorrect {
                color: #f56565;
            }
            
            .review-questions {
                margin-bottom: 30px;
            }
            
            .review-question {
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 20px;
                transition: all 0.3s ease;
            }
            
            .review-question:hover {
                border-color: #667eea;
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
            }
            
            .review-question.correct {
                border-color: #48bb78;
                background: #f0fff4;
            }
            
            .review-question.incorrect {
                border-color: #f56565;
                background: #fff5f5;
            }
            
            .question-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .question-number {
                background: #667eea;
                color: white;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .question-status {
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .question-status.correct {
                background: #48bb78;
                color: white;
            }
            
            .question-status.incorrect {
                background: #f56565;
                color: white;
            }
            
            .review-question-text {
                font-size: 1.1rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 15px;
                line-height: 1.5;
            }
            
            .review-options {
                display: grid;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .review-option {
                padding: 12px 15px;
                border-radius: 10px;
                font-size: 0.95rem;
                position: relative;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .review-option.user-answer {
                background: #fed7d7;
                border: 2px solid #f56565;
                color: #c53030;
            }
            
            .review-option.correct-answer {
                background: #c6f6d5;
                border: 2px solid #48bb78;
                color: #22543d;
            }
            
            .review-option.user-answer.correct-answer {
                background: #c6f6d5;
                border: 2px solid #48bb78;
                color: #22543d;
            }
            
            .option-indicator {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .option-indicator.user {
                background: #f56565;
                color: white;
            }
            
            .option-indicator.correct {
                background: #48bb78;
                color: white;
            }
            
            .option-indicator.both {
                background: #48bb78;
                color: white;
            }
            
            .review-explanation {
                background: #edf2f7;
                padding: 15px;
                border-radius: 10px;
                font-size: 0.95rem;
                color: #4a5568;
                line-height: 1.5;
                border-left: 4px solid #667eea;
            }
            
            .review-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .review-content {
                    padding: 20px;
                    margin: 20px;
                }
                
                .review-summary {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .review-actions {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Generate review questions HTML
function generateReviewQuestions() {
    return questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const userAnswerText = question.options[userAnswer];
        const correctAnswerText = question.options[question.correct];
        
        return `
            <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-header">
                    <span class="question-number">Question ${index + 1}</span>
                    <span class="question-status ${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                </div>
                <div class="review-question-text">${question.question}</div>
                <div class="review-options">
                    ${question.options.map((option, optionIndex) => {
                        const isUserAnswer = optionIndex === userAnswer;
                        const isCorrectAnswer = optionIndex === question.correct;
                        let className = 'review-option';
                        let indicator = '';
                        
                        if (isUserAnswer && isCorrectAnswer) {
                            className += ' user-answer correct-answer';
                            indicator = '<span class="option-indicator both">✓</span>';
                        } else if (isUserAnswer) {
                            className += ' user-answer';
                            indicator = '<span class="option-indicator user">✗</span>';
                        } else if (isCorrectAnswer) {
                            className += ' correct-answer';
                            indicator = '<span class="option-indicator correct">✓</span>';
                        }
                        
                        return `
                            <div class="${className}">
                                ${indicator}
                                ${option}
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            </div>
        `;
    }).join('');
}

// Close review modal
function closeReview() {
    const modal = document.querySelector('.review-modal');
    if (modal) {
        modal.remove();
    }
}

// Show specific screen
function showScreen(screen) {
    // Hide all screens
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    // Show target screen
    screen.classList.add('active');
}

// Update question counter
function updateQuestionCounter() {
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Update current score
function updateScore() {
    currentScore.textContent = score;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen !== quizScreen) return;
    
    const options = document.querySelectorAll('.option:not(.disabled)');
    
    switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
            const index = parseInt(e.key) - 1;
            if (index < options.length) {
                selectOption(index);
            }
            break;
        case 'Enter':
            if (!nextBtn.disabled) {
                nextQuestion();
            }
            break;
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('review-modal')) {
        closeReview();
    }
});

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', init); 