import { MicrosoftProfile, MicrosoftStrategy } from "remix-auth-microsoft";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

export interface User {
  profile: MicrosoftProfile;
}

export let authenticator = new Authenticator<User>(sessionStorage);

let microsoftStrategy = new MicrosoftStrategy(
  {
    clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
    redirectUri: "/auth/microsoft/callback",
    tenantId: process.env.MICROSOFT_TENANT_ID,
    scope: "openid profile",
    prompt: "login",
  },
  async ({ profile }) => {
    return { profile };
  }
);

authenticator.use(microsoftStrategy);
