import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { postTestDrive } from "../api";

export default function TestDriveModal({ open, onClose, carModel = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: carModel,
    preferredDate: "",
    notes: "",
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

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.carModel) {
      setError("Please fill in all required fields (Name, Email, Phone, Car Model)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await postTestDrive({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        carModel: formData.carModel,
        preferredDate: formData.preferredDate || null,
        notes: formData.notes || null,
      });

      setSuccess(true);

      // Reset form after 2 seconds and close dialog after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          carModel: carModel,
          preferredDate: "",
          notes: "",
        });
        setSuccess(false);
      }, 2000);

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to submit test drive request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        carModel: carModel,
        preferredDate: "",
        notes: "",
      });
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>
        Request a Test Drive
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Test drive request submitted! Check your email for confirmation.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            disabled={loading || success}
            required
          />

          <TextField
            label="Email Address *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            disabled={loading || success}
            required
          />

          <TextField
            label="Phone Number *"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            disabled={loading || success}
            required
          />

          <TextField
            label="Car Model *"
            name="carModel"
            value={formData.carModel}
            onChange={handleInputChange}
            fullWidth
            disabled={loading || success}
            required
          />

          <TextField
            label="Preferred Date"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleInputChange}
            fullWidth
            disabled={loading || success}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Additional Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            disabled={loading || success}
            placeholder="Any special requests or questions?"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} disabled={loading || success}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || success}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            "&:hover": {
              backgroundColor: "#ddd",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
              color: "#666",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
