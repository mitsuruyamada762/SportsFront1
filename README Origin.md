# Game - Professional React Project





A modern, professional React application built with TypeScript, Tailwind CSS, and Headless UI. This project demonstrates best practices for React development with a clean, scalable architecture.

## 🚀 Features

- **TypeScript** - Full type safety and excellent developer experience
- **Vite** - Lightning-fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Headless UI** - Unstyled, accessible UI components
- **React Router** - Client-side routing
- **ESLint** - Code linting and formatting
- **Professional Structure** - Well-organized folder architecture

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card, etc.)
│   ├── layout/         # Layout components (Header, Footer, Layout)
│   └── forms/          # Form components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── contexts/           # React contexts
├── services/           # API services
└── assets/             # Static assets (images, icons)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The project includes a custom design system built on top of Tailwind CSS:

- **Colors**: Primary and secondary color palettes
- **Typography**: Inter font family with proper hierarchy
- **Components**: Reusable UI components with consistent styling
- **Animations**: Custom animations and transitions

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { Button } from '@components/ui'
import { useLocalStorage } from '@hooks'
import { cn } from '@utils'
```

### Environment Variables

Copy `env.example` to `.env` and configure your environment variables:

```bash
cp env.example .env
```

## 📚 Custom Hooks

The project includes several useful custom hooks:

- `useLocalStorage` - Manage localStorage with React state
- `useDebounce` - Debounce values for performance
- `useClickOutside` - Detect clicks outside components
- `useAsync` - Handle async operations

## 🧩 Components

### UI Components

- **Button** - Versatile button component with variants
- **Input** - Form input with validation support
- **Card** - Content container with header, content, and footer
- **Modal** - Accessible modal dialog

### Layout Components

- **Header** - Navigation header with responsive design
- **Footer** - Site footer with links and information
- **Layout** - Main layout wrapper

## 🎯 Best Practices

This project follows React and TypeScript best practices:

- **Type Safety** - Comprehensive TypeScript coverage
- **Component Composition** - Reusable, composable components
- **Custom Hooks** - Logic separation and reusability
- **Path Aliases** - Clean import statements
- **ESLint Configuration** - Consistent code style
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
