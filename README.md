# SolarHub — Save Money Save Future ☀️

Agra's #1 UPNEDA empanelled solar installer. This platform is a high-converting lead generation website designed to capture qualified solar leads and forward them to SolarHub via WhatsApp and Supabase CRM.

## 🚀 Live Demo
[Deploying to Vercel...] (Coming soon)

## ✨ Key Features
- **PM Surya Ghar Subsidy Calculator**: Accurate ROI, EMI, and "Day-1 Profit" calculations based on latest 2024 government slabs (₹78,000 max subsidy).
- **Multi-Step Lead Form**: High-conversion form with React Portals for seamless UI.
- **Supabase Integration**: Real-time lead capture and persistent storage.
- **Admin CRM Dashboard**: Password-protected dashboard for managing leads, updating statuses, and exporting data.
- **WhatsApp Automation**: Instant lead forwarding with prefilled professional messages.
- **Pincode Checker**: Instant service area validation for Agra + 50km radius.
- **Premium UI**: Modern, responsive design with glassmorphism, dark mode support, and smooth animations.

## 🛠️ Tech Stack
- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Routing**: React Router v7 (BrowserRouter)
- **Database/Backend**: Supabase (PostgreSQL)
- **Charts**: Chart.js
- **SEO**: React Helmet Async
- **Icons**: React Icons, FontAwesome

## 🛠️ Local Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/harshit1314/unnati-solar.git
   cd unnati-solar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file (use `.env.example` as a template):
   ```env
   REACT_APP_SUPABASE_URL=your_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_SUPABASE_SERVICE_KEY=your_service_key
   REACT_APP_CRM_PASSWORD=your_password
   REACT_APP_WHATSAPP_NUMBER=91XXXXXXXXXX
   ```

4. **Run locally:**
   ```bash
   npm start
   ```

## 📦 Deployment (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Add all `REACT_APP_` environment variables in the Vercel project settings.
3. Vercel will automatically detect the React build settings.
4. Deploy!

## 📜 Business Info
- **Business Name**: SolarHub
- **Parent Entity**: Seema Electronics
- **UPNEDA Vendor Code**: AGC2512234235
- **Service Area**: Agra, Mathura, Firozabad (UP)

---
Developed with ❤️ for SolarHub.