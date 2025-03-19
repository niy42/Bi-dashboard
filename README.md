# BI Dashboard

![BI Dashboard Preview](https://github.com/niy42/Bi-dashboard/blob/main/imgs/bi_dashboard.png)  
*A modern and interactive Business Intelligence dashboard.*

## 🚀 Overview
BI Dashboard is a cutting-edge business intelligence application built with **Next.js, Tailwind CSS, Material-UI (MUI), and Recharts**. It provides an interactive and visually appealing interface to track key business metrics such as sales, user growth, and category distributions. The dashboard supports **light/dark themes, user authentication, and responsive design** to enhance user experience across all devices.

---

## 📌 Table of Contents
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [⚡ Setup Instructions](#setup-instructions)
- [📁 Project Structure](#project-structure)
- [🎨 Design Considerations](#design-considerations)
- [📌 Usage](#usage)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

---

## Features
- **✅ Dashboard Overview**: Displays total users, active sessions, and sales revenue in responsive metric cards.  
- **📊 Data Visualizations**:
- **📈 Line Chart**: Tracks sales trends over time.
- **📊 Bar Chart**: Shows user growth metrics.
- **🥧 Pie Chart**: Visualizes category distribution with dynamic tooltips and labels.  
- **🌗 Theme Support**: Light & dark mode with session persistence using cookies & localStorage.  
- **🔐 Authentication**: Secure session-based authentication with automatic logout after inactivity.  
- **📱 Responsive Design**: Optimized for mobile and desktop with dynamic chart sizing.  
- **📋 Data Table**: Displays user sales data in a structured format.  
- **⏳ Loading States**: Animated indicators for smooth page transitions.  

---

🛠️ ## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Material-UI (MUI)](https://mui.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Fonts**: Geist & Geist Mono from Vercel
- **State Management**: React Context API (for theme persistence)
- **Database**: PostgreSQL (via Prisma - optional)

---

⚡ ## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- **Node.js**: v18.x or later
- **npm**: v9.x or later (or use yarn/pnpm)
- **Git**: For cloning the repository

### Installation
```bash
# Clone the Repository
git clone https://github.com/niy2/bi-dashboard.git
cd bi-dashboard

# Install Dependencies
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
# DATABASE_URL=postgresql://user:password@localhost:5432/bi_dashboard (if using Prisma)
```
Generate a secure **NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

### Running the Application
```bash
# Start Development Server
npm run dev
# Open http://localhost:3000 in your browser

# Build for Production
npm run build
npm start
```

### Optional: Database Setup (PostgreSQL)
```bash
# Install Prisma
npm install prisma --save-dev

# Initialize Prisma
npx prisma init

# Apply migrations
npx prisma migrate dev --name init
```

---

📁 ##  Project Structure
```
bi-dashboard/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout with ThemeProvider & AuthProvider
│   ├── page.tsx           # Login page
│   └── dashboard/         # Dashboard route
│       └── page.tsx       # Dashboard component
├── components/            # Reusable React components
│   ├── AuthProvider.tsx   # NextAuth.js wrapper
│   ├── MetricsCard.tsx    # Metric display card
│   ├── ThemeToggle.tsx    # Theme switcher
│   ├── charts/            # Chart components
│   ├── DataTable.tsx      # User sales data table
├── context/               # React Context (Theme management)
├── lib/                   # Utility functions & mock data
├── public/                # Static assets
├── styles/                # Global CSS
├── .env.local             # Environment variables (not tracked)
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies & scripts
└── README.md              # Project documentation
```

---

🎨 ## Design Considerations
### 🌗 Theme Persistence
- **Approach**: Uses cookies for SSR theme persistence & localStorage for client-side sync.
- **Why Cookies?**: Prevents hydration errors when switching themes.

🔐 ## Authentication
- **Inactivity Timeout**: Logs out users after 1 min of inactivity (configurable).
- **Session Handling**: Managed via NextAuth.js with automatic redirects.

📱 ## Responsive Design
- **Charts**: Adjusts size, padding, and labels dynamically.
- **Layout**: Uses Tailwind’s grid system for flexible columns.

⚡ ## Performance
- **Loading States**: Animated spinners for smooth UX.
- **Server Components**: Uses Next.js App Router for SSR improvements.

---

📌 ## Usage
- **Login**: Enter credentials (configured in NextAuth.js providers).
- **Dashboard**: View key metrics, charts, and data tables.
- **Theme Toggle**: Switch between light & dark mode.
- **Logout**: Click "Logout" or wait for inactivity timeout.

---

🤝 ## Contributing
We welcome contributions! To contribute:
```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/your-feature
# Commit changes
git commit -m "Add your feature"
# Push to your branch
git push origin feature/your-feature
# Open a Pull Request
```
### Contribution Guidelines
✅ Follow ESLint & Prettier rules (`npm run lint`).  
✅ Write tests for new components.  
✅ Document any new features in this README.  

---

## 📜 License
This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

🚀 **Live Demo**: [Visit BI Dashboard](https://bi-dashb.netlify.app/)

