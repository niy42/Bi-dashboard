BI Dashboard
A modern Business Intelligence (BI) dashboard built with Next.js, Tailwind CSS, Material-UI (MUI), and Recharts. This project provides an interactive interface to visualize key metrics, sales data, user growth, and category distributions, with support for light/dark themes and user authentication.
Table of Contents
Features (#features)
Tech Stack (#tech-stack)
Setup Instructions (#setup-instructions)
Project Structure (#project-structure)
Design Considerations (#design-considerations)
Usage (#usage)
Contributing (#contributing)
License (#license)
Features
Dashboard Overview: Displays total users, active sessions, and sales revenue in responsive metric cards.
Data Visualizations:
Line Chart: Tracks sales trends over time.
Bar Chart: Shows user growth metrics.
Pie Chart: Visualizes category distribution with dynamic tooltips and labels.
Theme Support: Light and dark modes with persistence across sessions using cookies and localStorage.
Authentication: Session-based authentication with automatic logout after inactivity.
Responsive Design: Optimized for mobile and desktop with dynamic chart sizing and layout adjustments.
Data Table: Displays detailed user sales data.
Loading States: Animated loading indicators during page transitions.
Tech Stack
Framework: Next.js (App Router)
Styling: Tailwind CSS for utility-first styling, Material-UI for components
Charts: Recharts for data visualizations
Authentication: NextAuth.js for session management
Fonts: Geist and Geist Mono from Vercel
State Management: React Context API for theme persistence
Database: Placeholder for PostgreSQL (via Prisma, not fully implemented in this README)
Setup Instructions
Prerequisites
Node.js: v18.x or later
npm: v9.x or later (or use yarn/pnpm)
Git: For cloning the repository
Installation
Clone the Repository:
bash
git clone https://github.com/your-username/bi-dashboard.git
cd bi-dashboard
Install Dependencies:
bash
npm install
Set Up Environment Variables:
Create a .env.local file in the root directory.
Add the following variables (adjust as needed):
env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
# Add database URL if using Prisma
# DATABASE_URL=postgresql://user:password@localhost:5432/bi_dashboard
Generate a NEXTAUTH_SECRET using:
bash
openssl rand -base64 32
Run the Development Server:
bash
npm run dev
Open http://localhost:3000 in your browser.
Build for Production:
bash
npm run build
npm start
Optional: Database Setup
If integrating with PostgreSQL:
Install Prisma:
bash
npm install prisma --save-dev
Initialize Prisma:
bash
npx prisma init
Update prisma/schema.prisma with your schema and run:
bash
npx prisma migrate dev --name init
Project Structure
bi-dashboard/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with ThemeProvider and AuthProvider
│   ├── page.tsx            # Login page
│   └── dashboard/          # Dashboard route
│       └── page.tsx        # Dashboard component
├── components/             # Reusable React components
│   ├── AuthProvider.tsx    # NextAuth.js wrapper
│   ├── MetricsCard.tsx     # Metric display card
│   ├── ThemeToggle.tsx     # Theme switcher
│   ├── charts/             # Chart components
│   │   ├── LineChart.tsx   # Sales line chart
│   │   ├── BarChart.tsx    # User bar chart
│   │   └── PieChart.tsx    # Category pie chart
│   └── DataTable.tsx       # User sales data table
├── context/                # React Context
│   └── ThemeContext.tsx    # Theme management with persistence
├── lib/                    # Utility functions and mock data
│   └── mockData.ts         # Mock dashboard data
├── public/                 # Static assets
├── styles/                 # Global CSS
│   └── globals.css         # Tailwind and custom styles
├── .env.local              # Environment variables (not tracked)
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
Design Considerations
Theme Persistence
Approach: Uses cookies for server-side theme persistence and localStorage for client-side sync. The data-theme attribute on <html> enables global CSS theming.
Why Cookies?: Ensures SSR consistency by allowing the server to read the theme, avoiding hydration errors that occur with localStorage alone.
Trade-offs: Cookies add a small overhead to requests but provide seamless theme application across page loads. localStorage is kept for redundancy and client-side access.
Authentication
Inactivity Timeout: Users are logged out after 1 minute of inactivity (configurable in Dashboard’s useEffect), with a warning via MUI’s Snackbar.
Session Management: NextAuth.js handles session state, redirecting unauthenticated users to the login page.
Responsive Design
Charts: Adjust radius, font size, and padding based on screen width (isMobile state).
Layout: Uses Tailwind’s grid system for flexible column layouts (e.g., md:grid-cols-3 for metrics).
Styling
Tailwind CSS: Provides rapid prototyping and responsive utilities (e.g., dark: prefix for dark mode).
MUI: Adds polished components (e.g., TextField, Button) with theme-aware styling via createTheme.
Recharts: Custom styles for tooltips, labels, and legends ensure theme consistency.
Performance
Loading States: Animated spinners and pulsing text improve UX during data fetches or page transitions.
Server Components: Leverage Next.js App Router’s server-side rendering for initial page loads, with client components marked "use client".
Error Handling
Hydration: suppressHydrationWarning on <html> mitigates minor SSR/CSR discrepancies (e.g., theme flicker).
Usage
Login:
Visit / and enter credentials (configure NextAuth.js providers in AuthProvider).
Dashboard:
After login, access /dashboard to view metrics, charts, and data tables.
Theme Toggle:
Use the ThemeToggle component in the dashboard header to switch between light and dark modes.
Logout:
Click "Logout" or wait for the inactivity timeout.
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a Pull Request.
Guidelines
Follow ESLint and Prettier rules (run npm run lint to check).
Write tests for new components using Jest or React Testing Library (if added).
Document any new features in this README.
License
This project is licensed under the MIT License (LICENSE).
