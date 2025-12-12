# Lumina Task Manager

[![Deploy to Cloudflare]([cloudflarebutton])]([cloudflarebutton])

A stunningly beautiful, minimalist task management application designed to bring clarity and calm to productivity. Lumina features generous whitespace, subtle motion design, and a focus on 'one thing at a time' with drag-and-drop organization, fluid animations, and a distraction-free focus mode.

## ✨ Key Features

- **Smart Task Creation**: Natural language input that parses dates and priorities automatically.
- **Fluid Organization**: Drag-and-drop reordering with full keyboard accessibility.
- **Visual Progress**: Circular progress rings and daily streak tracking.
- **Contextual Categorization**: Tags and categories with soft pastel color coding.
- **Focus Mode**: Distraction-free overlay for the active task with timer and notes.
- **Zen UI**: Glassmorphic elements, smooth micro-interactions, and responsive design.
- **Local Persistence**: Instant saves via localStorage with Zustand state management.
- **Edge-Optimized**: Built for Cloudflare Workers with lightning-fast performance.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS 3, Framer Motion (animations)
- **State**: Zustand (with persistence)
- **Drag & Drop**: @dnd-kit/core & @dnd-kit/sortable
- **Icons**: Lucide React
- **Utilities**: date-fns, clsx, tailwind-merge
- **Deployment**: Cloudflare Workers & Pages
- **Other**: React Router, TanStack Query, Sonner (toasts), Zod (validation)

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd lumina-task-manager
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💻 Usage

- **Dashboard**: View today's tasks, add new ones via the quick input, drag to reorder.
- **Task Actions**: Check to complete, hover for edit/delete, click for Focus Mode.
- **Navigation**: Sidebar for Today/Upcoming/Completed views (collapsible on mobile).
- **Focus Mode**: Select a task to enter full-screen mode with blurred background.

All data persists locally. No backend required for core functionality.

## 🔧 Development

- **Linting**: `bun run lint`
- **Build for Production**: `bun run build`
- **Preview Build**: `bun run preview`
- **Type Generation**: `bun run cf-typegen`

Hot reload enabled during development. Edit `src/pages/HomePage.tsx` for the main dashboard.

### Project Structure

```
src/
├── components/     # UI components (shadcn/ui + custom)
├── pages/          # Route components (HomePage.tsx = Dashboard)
├── hooks/          # Custom React hooks
├── lib/            # Utilities & error reporting
└── main.tsx        # App entry & routing
```

## ☁️ Deployment

Deploy to Cloudflare Workers/Pages with one command:

```bash
bun run deploy
```

This builds the app and deploys via Wrangler. Your app will be live at `https://<project-name>.workers.dev`.

For custom domains or advanced config, edit `wrangler.jsonc`.

[![Deploy to Cloudflare]([cloudflarebutton])]([cloudflarebutton])

## 🤝 Contributing

1. Fork the project.
2. Create a feature branch (`bun run dev`).
3. Commit changes (`bun run lint`).
4. Open a Pull Request.

Follow the UI non-negotiables: Tailwind v3-safe classes, shadcn/ui primitives, responsive excellence.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare by the Lumina Team.