# Firebase Migration Guide

This project has been migrated from CockroachDB (Prisma) + NextAuth to Firebase (Firestore + Auth).

## What Changed

### Database
- **Before**: Prisma + CockroachDB
- **After**: Firebase Firestore

### Authentication
- **Before**: NextAuth.js with GitHub OAuth
- **After**: Firebase Auth with GitHub OAuth

### tRPC Context
- **Before**: Session-based with Prisma client
- **After**: Firebase Auth token-based with Firestore client

## Setup Instructions

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication → GitHub provider

### 2. Get Firebase Credentials

#### Client SDK Config (Firebase Console → Project Settings)
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

#### Admin SDK Credentials (Project Settings → Service Accounts → Generate new private key)
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Firebase credentials.

### 4. Firestore Collections

The app uses two main collections:

#### hackathons
- id: string (auto-generated)
- name: string
- url: string (unique)
- description: string | null
- creatorId: string (Firebase UID)
- updatedAt: timestamp
- is_finished: boolean
- verified: boolean

#### participations
- id: string (auto-generated)
- is_reviewed: boolean
- is_winner: boolean
- title: string
- description: string
- project_url: string
- hackathon_name: string
- hackathon_url: string
- creatorId: string (Firebase UID)
- creatorName: string
- createdAt: timestamp
- updatedAt: timestamp

### 5. Firestore Indexes

You may need to create composite indexes for:
- `hackathons`: `url + creatorId`
- `participations`: `hackathon_url + creatorId`

Firebase will prompt you to create these when you first run queries that need them.

## Key Differences

### Authentication
- No more session tables - Firebase handles auth tokens
- User info comes from Firebase Auth (displayName, photoURL, email)
- Auth state managed by `useAuth()` hook instead of `useSession()`

### Database Queries
- Firestore uses `.collection()`, `.where()`, `.get()` instead of Prisma's query builder
- Date fields are Firestore Timestamps that need `.toDate()` conversion
- No automatic migrations - manage schema changes manually

### Middleware
- Simplified middleware - Firebase client SDK handles auth state on client
- Server-side auth verification via Firebase Admin SDK in tRPC context

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Note: Set `SKIP_ENV_VALIDATION=true` to build without Firebase credentials (for CI/CD).
