import { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { postFeedback } from "../api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields (Name, Email, Message)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await postFeedback({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
      });

      setSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          px: { xs: 3, md: 10 },
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Contact Us
          </Typography>

          <Typography sx={{ maxWidth: 600, color: "#ddd", fontSize: 18 }}>
            Get in touch with our AUTOX experts for sales, service,
            or test drive enquiries.
          </Typography>
        </motion.div>
      </Box>

      {/* ================= CONTACT SECTION ================= */}
      <Box sx={{ py: 12, px: { xs: 3, md: 10 } }}>
        <Grid container spacing={6}>
          {/* CONTACT INFO */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" sx={{ mb: 3 }}>
                AUTOX Showroom
              </Typography>

              <Typography sx={{ color: "#bbb", mb: 2 }}>
                📍 12 Luxury Drive, Motor City, Chennai, India
              </Typography>
              <Typography sx={{ color: "#bbb", mb: 2 }}>
                📞 +91 98765 43210
              </Typography>
              <Typography sx={{ color: "#bbb", mb: 4 }}>
                ✉️ info@autox.com
              </Typography>

              <Typography sx={{ color: "#aaa", lineHeight: 1.7 }}>
                Visit our showroom to experience AutoX luxury cars,
                precision engineering, and world-class customer service.
              </Typography>
            </motion.div>
          </Grid>

          {/* CONTACT FORM */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  backgroundColor: "#000",
                  p: 4,
                  borderRadius: 3,
                }}
              >
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Send Us a Message
                </Typography>

                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    ✅ Thank you! Your message has been received. We'll be in touch soon.
                  </Alert>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="filled"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading || success}
                      InputProps={{ sx: { color: "#fff" } }}
                      InputLabelProps={{ sx: { color: "#aaa" } }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      variant="filled"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading || success}
                      InputProps={{ sx: { color: "#fff" } }}
                      InputLabelProps={{ sx: { color: "#aaa" } }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone (Optional)"
                      name="phone"
                      variant="filled"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading || success}
                      InputProps={{ sx: { color: "#fff" } }}
                      InputLabelProps={{ sx: { color: "#aaa" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      variant="filled"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={loading || success}
                      InputProps={{ sx: { color: "#fff" } }}
                      InputLabelProps={{ sx: { color: "#aaa" } }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={handleSubmit}
                      disabled={loading || success}
                      sx={{
                        px: 5,
                        py: 1.5,
                        color: "#fff",
                        borderColor: "#fff",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#000",
                        },
                        "&:disabled": {
                          borderColor: "#666",
                          color: "#666",
                        },
                      }}
                    >
                      {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* ================= MAP SECTION ================= */}
      <Box sx={{ px: { xs: 3, md: 10 }, pb: 12 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              width: "100%",
              height: 400,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <iframe
              title="AUTOX Location"
              src="https://www.google.com/maps?q=Chennai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
