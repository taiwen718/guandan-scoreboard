# Guandan Scoreboard (掼蛋计分板)

A responsive, production-ready mobile-first scoreboard application designed for tracking points in the card game **Guandan** (掼蛋).

## 🚀 Live Demo

It is deployed and accessible at: **[guandan.hogwash.ai](https://guandan.hogwash.ai)**

## ✨ Features

- **Dual-Team Tracking**: Easily track the score and history of two opposing teams.
- **Custom Scoring Logic**: Accurately follows Guandan card rankings (2 through A3).
- **Undo Functionality**: Made a mistake? Seamlessly revert back with history-based undo features.
- **Game States**: Handles "Explode" (failure to pass A3) and "Victory" mechanics intuitively.
- **Child-Friendly & Responsive UI**: Works elegantly across mobile, tablet, and desktop devices.
- **Dynamic Color Themes**: Custom team color palettes for personalization.
- **Mobile-First Orientation**: Adaptive layout switching for strict fullscreen fitting without scrolling.

## 🛠 Tech Stack

- **React 18** & **TypeScript**
- **Vite** & **Bun** (for fast local development and building)
- **Tailwind CSS** & **shadcn/ui** (styling and accessible components)
- **Lucide React** (icons)
- **Cloudflare Pages** (deployment)

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Run the development server**:
   ```bash
   bun run dev
   ```

3. **Build for production**:
   ```bash
   bun run build
   ```
