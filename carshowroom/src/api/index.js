/**
 * API wrapper for frontend communication with backend
 * All API calls are routed through this module for easy maintenance and error handling
 */

const API_BASE = "http://localhost:5000/api";

/**
 * Generic fetch wrapper with error handling
 */
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`❌ API Error (${endpoint}):`, error.message);
    throw error;
  }
}

/**
 * POST /api/feedback
 * Submit contact form feedback
 */
export async function postFeedback(feedbackData) {
  return apiCall("/feedback", {
    method: "POST",
    body: JSON.stringify(feedbackData),
  });
}

/**
 * GET /api/feedback
 * Retrieve all feedback (admin use)
 */
export async function getFeedback() {
  return apiCall("/feedback", {
    method: "GET",
  });
}

/**
 * POST /api/testdrive
 * Submit test drive request
 */
export async function postTestDrive(testDriveData) {
  return apiCall("/testdrive", {
    method: "POST",
    body: JSON.stringify(testDriveData),
  });
}

/**
 * GET /api/testdrive
 * Retrieve all test drive requests (admin use)
 */
export async function getTestDrive() {
  return apiCall("/testdrive", {
    method: "GET",
  });
}

/**
 * GET /api/testdrive/:id
 * Retrieve a specific test drive request
 */
export async function getTestDriveById(id) {
  return apiCall(`/testdrive/${id}`, {
    method: "GET",
  });
}

/**
 * PUT /api/testdrive/:id
 * Update test drive status
 */
export async function updateTestDriveStatus(id, status) {
  return apiCall(`/testdrive/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}
