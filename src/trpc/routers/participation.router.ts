import { newParticipationSchema } from "@/schema/participation";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "..";

export const participationRouter = createTRPCRouter({
  //------
  // Get all participations =>
  allParticipations: publicProcedure.query(async ({ ctx }) => {
    const snap = await ctx.db
      .collection("participations")
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map((doc: any) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        title: data.title,
        oneLiner: data.oneLiner,
        link: data.link,
        results: data.results,
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
      const docRef = await ctx.db.collection("participations").add({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const doc = await docRef.get();
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        title: data.title,
        oneLiner: data.oneLiner,
        link: data.link,
        results: data.results,
        createdAt: data?.createdAt?.toDate?.() || new Date(),
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      };
    }),
  //------
});
