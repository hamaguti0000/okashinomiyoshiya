"use server";

import { clearAdminSession } from "./admin-auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
