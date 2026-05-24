import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { LoginBody, LoginResponse, GetAuthStatusResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [admin] = await db
    .select()
    .from(adminsTable)
    .where(eq(adminsTable.username, parsed.data.username));

  if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  (req.session as any).adminId = admin.id;
  (req.session as any).username = admin.username;

  res.json(LoginResponse.parse({ authenticated: true, username: admin.username }));
});

router.post("/auth/logout", (req, res): void => {
  req.session.destroy((err) => {
    if (err) {
      (req as any).log?.error(err, "Error destroying session");
      res.status(500).json({ error: "Failed to logout" });
      return;
    }
    res.sendStatus(204);
  });
});

router.get("/auth/me", (req, res): void => {
  const adminId = (req.session as any).adminId;
  const username = (req.session as any).username;

  if (!adminId) {
    res.json(GetAuthStatusResponse.parse({ authenticated: false, username: null }));
    return;
  }

  res.json(GetAuthStatusResponse.parse({ authenticated: true, username }));
});

export default router;
