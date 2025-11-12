import {
  newParticipationSchema,
  updateParticipationSchema,
} from "@/schema/participation";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "..";

export const participationRouter = createTRPCRouter({
  //------
  // Get all participations by user =>
  allParticipations: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.uid) {
      return [];
    }

    const snap = await ctx.db
      .collection("participations")
      .where("creatorId", "==", ctx.user.uid)
      .get();

    return snap.docs.map((doc: any) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        is_reviewed: data.is_reviewed,
        is_winner: data.is_winner,
        title: data.title,
        description: data.description,
        project_url: data.project_url,
        launch_post_url: data.launch_post_url,
        video_url: data.video_url,
        joining_type: data.joining_type,
        hackathon_name: data.hackathon_name,
        hackathon_url: data.hackathon_url,
        creatorId: data.creatorId,
        creatorName: data.creatorName,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      };
    });
  }),
  //------
  // Get participation by hackathon_id =>
  participationByHackathonId: publicProcedure
    .input(z.object({ hackathonUrl: z.string() }))
    .query(async ({ ctx, input }) => {
      const snap = await ctx.db
        .collection("participations")
        .where("hackathon_url", "==", input.hackathonUrl)
        .get();

      return snap.docs.map((doc: any) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          is_reviewed: data.is_reviewed,
          is_winner: data.is_winner,
          title: data.title,
          description: data.description,
          project_url: data.project_url,
          launch_post_url: data.launch_post_url,
          video_url: data.video_url,
          joining_type: data.joining_type,
          hackathon_name: data.hackathon_name,
          hackathon_url: data.hackathon_url,
          creatorId: data.creatorId,
          creatorName: data.creatorName,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        };
      });
    }),
  //------
  // Create participation =>
  createParticipation: publicProcedure
    .input(newParticipationSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) {
        throw new Error("Unauthorized");
      }

      const docRef = await ctx.db.collection("participations").add({
        ...input,
        creatorId: user.uid,
        creatorName: user.name || user.email || "Anonymous",
        createdAt: new Date(),
        updatedAt: new Date(),
        is_reviewed: false,
        is_winner: false,
      });

      const doc = await docRef.get();
      const data = doc.data() as any;
      return {
        id: doc.id,
        is_reviewed: data.is_reviewed,
        is_winner: data.is_winner,
        title: data.title,
        description: data.description,
        project_url: data.project_url,
        launch_post_url: data.launch_post_url,
        video_url: data.video_url,
        joining_type: data.joining_type,
        hackathon_name: data.hackathon_name,
        hackathon_url: data.hackathon_url,
        creatorId: data.creatorId,
        creatorName: data.creatorName,
        createdAt: data?.createdAt?.toDate?.() || new Date(),
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      };
    }),
  //------
  // Update participation =>
  updateParticipation: publicProcedure
    .input(updateParticipationSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db
        .collection("participations")
        .doc(id)
        .update({
          ...data,
          updatedAt: new Date(),
        });

      const doc = await ctx.db.collection("participations").doc(id).get();
      const docData = doc.data() as any;
      return {
        id: doc.id,
        is_reviewed: docData.is_reviewed,
        is_winner: docData.is_winner,
        title: docData.title,
        description: docData.description,
        project_url: docData.project_url,
        launch_post_url: docData.launch_post_url,
        video_url: docData.video_url,
        joining_type: docData.joining_type,
        hackathon_name: docData.hackathon_name,
        hackathon_url: docData.hackathon_url,
        creatorId: docData.creatorId,
        creatorName: docData.creatorName,
        createdAt: docData?.createdAt?.toDate?.() || new Date(),
        updatedAt: docData?.updatedAt?.toDate?.() || new Date(),
      };
    }),
  //------
});
