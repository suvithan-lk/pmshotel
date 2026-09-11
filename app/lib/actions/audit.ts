"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "../prisma";
import { roleLabel } from "../format";

export async function writeAudit(entry: {
  action: string;
  module: string;
  entity: string;
  oldValue?: string;
  newValue?: string;
  status?: "success" | "failed";
}) {
  const session = await getServerSession(authOptions);
  await prisma.auditLog.create({
    data: {
      userId: session?.user?.id,
      userName: session?.user?.name || "System",
      role: session?.user?.role ? roleLabel(session.user.role) : "System",
      action: entry.action,
      module: entry.module,
      entity: entry.entity,
      oldValue: entry.oldValue ?? null,
      newValue: entry.newValue ?? null,
      status: entry.status ?? "success",
    },
  });
}
