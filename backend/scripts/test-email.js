const { sendMail } = require("../utils/email");
(async () => {
  try {
    await sendMail("your.email@domain.com", "AUTOX Test", "<p>Test email</p>");
    console.log("Test email sent");
  } catch (e) {
    console.error("Test email failed:", e.message);
  }
})();