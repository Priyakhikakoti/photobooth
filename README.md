# ✦ Peachy Booth ✦

<div align="center">

  ![Peachy Booth Banner](https://img.shields.io/badge/✦_Peachy_Booth_✦-Vintage_Photobooth-ff9a6e?style=for-the-badge&logoColor=white)

  **A tiny vintage photo moment. Capture timed retro photos & download your cute photo strip!** 🎀✨

  [![Live Site](https://img.shields.io/badge/Live_Site-priyakhikakoti.github.io%2Fphotobooth-ff7748?style=flat-square&logo=github&logoColor=white)](https://priyakhikakoti.github.io/photobooth/)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Privacy](https://img.shields.io/badge/Privacy-100%25_On--Device-emerald?style=flat-square&logo=shield&logoColor=white)](#-privacy-guarantee)
  [![License](https://img.shields.io/badge/License-MIT-amber?style=flat-square)](LICENSE)

  [Live Demo](https://priyakhikakoti.github.io/photobooth/) • [Key Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 🌟 Overview

**Peachy Booth** is a local-only, aesthetic vintage photobooth web application built with **React**, **Vite**, **Tailwind CSS**, and the **HTML5 Canvas API**. It brings the nostalgic charm of classic arcade photobooths directly to your browser with cute pastel styling, customizable strip themes, retro filters, and instant high-res PNG downloads—with **zero backend, zero tracking, and 100% on-device privacy**.

---

## 🎀 Features

- 🔒 **100% On-Device & Private**: Operates entirely in the browser using `navigator.mediaDevices.getUserMedia()`. Your photos never leave your device.
- 🎨 **8 Vintage & Aesthetic Filters**:
  - **Original 🎀** – Natural clear glow
  - **Honey Glow 🍯** – Warm golden sepia tones
  - **Soft Sakura 🌸** – Dreamy pink rosy aesthetic
  - **Peach Sunset 🌅** – Cozy golden warm glow
  - **Old Film 🎞️** – Muted retro film nostalgia
  - **Retro 90s 📽️** – Vibrant vintage magazine vibe
  - **Cool Breeze 🌊** – Pastel cyan chill mood
  - **Noir B&W 🖤** – Classic monochrome portrait
- ⏱️ **Automated 3-Shot Countdown**:
  - 3-second visual timer per photo with playful pose prompts (`"Strike a cute pose! 🎀"`, `"Big smile bestie! ✨"`, `"Say cheese! 📸"`).
  - 200ms white shutter flash screen effect.
  - Web Audio API synthesized shutter click and countdown sound effects.
- 🍦 **5 Strip Background Color Themes**:
  - Vanilla Cream 🍦 (`#FAF6EE`)
  - Sakura Pink 🌸 (`#FFF0F5`)
  - Lavender Dream 💜 (`#F8F0FC`)
  - Honey Butter 🧈 (`#FFFDE7`)
  - Minty Matcha 🍵 (`#F1F8E9`)
- 🌸 **Cute Corner Sticker Badges**: Toggle corner accents on your photo strip (Pink Bow 🎀, Cherries 🍒, Peachy 🍑, Pink Hearts 💖, Sparkles ✨).
- ✍️ **Customizable Caption & Date Stamp**: Live-updating caption input field (defaults to `"best day ever ✦"`) with formatted date stamp.
- 🖼️ **High-DPI Canvas PNG Export**: 2x DPI scaling for ultra-sharp printable photo strip downloads paired with a celebratory pastel confetti burst.
- 🔄 **Instant Retake Session**: Restart the camera stream clean without needing a page refresh.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern component-based UI framework & state management |
| **Vite 8** | Lightning-fast build tool & local development server |
| **Tailwind CSS v4** | Custom pastel design system, vintage styling tokens & animations |
| **HTML5 Canvas API** | Real-time pixel filtering, DPI scaling & high-resolution PNG generation |
| **Web Audio API** | Synthesized shutter clicks and countdown sound effects (no external audio assets needed) |
| **Canvas-Confetti** | Celebratory pastel confetti animation upon downloading PNG |
| **Lucide React** | Clean aesthetic icon set |

---

## 📂 Project Structure

```text
photobooth/
 ├── .github/
 │    └── workflows/
 │         └── deploy.yml          # Automated GitHub Pages deployment pipeline
 ├── public/                       # Favicon & static assets
 ├── src/
 │    ├── assets/                  # Images & icons
 │    ├── components/
 │    │    ├── Header.jsx          # Top navbar logo & privacy badge
 │    │    ├── WelcomeScreen.jsx   # Hero screen & feature highlights
 │    │    ├── CameraBooth.jsx     # Webcam feed, filter switcher & countdown sequence
 │    │    ├── FilterSelector.jsx  # 8 vintage filter preset picker
 │    │    ├── CountdownOverlay.jsx# 3s timer overlay & shutter flash effect
 │    │    ├── ResultScreen.jsx    # Photo strip preview, caption input & action toolbar
 │    │    └── PhotoStripCanvas.jsx# 2x DPI HTML5 Canvas photo strip renderer
 │    ├── utils/
 │    │    ├── audio.js            # Web Audio API sound generator
 │    │    └── filters.js          # Filter presets, strip color themes & sticker badges
 │    ├── App.jsx                  # Main application state machine
 │    ├── index.css                # Tailwind CSS imports & custom styling utilities
 │    └── main.jsx                 # Application entry point
 ├── index.html                    # Main HTML shell with Google Fonts
 ├── package.json                  # Dependencies & scripts
 ├── postcss.config.js             # PostCSS configuration for Tailwind v4
 ├── tailwind.config.js            # Tailwind custom colors, fonts & keyframe animations
 └── vite.config.js                # Vite build config with relative base path
```

---

## 🚀 Getting Started

Follow these steps to set up and run **Peachy Booth** locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Priyakhikakoti/photobooth.git
   cd photobooth
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173/` in your browser. Grant camera access when prompted to start taking photos!

---

## 📦 Building & Deployment

### Production Build

To create an optimized production build in the `dist/` directory:

```bash
npm run build
```

You can preview the production bundle locally with:

```bash
npm run preview
```

### Automatic GitHub Pages Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To deploy to GitHub Pages:
1. Push your changes to the `main` branch.
2. Go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Your site will automatically build and publish to:
   **`https://priyakhikakoti.github.io/photobooth/`**

---

## 🔒 Privacy Guarantee

- **No Cloud Uploads**: All frame capture, filter processing, and canvas rendering happen 100% inside your browser session.
- **Camera Access**: Camera permissions are requested via the browser's standard `getUserMedia()` API and are active only while on the camera screen.
- **Clean Teardown**: Camera tracks are explicitly stopped whenever you switch screens or finish taking photos.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>✦ Made with 💖 for vintage photo lovers ✦</sub>
</div>
