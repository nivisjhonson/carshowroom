const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

/**
 * POST /api/feedback
 * Create a new feedback/contact form submission
 * Request body: { name, email, phone?, message }
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    // Create feedback entry
    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your feedback has been received.",
      data: feedback,
    });
  } catch (error) {
    console.error("❌ Feedback creation error:", error.message);
    res.status(500).json({
      message: "Error submitting feedback",
      error: error.message,
    });
  }
});

/**
 * GET /api/feedback
 * Retrieve all feedback entries (for admin use)
 */
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("❌ Feedback retrieval error:", error.message);
    res.status(500).json({
      message: "Error retrieving feedback",
      error: error.message,
    });
  }
});

/**
 * GET /api/feedback/:id
 * Retrieve a specific feedback entry by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("❌ Feedback retrieval error:", error.message);
    res.status(500).json({
      message: "Error retrieving feedback",
      error: error.message,
    });
  }
});

module.exports = router;
