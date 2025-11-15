import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, messages, InsertMessage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Message queries
export async function saveMessage(message: InsertMessage): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save message: database not available");
    return;
  }

  try {
    await db.insert(messages).values(message);
  } catch (error) {
    console.error("[Database] Failed to save message:", error);
    throw error;
  }
}

export async function getMessages(limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get messages:", error);
    return [];
  }
}

export async function getMessageCount(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get message count: database not available");
    return 0;
  }

  try {
    const result = await db.select().from(messages);
    return result.length;
  } catch (error) {
    console.error("[Database] Failed to get message count:", error);
    return 0;
  }
}

export async function markMessageAsRead(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot mark message as read: database not available");
    return;
  }

  try {
    await db.update(messages).set({ read: 1 }).where(eq(messages.id, id));
  } catch (error) {
    console.error("[Database] Failed to mark message as read:", error);
    throw error;
  }
}

export async function deleteMessage(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete message: database not available");
    return;
  }

  try {
    await db.delete(messages).where(eq(messages.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete message:", error);
    throw error;
  }
}
