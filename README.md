# Unnati Renewables - Solar Solutions Web App

A responsive React web app for a solar business workflow, combining educational content, savings estimation, lead capture, and CRM-style lead visibility.

## Project Description

- Built a modular React application for a solar solutions platform.
- Added interactive customer journeys: savings calculator, quote capture, live chat, and lead dashboard.
- Integrated backend-ready lead submission with local demo fallback for development.
- Improved UX through dark-mode support, mobile-friendly layouts, and content trust sections.

## Key Features

- Solar savings calculator with INR-first outputs.
- Seasonal billing mode (summer/monsoon/winter) with weighted average logic.
- Subsidy-aware estimate flow, including UP + PM Surya Ghar logic for eligible residential paths.
- Visual charts for bill impact, yearly savings, and seasonal pattern.
- Quote proposal download as PDF.
- One-click WhatsApp share of estimate highlights.
- Multi-step Get a Free Quote modal with validation and review step.
- Live chat assistant with quick prompts and conversation history.
- CRM dashboard powered by captured leads (from local storage demo records).
- India-focused Learn More and About pages with official-source reference footer sections.
- Dark mode coverage across main pages and modal workflows.

## Technology Stack

- Frontend: React 18
- Routing: React Router v7 (HashRouter)
- Styling: Tailwind CSS
- Charts: Chart.js + react-chartjs-2
- PDF: jsPDF
- Icons: react-icons
- Build system: Create React App (react-scripts)

## Application Routes

- / : Homepage
- /about : About and trust context
- /services : Service catalog
- /pricing : Plans and financing info
- /calculator : Savings calculator
- /contact : Contact form and office details
- /get-started : Guided onboarding page
- /learn-more : India-focused solar knowledge page
- /crm : Lead dashboard

## Lead Submission Behavior

- If REACT_APP_API_BASE_URL is provided, lead submission uses API mode.
- If not provided, submission uses local demo mode (stored in browser localStorage).
- CRM page reads captured lead records and computes live dashboard metrics.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/harshit1314/unnati-solar.git
cd unnati-solar
```

2. Install dependencies:

```bash
npm install
```

### Run in Development

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Build for Production

```bash
npm run build
```

Production artifacts are generated in the build directory.

## Deployment

GitHub Pages deployment is configured via gh-pages:

```bash
npm run deploy
```

## Environment Variables (Optional)

For live lead API integration, define:

- REACT_APP_API_BASE_URL
- REACT_APP_LEAD_ENDPOINT

If omitted, the app automatically stores leads in demo mode.

## Notes

- Currency presentation is INR-focused.
- Calculator outputs are planning estimates and should be validated by site survey and current DISCOM/policy rules.
- Data-source and policy references are included in UI content sections.

## License

Private project. Unauthorized copying or redistribution is prohibited.