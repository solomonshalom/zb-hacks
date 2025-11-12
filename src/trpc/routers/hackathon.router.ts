import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "..";

// Schemas:
import {
  newHackathonSchema,
  updateHackathonSchema,
} from "@/schema/hackathon";

export const hackathonRouter = createTRPCRouter({
  //------
  // Get all hackathons by user =>
  allHackathons: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.uid) {
      return { hackathon: [], participants: [] };
    }

    const hackathonSnap = await ctx.db
      .collection("hackathons")
      .where("creatorId", "==", ctx.user.uid)
      .get();

    const participantsSnap = await ctx.db
      .collection("participations")
      .where("creatorId", "==", ctx.user.uid)
      .get();

    const hackathon = hackathonSnap.docs.map((doc: any) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        url: data.url,
        description: data.description,
        creatorId: data.creatorId,
        is_finished: data.is_finished,
        verified: data.verified,
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      };
    });

    const participants = participantsSnap.docs.map((doc: any) => {
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

    return {
      hackathon,
      participants,
    };
  }),
  //------
  // Create new hackathon =>
  createHackathon: publicProcedure
    .input(newHackathonSchema)
    .mutation(async ({ ctx, input }) => {
      const docRef = await ctx.db.collection("hackathons").add({
        ...input,
        creatorId: ctx.user?.uid,
        updatedAt: new Date(),
        is_finished: false,
        verified: false,
      });

      const doc = await docRef.get();
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        url: data.url,
        description: data.description,
        creatorId: data.creatorId,
        is_finished: data.is_finished,
        verified: data.verified,
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      };
    }),
  //------
  // Edit hackathon =>
  editHackathon: publicProcedure
    .input(updateHackathonSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db
        .collection("hackathons")
        .doc(id)
        .update({
          ...data,
          updatedAt: new Date(),
        });

      const doc = await ctx.db.collection("hackathons").doc(id).get();
      const docData = doc.data() as any;
      return {
        id: doc.id,
        name: docData.name,
        url: docData.url,
        description: docData.description,
        creatorId: docData.creatorId,
        is_finished: docData.is_finished,
        verified: docData.verified,
        updatedAt: docData?.updatedAt?.toDate?.() || new Date(),
      };
    }),
  //------
  // Delete hackathon =>
  deleteHackathon: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.collection("hackathons").doc(input.id).delete();
      return { success: true };
    }),
  //------
  // Single hackathon with participants =>
  singleHackathonWithParticipants: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ ctx, input }) => {
      const hackathonSnap = await ctx.db
        .collection("hackathons")
        .where("url", "==", input.url)
        .where("creatorId", "==", ctx.user?.uid)
        .limit(1)
        .get();

      const participantsSnap = await ctx.db
        .collection("participations")
        .where("hackathon_url", "==", input.url)
        .get();

      const hackathon = hackathonSnap.empty
        ? null
        : (() => {
            const data = hackathonSnap.docs[0].data() as any;
            return {
              id: hackathonSnap.docs[0].id,
              name: data.name,
              url: data.url,
              description: data.description,
              creatorId: data.creatorId,
              is_finished: data.is_finished,
              verified: data.verified,
              updatedAt: data.updatedAt?.toDate?.() || new Date(),
            };
          })();

      const participants = participantsSnap.docs.map((doc: any) => {
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

      return {
        hackathon,
        participants,
      };
    }),
  //------
  // Get a single hackathon by URL without creatorid & check if user is a participant =>
  singleHackathon: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ ctx, input }) => {
      const hackathonSnap = await ctx.db
        .collection("hackathons")
        .where("url", "==", input.url)
        .limit(1)
        .get();

      const participantsSnap = await ctx.db
        .collection("participations")
        .where("hackathon_url", "==", input.url)
        .where("creatorId", "==", ctx.user?.uid || "__no_user__")
        .get();

      const hackathon = hackathonSnap.empty
        ? null
        : (() => {
            const data = hackathonSnap.docs[0].data() as any;
            return {
              id: hackathonSnap.docs[0].id,
              name: data.name,
              url: data.url,
              description: data.description,
              creatorId: data.creatorId,
              is_finished: data.is_finished,
              verified: data.verified,
              updatedAt: data.updatedAt?.toDate?.() || new Date(),
            };
          })();

      const participants = participantsSnap.docs.map((doc: any) => {
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

      return {
        hackathon,
        participants,
      };
    }),
  //------
  // Finish hackathon =>
  finishHackathon: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hackathonSnap = await ctx.db
        .collection("hackathons")
        .where("url", "==", input.url)
        .where("creatorId", "==", ctx.user?.uid)
        .limit(1)
        .get();

      if (hackathonSnap.empty) {
        throw new Error("Hackathon not found");
      }

      const docRef = hackathonSnap.docs[0].ref;
      await docRef.update({
        is_finished: true,
        updatedAt: new Date(),
      });

      const doc = await docRef.get();
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        url: data.url,
        description: data.description,
        creatorId: data.creatorId,
        is_finished: data.is_finished,
        verified: data.verified,
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      };
    }),
});
