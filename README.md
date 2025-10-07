# Example Time Challenge

An **interactive quiz game** built with **HTML, CSS, and JavaScript**.
This project combines accessibility-focused UI design, dynamic sound and character feedback, and configurable gameplay options like timers and practice modes.

## Overview

The **Example Time Challenge** is a timed multiple-choice quiz that gives visual and audio feedback based on player performance.
Players can customize the game through settings such as timer duration, volume control, and gameplay modes.

The app demonstrates:

* Accessible form controls and ARIA labels.
* Real-time progress tracking.
* Interactive character feedback.
* Dynamic sound and visual elements.

---

## Features

### Gameplay

* 3-question quiz with dynamic feedback.
* Countdown timer for each challenge.
* Character expressions change based on correct or incorrect answers.
* Final results screen with rewards (Gold, Silver, Bronze).

### Settings Menu

* **Custom Timer Duration** — Choose between 10 and 300 seconds.
* **Enable/Disable Timer** — Play freely or under pressure.
* **Practice Mode** — Play without penalties.
* **Fail-Safe Mode** — Prevents score loss for beginners.
* **Volume Controls** — Adjust separate sliders for music and sound effects, with dynamic icons.

### Audio

* Sound effects for correct and incorrect answers.
* Background music loop during gameplay.
* Volume sliders update icon visuals based on levels (off, low, medium, high).

### Character Interaction

* A quiz companion gives encouragement and feedback.
* Expressions switch between neutral, joyful, and encouraging states.

### Results and Rewards

* Score is based on remaining time and correct answers.
* Rewards unlock based on score thresholds.

### Accessibility

* Proper **ARIA roles**, **labels**, and **live regions** for screen readers.
* Keyboard navigation supported (number keys focus elements).
* Visible focus outlines for interactive elements.

---

## Project Structure

```
project-root/
│
├── index.html              # Main HTML structure
├── styles/
│   └── styles.css          # Core styling and variables
├── script.js               # Game logic and interactivity
│
├── assets/
│   ├── icons/              # Icon assets (volume, answer choices)
│   ├── sprites/            # Character and reward images
│   └── sounds/             # Sound effects and background music
│
└── README.md               # This file
```

---

## Setup & Usage

### Option 1: Open Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/example-time-challenge.git
   cd example-time-challenge
   ```
2. Open `index.html` in your browser.

### Option 2: Use Live Server (Recommended)

If you have VS Code:

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.
3. The app will open at `http://localhost:5500/`.

---

## How It Works

1. **Main Menu:**
   Start the quiz or open settings.

2. **Settings Menu:**
   Adjust time, enable practice/fail-safe modes, and tune volume.

3. **Quiz Phase:**

   * Character introduces each question.
   * Timer counts down if enabled.
   * Player selects an answer (mouse or keyboard).

4. **Result Phase:**

   * Character reacts to performance.
   * Score and reward displayed.
   * Option to replay.

---

## Built With

* **HTML5** – Structure and ARIA support
* **CSS3** – Custom properties, gradients, and responsive design
* **Vanilla JavaScript** – Game logic, sound control, and accessibility

---

## Future Improvements

* Add randomized question sets.
* Include difficulty levels.
* Store player stats using `localStorage`.
* Support multilingual UI text.
* Add transitions or animations for character and score updates.

---

## License

This project is licensed under the **MIT License** — you’re free to use, modify, and distribute it.
See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

* Sound effects and icons sourced from open-license libraries.
* Character and reward assets are placeholders and can be replaced with your own visuals.
