# Interview Preparation Guide: Unnati Solar Web Application

## 1. System Design & Architecture
- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS (with `dark` mode support and gradient animations)
- **Routing:** Client-side routing using `react-router-dom` (`HashRouter`) to manage single-page navigation without reloading.
- **State Management:** React local state (`useState`, `useEffect`) used for managing active UI elements (Live Chat open/close state, Modal toggles, user input parsing in the Savings Calculator, checking local storage for dark mode).
- **Component Architecture:**
  - **Pages:** Modular page components (`About`, `Contact`, `SavingsCalculator`, `CRM`, etc.) routed through `App.js`.
  - **Shared Components:** Reusable UI pieces like `Hero`, `Testimonials`, `LiveChat`, and `GetQuoteButton` that exist outside standard route bounds to be globally accessible.
- **Data Visualization:** Integrated `chart.js` and `react-chartjs-2` inside the `SavingsCalculator` to render bar charts dynamically reflecting user input.

## 2. Database Schema
*Note: This specific React application is purely front-end and relies on component-level state without an actual backend database in this iteration. However, if asked how this would be modeled in a database, you should provide the following conceptual schema.*

**Concept: SQL / Relational Database (e.g., PostgreSQL, MySQL)**

**Table: `users` / `leads`**
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `phone` (VARCHAR, Nullable)
- `interest` (ENUM: 'residential', 'commercial', 'industrial')
- `created_at` (TIMESTAMP)

**Table: `chat_logs`**
- `id` (UUID, Primary Key)
- `session_id` (VARCHAR) - To group chats
- `sender_type` (ENUM: 'user', 'bot')
- `message` (TEXT)
- `timestamp` (TIMESTAMP)

## 3. Explaining Your Resume Bullet Points

### Bullet 1: "Developed a responsive React web application with Tailwind CSS and client-side routing, improving UX across devices."
- **How to explain:** You used React functional components and hooks (`useState`, `useEffect`) to build the application. You implemented `react-router-dom` (specifically `HashRouter`/`Routes`/`Route`) in `App.js` to ensure fast, client-side page transitions without server reloads. Tailwind CSS was used extensively for utility-first styling, enabling responsive design using breakpoint prefixes (e.g., `md:flex`, `max-w-7xl`) and establishing an intuitive dark mode utilizing the `dark:` variant linked to `localStorage`.

### Bullet 2: "Built dynamic features including a savings calculator and live chat, boosting user engagement and lead generation."
- **How to explain:** 
  - **Savings Calculator:** Located in `SavingsCalculator.jsx`, it takes user input (monthly electricity bill), stores it in React state, and calculates a 70% projected savings figure. It then dynamically renders a Bar chart using `react-chartjs-2` to visually represent monthly versus yearly savings, making the data highly interactive.
  - **Live Chat:** Located in `LiveChat.jsx`, it uses an array of message objects maintained in local state. When a user types a message, it updates the state, and a Javascript `setTimeout` simulates a delay before analyzing the user's input string (using `.includes()` for keywords like 'panel', 'cost', 'install') to return an automated bot response. A `useRef` hook combined with `.scrollIntoView()` ensures the chat window always auto-scrolls to the newest message.

### Bullet 3: "Created reusable components and a validated quote modal, enhancing code maintainability and conversion rates."
- **How to explain:** You encapsulated UI logic into modular components rather than cluttering `App.js`. The `GetQuoteButton` uses conditional rendering (`isOpen && (...)`) to overlay a customized, fixed-position modal over the screen with a blur effect (`bg-black/50`). The form inside captures standard lead data (`name`, `email`, `phone`, `interest`) and enforces native HTML5 validation constraints (such as `required` fields and `type="email"`). Upon submission, it prevents default browser reload using `e.preventDefault()`, safely capturing the data in a localized state object before unmounting.

---

## 4. Potential Interview Questions & Answers

**Q1: Why did you choose React over vanilla JavaScript for this project?**
**Answer:** React allowed me to build a component-driven architecture. Instead of manually querying the DOM to update elements (like updating the chat log or moving chart data), React’s declarative nature via `useState` and `useEffect` handles efficient UI updates using the Virtual DOM. It significantly simplifies state logic for complex elements like the Calculator and Live Chat.

**Q2: How is routing handled in your application?**
**Answer:** I used `react-router-dom`. I configured a `<Router>` (specifically HashRouter in the main file) surrounding a `<Routes>` block. Each page (like `/pricing`, `/calculator`) maps to a distinct physical component via the `<Route>` element. This prevents the browser from doing full page reloads, providing a snappy Single-Page Application (SPA) experience. 

**Q3: How does your Live Chat determine the bot's response?**
**Answer:** The `LiveChat` component listens to the `userMessage` input. Upon form submission, it appends the user's message to an array of objects in the component's state. It executes a `setTimeout` function to mimic processing time, which categorizes the user's message using keyword mapping (e.g. checking `.includes('cost')`). Based on the matched keyword, it returns an appropriate pre-defined string to the chat feed.

**Q4: Explain how you implemented the Savings Calculator chart.**
**Answer:** I utilized `chart.js` combined with its React wrapper, `react-chartjs-2`. When a user submits their monthly bill amount, my logic calculates the savings and sets it to a state boundary. The chart component consumes this state inside a specific configuration object mapping out labels ('Monthly Savings', 'Yearly Savings') and background colors explicitly styled to match my Tailwind aesthetic, dynamically rendering the customized Bar element.

**Q5: How did you manage Dark Mode implementation?**
**Answer:** I initialized an `isDarkMode` boolean state in `App.js`. The initial state is loaded securely by checking JavaScript's `localStorage`. I used a `useEffect` hook that listens for changes to `isDarkMode`. When triggered, it toggles a `'dark'` class directly on the `document.documentElement`, which communicates globally to Tailwind CSS directives (`dark:bg-gray-800`, etc.) ensuring consistent thematic persistence.

**Q6: I noticed the application gathers lead data. Does this connect to a backend?**
**Answer:** Currently, this version is mocked on the frontend—handling form submissions exclusively through client-side state logic (employing `e.preventDefault()` via synthetic events). However, structurally it’s ready; the JSON payload generated by the local state hooks is perfectly modeled to be dispatched via `fetch` or `axios` to a Node or Python API layer in the future.
