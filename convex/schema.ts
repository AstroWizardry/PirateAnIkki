import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  comments: defineTable({
    author: v.string(),
    content: v.string(),
  }),
  // User profiles with roles
  userProfiles: defineTable({
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("admin")),
    displayName: v.optional(v.string()),
    avatar: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_role", ["role"]),
  
  // Protected: User's library
  userLibrary: defineTable({
    userId: v.id("users"),
    mangaId: v.string(),
    addedAt: v.number(),
    lastRead: v.optional(v.number()),
    chapter: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_mangaId", ["userId", "mangaId"]),
  
  // Protected: User's favorites
  userFavorites: defineTable({
    userId: v.id("users"),
    mangaId: v.string(),
    addedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_mangaId", ["userId", "mangaId"]),
});
