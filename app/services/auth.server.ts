import type { MicrosoftProfile } from "remix-auth-microsoft";
import { MicrosoftStrategy } from "remix-auth-microsoft";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import invariant from "tiny-invariant";

export interface User {
  profile: MicrosoftProfile;
}

invariant(process.env.MICROSOFT_CLIENT_ID, "MICROSOFT_CLIENT_ID must be set");
invariant(
  process.env.MICROSOFT_CLIENT_SECRET,
  "MICROSOFT_CLIENT_SECRET must be set"
);
invariant(process.env.MICROSOFT_TENANT_ID, "MICROSOFT_TENANT_ID must be set");

export let authenticator = new Authenticator<User>(sessionStorage);

let microsoftStrategy = new MicrosoftStrategy(
  {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
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
