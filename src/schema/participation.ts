import { z } from "zod";

// -----------------------------------------------

// Participation schema:

export const participationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  title: z.string(),
  oneLiner: z.string(),
  link: z.string().url(),
  results: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type participation = z.TypeOf<typeof participationSchema>;

// -----------------------------------------------

// Create new participation:

export const newParticipationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  title: z.string().min(1, "Title is required").max(100),
  oneLiner: z.string().min(1, "One liner is required").max(100),
  link: z.string().url("Valid URL is required"),
  results: z.string().min(1, "Results description is required"),
});

export type newParticipation = z.TypeOf<typeof newParticipationSchema>;

// -----------------------------------------------
