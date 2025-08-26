import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Create or update user profile
export const createUserProfile = mutation({
  args: {
    displayName: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject as Id<"users">;
    
    // Check if profile already exists
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingProfile) {
      // Update existing profile
      return await ctx.db.patch(existingProfile._id, {
        displayName: args.displayName,
        avatar: args.avatar,
      });
    } else {
      // Create new profile with default role "user"
      return await ctx.db.insert("userProfiles", {
        userId,
        role: "user",
        displayName: args.displayName,
        avatar: args.avatar,
      });
    }
  },
});

// Get current user profile
export const getCurrentUserProfile = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const userId = identity.subject as Id<"users">;
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

// Check if user is admin
export const isAdmin = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }

    const userId = identity.subject as Id<"users">;
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return profile?.role === "admin";
  },
});

// Promote user to admin (only admins can do this)
export const promoteToAdmin = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if current user is admin
    const currentUserProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject as Id<"users">))
      .first();

    if (currentUserProfile?.role !== "admin") {
      throw new Error("Only admins can promote users");
    }

    // Find the target user's profile
    const targetProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId as Id<"users">))
      .first();

    if (!targetProfile) {
      throw new Error("User profile not found");
    }

    // Promote to admin
    return await ctx.db.patch(targetProfile._id, {
      role: "admin",
    });
  },
});
