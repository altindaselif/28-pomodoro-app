# Pomodoro App ⏰

A fully customizable Pomodoro timer built with **Vanilla JavaScript**. This project focuses on complex state management, SVG animations and dynamic theming without relying on external libraries or frameworks.

## 🚀 Overview

The goal was to build a productivity tool that allows users to manage their focus and break times. The application features a circular progress bar that updates in real-time, along with a comprehensive settings modal to customize time intervals, color themes and font styles.

## 🔗 Links

- **Live Site:** [View Live Demo](https://altindaselif.github.io/28-pomodoro-app/)
- **Code:** [View GitHub Repository](https://github.com/altindaselif/28-pomodoro-app)

## 💡 Key Features

- **⏲️ Customizable Timer:** Adjustable durations for pomodoro, short break and long break modes.
- **🎨 Dynamic Theming:** Users can switch between three color themes and three font families.
- **⭕ SVG Progress Ring:** A real-time circular progress bar that visually represents the remaining time.
- **🔔 Audio Feedback:** An audio alert is triggered when the timer completes.
- **♿ Accessibility:** Includes `aria-label` attributes, keyboard navigation support (`:focus-visible`), and semantic HTML.

## 🛠️ Technical Implementation

### 1. SVG Circular Progress Animation

Creating a smooth, circular countdown effect requires precise manipulation of vector graphics.

- **Solution:** An SVG `circle` element with **`stroke-dasharray` and `stroke-dashoffset**` properties was utilized. The stroke offset is calculated dynamically within the JavaScript logic based on the **percentage of time remaining**. This ensures the ring reduces smoothly in synchronization with the numerical countdown.

### 2. Centralized State & Theme Management

Handling multiple timer modes and user preferences (colors/fonts) simultaneously requires a robust state structure.

- **Solution:** A **centralized `timerState` object** was implemented to track the active mode, remaining time, and running status. Theme changes are handled by manipulating **CSS variables** and class names on the `body` element, allowing instant visual updates across the entire application without page reloads.

### 3. Accessible Form Controls

Custom UI elements, such as the increment/decrement arrows in the settings modal, can often pose accessibility challenges.

- **Solution:** **Semantic `<button>` elements** with explicit `type="button"` and descriptive **`aria-label` attributes** were employed. This ensures that screen readers can correctly interpret the controls, while **`aria-pressed` states** are updated dynamically to indicate the currently active timer mode.

## 📸 Screenshots

- [View Desktop Version](./desktop-screenshot.png)
- [View Tablet Version](./tablet-screenshot.png)
- [View Mobile Version](./mobile-screenshot.png)

## 🧰 Built With

- **Semantic HTML5**
- **CSS3 (Custom Properties & Flexbox)**
- **Vanilla JavaScript (ES6+)**
- **SVG (Scalable Vector Graphics)**

## ✍️ Author

- **LinkedIn:** [Elif Altındaş](https://www.linkedin.com/in/elifaltindas/)
- **Frontend Mentor:** [@altindaselif](https://www.frontendmentor.io/profile/altindaselif)
- **GitHub:** [@altindaselif](https://github.com/altindaselif)
