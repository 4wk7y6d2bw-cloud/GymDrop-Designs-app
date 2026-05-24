const express = require("express");

const router = express.Router();

router.get("/healthz", (_req: any, res: any) => {
  res.json({
    status: "ok",
  });
});

export default router;