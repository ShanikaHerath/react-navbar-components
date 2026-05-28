# react-navbar-components

An all-in-one collection of modern, responsive, and highly customizable React navigation bars. Whether you need minimal, glassmorphism, dark-mode, neon cyberpunk, aurora gradient, retro vintage, or brutalist — find the perfect navbar for any project here.

## 🚀 Features Included

This repository comes pre-packaged with **seven premium navigation bar designs** built using React, TypeScript, Tailwind CSS, and Framer Motion:

1. **🕊️ Minimalist & Clean** — [`MinimalistNavbar`](./src/components/MinimalistNavbar.tsx)
   - Typography-focused design with elegant whitespace.
   - Smooth active link indicator (sliding underline) powered by Framer Motion.
   - Clean, lightweight dropdown submenus.
   - Fully responsive slide-out mobile drawer.

2. **🧪 Glassmorphism (Floating Capsule)** — [`GlassmorphismNavbar`](./src/components/GlassmorphismNavbar.tsx)
   - Beautiful floating layout with `backdrop-filter: blur()`.
   - Semi-transparent borders (`border-white/20`) and custom gradients.
   - Dynamic sliding background hover pill tracking active/hovered items.
   - Fully interactive dropdown submenus.

3. **🌌 Dark Mode Premium** — [`DarkModePremiumNavbar`](./src/components/DarkModePremiumNavbar.tsx)
   - Deep zinc/black premium backdrop.
   - Bottom linear-gradient glowing accent line.
   - Pulsing neon indicator dot tracking hover items.
   - Double-gradient bordered call-to-action buttons.

4. **⚡ Neon Cyberpunk** — [`NeonCyberpunkNavbar`](./src/components/NeonCyberpunkNavbar.tsx)
   - Pure black background with scanline texture overlay.
   - Neon cyan glowing borders, text shadows, and underline indicator.
   - Fuchsia/hot-pink badge accents with glow effects.
   - Sharp-cornered dropdowns with subtle cyan box-shadows.
   - Mobile slide-in drawer from the right with neon title.

5. **🌅 Aurora Gradient** — [`AuroraNavbar`](./src/components/AuroraNavbar.tsx)
   - Flowing multi-stop gradient (purple → blue → teal) that shifts on scroll.
   - Animated shimmer top stripe cycling through aurora colors.
   - Compresses to a near-opaque dark background once user scrolls.
   - Glassy gradient dropdowns matching the aurora palette.
   - White pill CTA button for high contrast against the gradient.

6. **📜 Retro Vintage** — [`RetroNavbar`](./src/components/RetroNavbar.tsx)
   - Warm cream (`#faf7f0`) background with serif (`Georgia`) typography.
   - Earthy brown accents (`#8b7355`) throughout.
   - `3px double` border rule and hatch-stripe decorative top strip.
   - Offset box-shadow dropdowns for a retro print-era feel.
   - Left slide-in mobile drawer with classic styling.

7. **🔲 Brutalist** — [`BrutalistNavbar`](./src/components/BrutalistNavbar.tsx)
   - High-contrast vivid yellow (`#f5f500`) and pure black.
   - Bold `Arial Black`/`Impact` typography with raw uppercase labels.
   - Thick `4px` border rules and offset box-shadows on all interactive elements.
   - Invert-on-hover nav links (black bg / yellow text).
   - Mobile menu drops from the top with heavy dividers.

---

## 🛠️ Tech Stack

| Tool | Version |
|---|---|
| **Framework** | React 18+ (Vite) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v3 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MinimalistNavbar.tsx
│   ├── GlassmorphismNavbar.tsx
│   ├── DarkModePremiumNavbar.tsx
│   ├── NeonCyberpunkNavbar.tsx
│   ├── AuroraNavbar.tsx
│   ├── RetroNavbar.tsx
│   └── BrutalistNavbar.tsx
├── types/
│   └── navbar.ts          # Shared TypeScript interfaces
└── App.tsx                # Interactive showroom
```

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

We've included a stunning interactive showroom where you can:
- Preview all 7 navbar styles in real-time
- Customize logo text and CTA label via live props editor
- Toggle menu badges and nested dropdown submenus on/off
- Simulate desktop and mobile viewport layouts

Start the development server:
```bash
npm run dev
```

### 3. Usage & Integration

Copy your desired component from `src/components/` and the typings contract from `src/types/navbar.ts` into your project. Configure it by passing the corresponding props:

```tsx
import { NeonCyberpunkNavbar } from './components/NeonCyberpunkNavbar';
import type { NavLink, NavCTA } from './types/navbar';

const links: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    badge: 'New',
    dropdownItems: [
      { label: 'Platform', href: '/platform', description: 'Core infrastructure.' },
    ],
  },
];

const cta: NavCTA = {
  label: 'Get Started',
  href: '/signup',
};

export default function App() {
  return (
    <NeonCyberpunkNavbar
      logo="BRAND"
      links={links}
      cta={cta}
    />
  );
}
```

### 4. Shared Props API

All seven navbars accept the same `NavbarProps` interface:

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `ReactNode \| string` | — | Logo content or brand text string |
| `logoHref` | `string` | `'#'` | URL the logo links to |
| `links` | `NavLink[]` | — | Array of nav link objects |
| `cta` | `NavCTA` | — | Optional call-to-action button config |
| `className` | `string` | `''` | Extra CSS classes on the root element |
| `onCtaClick` | `() => void` | — | Optional CTA click handler |

#### `NavLink`
```ts
interface NavLink {
  label: string;
  href: string;
  badge?: string;                // Optional pill badge label
  dropdownItems?: DropdownItem[];
}
```

#### `DropdownItem`
```ts
interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}
```

---

## 📄 License

MIT — free to use in personal and commercial projects.
