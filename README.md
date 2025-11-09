# CHARON - Business Website

A modern Next.js business website for CHARON - "Raise from users, manage on-chain"

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `ui/` - Reusable UI components (Button, etc.)
  - `shared/` - Shared components (AuthModal, etc.)
- `contexts/` - React contexts (AuthContext)
- `lib/` - Utility functions
- `public/` - Static assets (images, etc.)

## Features

- Modern landing page with gradient design
- Authentication modal (Login/Sign Up)
- Responsive design
- Tailwind CSS styling

## Notes

- Add your `charon_logo.png` image to `public/images/` directory
- Authentication is currently using mock data - implement actual authentication logic in `contexts/AuthContext.tsx`

