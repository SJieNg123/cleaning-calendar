# Home Cleaning Calendar

A simple web application to manage a rotating cleaning schedule for 4 people and 4 places. Each place should be cleaned once every 2 weeks, with a specific rotation pattern.

## Features

- **Person Selection**: Choose which person number you are (1-4)
- **Name Customization**: Replace "Person 1", "Person 2", etc. with actual names
- **Schedule Display**: View your personal cleaning schedule
- **Complete Schedule Table**: See the full schedule for all people
- **Calendar View**: Interactive calendar with task details
- **Fixed Rotation**: The cleaning order cannot be edited to maintain fairness

## Cleaning Schedule Pattern

The application implements the following rotation pattern:

- **Person 1**: a → b → c → d
- **Person 2**: b → c → d → a  
- **Person 3**: c → d → a → b
- **Person 4**: d → a → b → c

Each person cleans one place per week, and the pattern repeats every 4 weeks.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd cleaning-calendar
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. **Select Your Person Number**: Use the dropdown to choose which person number you are (1-4)

2. **Customize Names**: Once you've selected your person number, you can replace the default names ("Person 1", "Person 2", etc.) with actual names

3. **View Your Schedule**: Your personal cleaning schedule will be displayed with highlighted cards showing which place you need to clean each week

4. **Check the Complete Schedule**: Use the table view to see everyone's schedule at a glance

5. **Use the Calendar**: Click on any date in the calendar to see what cleaning tasks are scheduled for that day

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Date Handling**: date-fns

## Project Structure

```
cleaning-calendar/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   └── CleaningCalendar.tsx  # Main calendar component
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

The cleaning schedule pattern is hardcoded in the `CleaningCalendar.tsx` component to ensure fairness and prevent manipulation. If you need to modify the schedule pattern, you can edit the `PEOPLE_SCHEDULES` constant in the component.

## Contributing

This is a simple application designed for personal use. Feel free to fork and modify for your own needs.

## License

This project is open source and available under the MIT License.
