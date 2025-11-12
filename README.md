# Zerobase

The Fastest Way To Organize A Hackathon platform built with Next.js & Firebase.

## Tech Stack

- **Framework**: Next.js 13 (Pages Router) + TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (GitHub OAuth)
- **API**: tRPC v10 for end-to-end type-safe APIs
- **Styling**: Tailwind CSS + Radix UI primitives
- **Validation**: Zod schemas
- **Forms**: React Hook Form

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Authentication with GitHub provider
4. Create a service account and download the credentials
5. Copy `.env.example` to `.env` and fill in your Firebase credentials

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

See `.env.example` for required environment variables:

- Firebase Admin SDK credentials (server-side)
- Firebase Client SDK configuration (client-side)

## License

MIT
