import type { ActionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action = ({ request }: ActionArgs) => {
  return authenticator.authenticate("microsoft", request);
};
