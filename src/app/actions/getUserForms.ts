"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { forms } from "@/db/schema";
import { auth } from "@/auth";

export async function getUserForms() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return [];
  }

  return db.query.forms.findMany({
    where: eq(forms.userId, currentUserId),
  });
}
