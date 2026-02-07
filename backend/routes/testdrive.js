const express = require("express");
const router = express.Router();
const TestDrive = require("../models/TestDrive");
const { sendMail } = require("../utils/email");

/**
 * POST /api/testdrive
 * Create a new test drive request and send confirmation email
 * Request body: { name, email, phone, carModel, preferredDate?, notes? }
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, carModel, preferredDate, notes } = req.body;

    // Validation
    if (!name || !email || !phone || !carModel) {
      return res.status(400).json({
        message: "Name, email, phone, and car model are required",
      });
    }

    // Create test drive request
    const testDrive = await TestDrive.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      carModel: carModel.trim(),
      preferredDate: preferredDate || null,
      notes: notes?.trim() || null,
      status: "pending",
    });

    // Send confirmation email to applicant
    const emailSubject = "AUTOX — Test Drive Request Received";
    const emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a1a1a;">Hi ${name},</h2>
            
            <p>Thank you for requesting a test drive for the <strong>${carModel}</strong> at AUTOX.</p>
            
            <p>We've received your request on <strong>${new Date(testDrive.createdAt).toLocaleDateString()}</strong>.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1a1a1a;">Request Summary:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Car Model:</strong> ${carModel}</p>
              ${preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>` : ""}
              ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ""}
            </div>
            
            <p>Our team will contact you at <strong>${email}</strong> or <strong>${phone}</strong> within 24 hours to arrange the test drive details.</p>
            
            <p>If you have any immediate questions, feel free to reach out to us:</p>
            <p>
              📞 <strong>+91 98765 43210</strong><br>
              ✉️ <strong>info@autox.com</strong>
            </p>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>AUTOX Team</strong><br>
              Luxury Pre-Owned Cars
            </p>
          </div>
        </body>
      </html>
    `;

    try {
      await sendMail(email, emailSubject, emailHtml);
      console.log(`✅ Confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error("⚠️ Email failed but request saved:", emailError.message);
      // Continue even if email fails - request is still saved
    }

    // Optionally send notification to admin
    if (process.env.ADMIN_EMAIL) {
      const adminSubject = `AUTOX — New Test Drive Request: ${carModel}`;
      const adminHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Test Drive Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Car Model:</strong> ${carModel}</p>
            ${preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>` : ""}
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
            <p><strong>Status:</strong> ${testDrive.status}</p>
            <p><a href="http://localhost:5000/api/testdrive/${testDrive.id}">View in Admin Panel</a></p>
          </body>
        </html>
      `;

      try {
        await sendMail(process.env.ADMIN_EMAIL, adminSubject, adminHtml);
      } catch (adminEmailError) {
        console.error("⚠️ Admin notification email failed:", adminEmailError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Test drive request submitted! Confirmation email sent.",
      data: testDrive,
    });
  } catch (error) {
    console.error("❌ Test drive creation error:", error.message);
    res.status(500).json({
      message: "Error submitting test drive request",
      error: error.message,
    });
  }
});

/**
 * GET /api/testdrive
 * Retrieve all test drive requests (for admin use)
 */
router.get("/", async (req, res) => {
  try {
    const testDrives = await TestDrive.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: testDrives.length,
      data: testDrives,
    });
  } catch (error) {
    console.error("❌ Test drive retrieval error:", error.message);
    res.status(500).json({
      message: "Error retrieving test drive requests",
      error: error.message,
    });
  }
});

/**
 * GET /api/testdrive/:id
 * Retrieve a specific test drive request by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const testDrive = await TestDrive.findByPk(id);

    if (!testDrive) {
      return res.status(404).json({
        message: "Test drive request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: testDrive,
    });
  } catch (error) {
    console.error("❌ Test drive retrieval error:", error.message);
    res.status(500).json({
      message: "Error retrieving test drive request",
      error: error.message,
    });
  }
});

/**
 * PUT /api/testdrive/:id
 * Update test drive request status (for admin use)
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be: pending, confirmed, completed, or cancelled",
      });
    }

    const testDrive = await TestDrive.findByPk(id);
    if (!testDrive) {
      return res.status(404).json({
        message: "Test drive request not found",
      });
    }

    await testDrive.update({ status });

    res.status(200).json({
      success: true,
      message: "Test drive status updated",
      data: testDrive,
    });
  } catch (error) {
    console.error("❌ Test drive update error:", error.message);
    res.status(500).json({
      message: "Error updating test drive request",
      error: error.message,
    });
  }
});

module.exports = router;
