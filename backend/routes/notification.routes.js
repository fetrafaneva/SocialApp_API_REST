import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", authMiddleware, getMyNotifications);
router.patch("/:id/read", authMiddleware, markNotificationAsRead);

export default router;
