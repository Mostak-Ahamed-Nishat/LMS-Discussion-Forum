# 📚 LMS Discussion Forum (Frontend Assignment)

A **Next.js 15** + **TypeScript** + **TailwindCSS** project for an LMS Discussion Forum.  
The app uses **JSON Server** as a mock API, includes **zod validation** with `react-hook-form`, and supports a modern UI with **shadcn/ui** components and **TinyMCE** for rich text editing.

---

## 🚀 Features

- **Forum Pages**
  - View threads with sorting, search, filters, and pagination.
  - Create new threads with:
    - Title (min 10 chars)
    - Body (TinyMCE rich editor, min 20 chars of text)
    - Tags (up to 5, displayed as removable chips).
  - Upvote / downvote threads.
  - Comment & reply system (Facebook-style nested replies).

- **Left Sidebar**
  - Quick Filters
  - Popular Tags
  - Pinned Threads

- **Right Sidebar**
  - Upcoming Meetups
  - Course Resources / Announcements

- **Responsive Layout**
  - On small screens: shows only the thread feed with bottom navigation.

---

## 🛠 Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [lucide-react](https://lucide.dev/) (icons)
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) (form validation)
- [TinyMCE](https://www.tiny.cloud/) (rich-text editor)
- [json-server](https://github.com/typicode/json-server) (mock API)
- [date-fns](https://date-fns.org/) (date utilities)
- [framer-motion](https://www.framer.com/motion/) (animations)

---

## 📂 Project Structure
├── app/
│ └── courses/[courseId]/forum/ # Forum pages
│ ├── page.tsx # Forum index
│ └── new/page.tsx # Create new thread
├── components/
│ ├── forum/ # Forum-specific components
│ ├── left/ # Left sidebar components
│ ├── right/ # Right sidebar components
│ └── form/TagInput.tsx # Tags input component
├── lib/
│ ├── api/ # API helpers (threads, courses, users)
│ └── validations/thread.ts # zod schemas
├── mocks/
│ ├── db.json # Mock data
│ └── server.js # JSON Server setup
├── public/ # Static assets
├── tailwind.config.js
├── package.json
└── README.md



---

## ⚡ Getting Started

### 1. Install dependencies
```bash
npm install
```

Create: .env.local:

### Add TinyMCE API key AND BASE URL
NEXT_PUBLIC_API=http://localhost:4000
NEXT_PUBLIC_TINYMCE_API_KEY=*****************************

### Run Dev + Mock API together
```bash
npm run dev:all
```
OR
```bash
npm run dev
```
```bash
npm run mock
```
Frontend: http://localhost:3000
JSON Server: http://localhost:4000

### 📦 Build & Deploy
```bash
npm run build
npm start
```
