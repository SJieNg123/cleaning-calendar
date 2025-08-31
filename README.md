# Home Manager

A comprehensive home management system built with Next.js, featuring multiple services for household organization and management. The application includes a cleaning calendar, expenses tracking, and system settings with internationalization support.

## 🌟 Features

### 🏠 **Dashboard**
- Central hub for accessing all home management services
- Quick stats and recent activity overview
- Beautiful, responsive design with dark/light theme support

### 🧹 **Cleaning Calendar**
- **Rotating Schedule**: 4 people, 4 places, alternating weeks
- **Person Selection**: Choose your name to view personal schedule
- **Complete Schedule Table**: Full overview of all assignments
- **Interactive Calendar**: Click dates to see daily tasks
- **Fixed Rotation Pattern**: Ensures fair distribution of cleaning tasks

### 💰 **Expenses Record**
- **Monthly & Bimonthly Bills**: Track different billing cycles
- **Per-Person Calculation**: Automatically divides expenses among 4 people
- **Categories**: Rental fee, WiFi, water, electricity, gas, and other expenses
- **Firebase Integration**: Persistent data storage with real-time updates
- **CRUD Operations**: Add, edit, delete, and view expense records

### ⚙️ **System Settings**
- **Language Selection**: English and Traditional Chinese support
- **Theme Options**: Light, Graphite (dark), and System preference
- **Global Settings**: Applied across all services
- **Beautiful UI**: Modern design with smooth transitions

## 🎨 Design & UX

### **Theme System**
- **Light Theme**: Clean, bright interface
- **Graphite Theme**: Beautiful dark theme with purple accents
- **System Preference**: Automatically matches your OS theme
- **Consistent Styling**: Unified design language across all services

### **Internationalization**
- **English**: Full English interface
- **Traditional Chinese**: Complete Traditional Chinese translation
- **Dynamic Switching**: Change language instantly without page reload

## 🚀 Live Demo

**Visit the application**: [https://home-manager-ecea2.web.app](https://home-manager-ecea2.web.app)

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Backend**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **State Management**: React Context API

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm
- Firebase account

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cleaning-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore Database
   - Get your Firebase configuration
   - Create `.env.local` with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 📁 Project Structure

```
cleaning-calendar/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard
│   │   ├── cleaning-calendar/    # Cleaning calendar service
│   │   ├── expenses/             # Expenses tracking service
│   │   ├── settings/             # System settings service
│   │   ├── layout.tsx            # Root layout with navigation
│   │   └── globals.css           # Global styles and themes
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── Dashboard.tsx         # Main dashboard component
│   │   ├── Navigation.tsx        # Global navigation
│   │   └── CleaningCalendar.tsx  # Cleaning calendar component
│   ├── contexts/
│   │   └── SettingsContext.tsx   # Global settings and i18n
│   └── lib/
│       ├── utils.ts              # Utility functions
│       ├── firebase.ts           # Firebase configuration
│       └── firebaseService.ts    # Firebase CRUD operations
├── public/                       # Static assets
├── firebase.json                 # Firebase hosting config
├── .firebaserc                   # Firebase project config
└── package.json                  # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Cleaning Schedule Pattern
The cleaning rotation is hardcoded in `src/components/CleaningCalendar.tsx`:
- **Person 1**: 大厠所 → 客廳 → 小厠所 → 厨房+走廊
- **Person 2**: 小厠所 → 厨房+走廊 → 大厠所 → 客廳
- **Person 3**: 厨房+走廊 → 大厠所 → 客廳 → 小厠所
- **Person 4**: 客廳 → 小厠所 → 厨房+走廊 → 大厠所

### Expenses Categories
- Rental Fee (月租費)
- WiFi Bill (網路費)
- Water Bill (水費)
- Electricity Bill (電費)
- Gas Bill (瓦斯費)
- Other (其他)

## 🌐 Internationalization

The application supports multiple languages through the `SettingsContext`:
- **English**: Complete English interface
- **Traditional Chinese**: Full Traditional Chinese translation
- **Dynamic Switching**: Change language in real-time

## 🎨 Theme System

### Light Theme
- Clean, bright interface
- High contrast for readability
- Professional appearance

### Graphite Theme (Dark)
- Beautiful dark background
- Purple accent colors
- Easy on the eyes
- Modern aesthetic

## 🔥 Firebase Integration

### Data Persistence
- **Firestore Database**: Structured data storage
- **Real-time Updates**: Instant data synchronization
- **Offline Support**: Works without internet connection
- **Security Rules**: Configurable access control

### Hosting
- **Firebase Hosting**: Fast, reliable hosting
- **Global CDN**: Worldwide content delivery
- **SSL Certificate**: Secure HTTPS connection
- **Custom Domain**: Support for custom domains

## 🤝 Contributing

This project is designed for personal use but contributions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Firebase** for backend services
- **Next.js** for the amazing framework
- **Tailwind CSS** for utility-first styling
