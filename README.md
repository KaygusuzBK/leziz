# Leziz | Recipe Sharing Platform

Welcome to Leziz, a modern and responsive recipe-sharing application built with Next.js, TypeScript, and Supabase. This platform allows users to discover, share, and manage recipes in a user-friendly environment.

## ✨ Features

- **User Authentication**: Secure sign-up and login with Supabase Auth.
- **Recipe Management**: Create, view, edit, and delete recipes.
- **Categorization**: Browse recipes by category.
- **User Profiles**: Manage your public profile information.
- **Social Features**: Follow other users and mark recipes as favorites.
- **Modern UI**: A clean and responsive interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend & DB**: [Supabase](https://supabase.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://your-repository-link.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up your environment variables by creating a `.env.local` file in the root and adding your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
4. Run the database setup script `supabase-setup.sql` in your Supabase project's SQL editor to create the required tables and policies.

5. Start the development server:
   ```sh
   npm run dev
   ```

## 💾 Database Schema

Here is an overview of the database structure:

![Database Schema](./public/assets/db_schema.png)