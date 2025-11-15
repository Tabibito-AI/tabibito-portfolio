import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getMessages, getMessageCount, markMessageAsRead, deleteMessage } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  messages: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
      .query(async ({ ctx, input }) => {
        // Only owner can access messages
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only owner can access messages' });
        }
        const msgs = await getMessages(input.limit, input.offset);
        const total = await getMessageCount();
        return { messages: msgs, total };
      }),
    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Only owner can mark messages as read
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only owner can modify messages' });
        }
        await markMessageAsRead(input.id);
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Only owner can delete messages
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only owner can delete messages' });
        }
        await deleteMessage(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
