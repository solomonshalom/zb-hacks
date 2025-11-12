export type TParticipation = {
  id?: string;
  is_reviewed: boolean;
  is_winner: boolean;
  title: string;
  description: string;
  project_url: string;
  launch_post_url?: string;
  video_url?: string;
  joining_type: "in-person" | "remote";
  hackathon_url: string;
  hackathon_name: string;
};
