import { Notification } from "../models/notification.model.js";

// ------------------ GET NOTIFICATION ------------------
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .populate("fromUser", "username")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ MARK NOTIFICATION AS READ ------------------
export const markNotificationAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
