import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Add manga to user's favorites
export const addToFavorites = mutation({
  args: {
    mangaId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject as Id<"users">;
    
    // Check if already in favorites
    const existing = await ctx.db
      .query("userFavorites")
      .withIndex("by_userId_mangaId", (q) => 
        q.eq("userId", userId).eq("mangaId", args.mangaId)
      )
      .first();

    if (!existing) {
      // Add new entry
      return await ctx.db.insert("userFavorites", {
        userId,
        mangaId: args.mangaId,
        addedAt: Date.now(),
      });
    }
  },
});

// Remove manga from user's favorites
export const removeFromFavorites = mutation({
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
      .query("userFavorites")
      .withIndex("by_userId_mangaId", (q) => 
        q.eq("userId", userId).eq("mangaId", args.mangaId)
      )
      .first();

    if (existing) {
      return await ctx.db.delete(existing._id);
    }
  },
});

// Get user's favorites
export const getUserFavorites = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const userId = identity.subject as Id<"users">;
    
    return await ctx.db
      .query("userFavorites")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// Check if manga is in user's favorites
export const isInFavorites = query({
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
      .query("userFavorites")
      .withIndex("by_userId_mangaId", (q) => 
        q.eq("userId", userId).eq("mangaId", args.mangaId)
      )
      .first();

    return !!existing;
  },
});
