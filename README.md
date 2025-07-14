# 🎯 Quiz Game

A modern, interactive quiz game built with HTML, CSS, and JavaScript. Test your knowledge with multiple-choice questions and see your score at the end!

## Features

- **Interactive Quiz Interface**: Clean, modern design with smooth animations
- **Multiple Choice Questions**: 10 diverse questions covering various topics
- **Real-time Scoring**: See your score update as you answer questions
- **Progress Tracking**: Visual progress bar showing quiz completion
- **Immediate Feedback**: See correct/incorrect answers instantly
- **Performance Messages**: Encouraging feedback based on your score
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Use number keys (1-4) to select answers and Enter to continue

## How to Play

1. **Start the Game**: Click the "Start Quiz" button on the welcome screen
2. **Answer Questions**: Click on one of the four options for each question
3. **See Feedback**: Correct answers turn green, incorrect answers turn red
4. **Continue**: Click "Next Question" to proceed to the next question
5. **View Results**: See your final score and performance message
6. **Play Again**: Click "Play Again" to restart the quiz

## File Structure

```
quiz-game/
├── index.html      # Main HTML structure
├── style.css       # Modern styling and animations
├── script.js       # Game logic and functionality
└── README.md       # This file
```

## Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Game logic, DOM manipulation, and event handling

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

### Adding New Questions

To add more questions, edit the `questions` array in `script.js`:

```javascript
const questions = [
    {
        question: "Your question here?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0  // Index of correct answer (0-3)
    },
    // Add more questions...
];
```

### Styling Changes

Modify `style.css` to customize:
- Colors and gradients
- Fonts and typography
- Animations and transitions
- Layout and spacing

## Getting Started

1. Download or clone the files
2. Open `index.html` in your web browser
3. Start playing!

No server setup required - this is a pure client-side application.

## Future Enhancements

- Timer for each question
- Different difficulty levels
- Question categories
- High score tracking
- Sound effects
- Review answers feature
- Export results

Enjoy the quiz! 🎉 