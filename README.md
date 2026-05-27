# react-navbar-components

An all-in-one collection of modern, responsive, and highly customizable React navigation bars. Whether you need minimal, glassmorphism, dark-mode ready, or complex mega menus, find the perfect navbar for any project here.

## 🚀 Features Included

This repository comes pre-packaged with **three premium navigation bar designs** built using React, TypeScript, Tailwind CSS, and Framer Motion:

1. **🕊️ Minimalist & Clean**
   - Typography-focused design with elegant whitespace.
   - Smooth active link indicator (sliding underline) powered by Framer Motion.
   - Clean, lightweight dropdown submenus.
   - Fully responsive slide-out mobile drawer.

2. **🧪 Glassmorphism (Floating Capsule)**
   - Beautiful floating layout with `backdrop-filter: blur()`.
   - Semi-transparent borders (`border-white/20`) and custom gradients.
   - Dynamic sliding background hover pill tracking active/hovered items.
   - Fully interactive dropdown submenus.

3. **🌌 Dark Mode Premium**
   - Deep zinc/black premium backdrop.
   - Bottom linear-gradient glowing accent line.
   - Pulsing neon indicator dot tracking hover items.
   - Double-gradient bordered call-to-action buttons.

---

## 🛠️ Tech Stack
- **Framework**: React 18+ (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Get Started

### 1. Installation
Clone the repository:
```bash
git clone https://github.com/ShanikaHerath/react-navbar-components.git
cd react-navbar-components
```

Install the dependencies:
```bash
npm install
```

### 2. Run the Interactive Showroom
We've included a stunning interactive showroom where you can preview the different navbars, customize their props in real-time, test mobile responsiveness, and inspect code copy-paste snippets.

Start the development server:
```bash
npm run dev
```

### 3. Usage & Integration
Copy your desired component from `src/components/` and the typings contract from `src/types/navbar.ts` into your project. Configure it by passing the corresponding props:

```tsx
import { MinimalistNavbar } from './components/MinimalistNavbar';
import type { NavLink, NavCTA } from './types/navbar';

const links: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', badge: 'New' }
];

const cta: NavCTA = {
  label: 'Sign Up',
  href: '/signup'
};

export default function App() {
  return (
    <MinimalistNavbar 
      logo="BRAND" 
      links={links} 
      cta={cta} 
    />
  );
}
```
