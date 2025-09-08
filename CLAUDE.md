# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `juego-tablas`, an educational web game that teaches multiplication tables through gamification. The game is built as a React SPA using TypeScript, Vite, and Tailwind CSS. All content is in Spanish and the game is deployed at https://juego-tablas.pages.dev/.

Read README.md to understand the mechanics

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript + Vite)  
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

**Note:** No testing framework is currently configured.

## Architecture

**Core Pattern:** Single-state-container React app with component-based architecture
- `src/App.tsx` - Main application logic, global state, and view routing
- `src/components/` - All UI components with TypeScript interfaces
- No external router - uses conditional rendering based on `currentView` state
- LocalStorage for game progress persistence

**State Management:**
- React hooks only (no external state library)
- Game progress stored as `{ "progress": { "2": true, "3": true }, "wins": 5 }`
- All state updates flow through `App.tsx`

## Key Components

- `HomeView.tsx` - Main dashboard with table selection grid
- `QuestionPanel.tsx` - Quiz interface with randomized multiplication questions  
- `GameCompleteView.tsx` - Victory screen with animal prizes
- `TableButton.tsx` - Individual table selector buttons
- `PrizesList.tsx` - Display earned animal rewards

## Game Logic

**Multiplication Tables:** 12 tables (1-12) each with animal mascots
**Quiz Mechanics:** 10 randomized questions per table without repetition
**Progress Tracking:** Completed tables saved to localStorage with animal prizes
**Victory System:** Counter tracks total game completions

## Development Patterns

**TypeScript:** Strict mode with comprehensive interfaces for all component props
**Styling:** Tailwind CSS utility classes exclusively - avoid custom CSS
**Language:** All user-facing content must be in Spanish
**Components:** Functional components with hooks, props flow top-down from App.tsx
**UI Theming:** Each view has distinct gradient color schemes (purple/orange/green/blue)

## File Structure

```
src/
├── App.tsx              # Core game logic and state
├── main.tsx            # React root
├── style.css           # Minimal global styles
└── components/         # All UI components
```

## Important Notes

- Game state lives entirely in `App.tsx` - this is the single source of truth
- Uses direct localStorage API rather than persistence libraries  
- No React Router - view switching via state-based conditional rendering
- Custom randomization logic ensures all 10 multiplication questions are asked
- Animal emoji system used extensively for visual rewards and mascots
