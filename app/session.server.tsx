import { createCookieSessionStorage } from "@remix-run/cloudflare";

export const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secrets: ["92837492q4kjas78d9ef78sdsdhfk"],
  },
});
