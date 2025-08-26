import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Add manga to user's library
export const addToLibrary = mutation({
  args: {
    mangaId: v.string(),
    chapter: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject as Id<"users">;
    
    // Check if already in library
    const existing = await ctx.db
      .query("userLibrary")
      .withIndex("by_userId_mangaId", (q) => 
        q.eq("userId", userId).eq("mangaId", args.mangaId)
      )
      .first();

    if (existing) {
      // Update existing entry
      return await ctx.db.patch(existing._id, {
        lastRead: Date.now(),
        chapter: args.chapter,
      });
    } else {
      // Add new entry
      return await ctx.db.insert("userLibrary", {
        userId,
        mangaId: args.mangaId,
        addedAt: Date.now(),
        lastRead: Date.now(),
        chapter: args.chapter,
      });
    }
  },
});

// Remove manga from user's library
export const removeFromLibrary = mutation({
  args: {
    mangaId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject as Id<"users">;
    
    const existing = await ctx.db
      .query("userLibrary")
      .withIndex("by_userId_mangaId", (q) => 
        q.eq("userId", userId).eq("mangaId", args.mangaId)
      )
      .first();

    if (existing) {
      return await ctx.db.delete(existing._id);
    }
  },
});

// Get user's library
export const getUserLibrary = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const userId = identity.subject as Id<"users">;
    
    return await ctx.db
      .query("userLibrary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// Check if manga is in user's library
export const isInLibrary = query({
  args: {
    mangaId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }

    const userId = identity.subject as Id<"users">;
    
    const existing = await ctx.db
      .query("userLibrary")
      .withIndex("by_userId_mangaId", (q) => 
        q.eq("userId", userId).eq("mangaId", args.mangaId)
      )
      .first();

    return !!existing;
  },
});
