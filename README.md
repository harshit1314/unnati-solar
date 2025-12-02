# Unnati Solar

A modern, responsive website for Unnati Renewables, showcasing solar energy solutions, services, and tools to help customers transition to sustainable energy.

## Features

- **Hero Section**: Engaging landing page with call-to-action buttons.
- **Services**: Overview of solar installation, maintenance, and consulting services.
- **Pricing**: Transparent pricing plans for residential and commercial solar solutions.
- **Savings Calculator**: Interactive tool to estimate potential savings from solar adoption.
- **Testimonials**: Customer reviews and success stories with a carousel interface.
- **About & Contact**: Company information and contact forms.
- **CRM Integration**: Basic CRM page for lead management.
- **Live Chat**: Integrated chat support component.
- **Dark Mode**: Theme toggle for better user experience.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **React Router**: For client-side routing between pages.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Chart.js & React-Chartjs-2**: For data visualization in the savings calculator.
- **React Icons**: Icon library for UI elements.
- **Create React App**: Build setup and development server.
- **GitHub Pages**: Hosting and deployment.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harshit1314/unnati-solar.git
   cd unnati-solar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
To start the development server:
```bash
npm start
```
The app will run on `http://localhost:3000`.

### Building for Production
To build the app for production:
```bash
npm run build
```
The build artifacts will be stored in the `build/` directory.

### Deployment
To deploy to GitHub Pages:
```bash
npm run deploy
```
This will build the project and deploy it to the configured GitHub Pages URL.

## Project Structure

```
unnati-solar/
├── public/
│   ├── index.html
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── GetQuoteButton.js
│   │   ├── Hero.js
│   │   ├── LiveChat.jsx
│   │   └── Testimonials.jsx
│   ├── pages/
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── CRM.js
│   │   ├── GetStartedPage.js
│   │   ├── LearnMorePage.js
│   │   ├── Pricing.js
│   │   ├── SavingsCalculator.jsx
│   │   └── Services.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── build/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is private and proprietary to Unnati Renewables.

## Contact

For questions or support, please contact us through the website or at [contact@unnati-renewables.com](mailto:contact@unnati-renewables.com).