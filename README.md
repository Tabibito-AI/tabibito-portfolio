# Tabibito Portfolio

A modern, full-stack portfolio website for Tabibito-AI, showcasing projects, skills, and professional information. Built with React 19, TypeScript, and Tailwind CSS.

## Overview

Tabibito Portfolio is a responsive, feature-rich web application that presents an AI & Web Developer's work, skills, and contact information. The site features a clean, minimalist design with an emotional aesthetic using rose-pink and slate-gray color schemes.

## Architecture

### Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Routing**: Wouter
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Backend**: Node.js with Express (optional API integration)
- **Database**: PostgreSQL with Drizzle ORM (optional)
- **Deployment**: Manus Platform

### Project Structure

```
portfolio-new/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Main portfolio page
│   │   │   └── NotFound.tsx  # 404 page
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts (theme, auth)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── App.tsx           # Main app component with routing
│   │   ├── main.tsx          # React entry point
│   │   ├── index.css         # Global styles
│   │   └── const.ts          # Application constants
│   ├── public/               # Static assets
│   └── index.html            # HTML template
├── server/                   # Backend server (optional)
├── shared/                   # Shared types and constants
├── package.json              # Project dependencies
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file
```

## Features

### Current Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Navigation**: Sticky navigation bar with smooth scrolling to sections
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **About Section**: Professional profile with skill display
- **Projects Section**: Showcase of 9 featured GitHub projects with descriptions
- **Contact Section**: Contact form and GitHub link
- **Modern Styling**: Minimalist design with rose-pink accents and smooth transitions
- **Authentication**: Optional OAuth2 integration for user management

### Planned Features

- Message form backend integration
- Project detail pages
- Blog section for technical articles
- Dark mode toggle
- Analytics integration

## Design

### Color Palette

- **Primary**: Rose Pink (#f43f5e)
- **Secondary**: Slate Gray (#64748b)
- **Background**: Gradient from slate-50 to slate-100
- **Text**: Slate-900 for headings, Slate-600 for body text

## Installation

### Prerequisites

- Node.js 22.13.0 or higher
- npm or pnpm package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Tabibito-AI/tabibito-portfolio.git
cd tabibito-portfolio
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

### Manus Platform Deployment

This project is designed to be deployed on the Manus Platform.

#### Deployment Steps

1. Create a Manus project at https://manus.im
2. Connect this GitHub repository to Manus
3. Set environment variables in Manus dashboard
4. Click "Publish" button to deploy

#### Production Build

```bash
npm run build
```

## Current Deployment

- **Platform**: Manus
- **URL**: https://tabibitoai-3zbugsgo.manus.space
- **Status**: Active
- **Last Updated**: November 2025

## Build Information

- **Build Tool**: Vite 7.1.12
- **React Version**: 19
- **TypeScript Version**: 5.6.3
- **Node Version**: 22.13.0

## Contact

- **GitHub**: [Tabibito-AI](https://github.com/Tabibito-AI)
- **Portfolio**: [https://tabibitofolio-jzpuj53c.manus.space/](https://tabibitofolio-jzpuj53c.manus.space/)

## License

This project is licensed under the MIT License.

---

**Built with ❤️ by Tabibito-AI**
