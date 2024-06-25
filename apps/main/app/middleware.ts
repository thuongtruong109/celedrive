import { LINK_SERVICE } from "@/shared";

export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/((?!register|api|login).*)"],
  matcher: [LINK_SERVICE.DRIVE_DASHBOARD, LINK_SERVICE.DRIVE_FAVORITES, LINK_SERVICE.DRIVE_TRASH],
};
