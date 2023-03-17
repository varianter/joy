import { redirect } from "@remix-run/node";
import { getSession } from "./session.server";

export async function requireUserSession(request: any) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);


  if (!session.data.user) {
    throw redirect("/");
  }

  return session;
}
