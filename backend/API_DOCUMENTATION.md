# API Documentation - AUTOX Backend

## Base URL
```
http://localhost:5000/api
```

## Feedback API

### POST /feedback - Submit Contact Form
Submit a new feedback/contact form entry.

**Request:**
```bash
POST /api/feedback
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "I'm interested in your luxury cars."
}
```

**Required Fields:** `name`, `email`, `message`
**Optional Fields:** `phone`

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you! Your feedback has been received.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "message": "I'm interested...",
    "createdAt": "2025-02-07T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "message": "Name, email, and message are required",
  "error": "..."
}
```

---

### GET /feedback - List All Feedback
Retrieve all feedback entries (admin use).

**Request:**
```bash
GET /api/feedback
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "message": "I'm interested...",
      "createdAt": "2025-02-07T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": null,
      "message": "More info please...",
      "createdAt": "2025-02-07T10:45:00.000Z"
    }
  ]
}
```

---

### GET /feedback/:id - Get Specific Feedback
Retrieve a single feedback entry by ID.

**Request:**
```bash
GET /api/feedback/1
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "message": "I'm interested...",
    "createdAt": "2025-02-07T10:30:00.000Z"
  }
}
```

**Not Found Response (404):**
```json
{
  "message": "Feedback entry not found"
}
```

---

## Test Drive API

### POST /testdrive - Submit Test Drive Request
Submit a new test drive request and send confirmation email.

**Request:**
```bash
POST /api/testdrive
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 87654 32109",
  "carModel": "BMW 7 Series",
  "preferredDate": "2025-02-15",
  "notes": "Interested in automatic transmission."
}
```

**Required Fields:** `name`, `email`, `phone`, `carModel`
**Optional Fields:** `preferredDate`, `notes`

**Success Response (201):**
```json
{
  "success": true,
  "message": "Test drive request submitted! Confirmation email sent.",
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 87654 32109",
    "carModel": "BMW 7 Series",
    "preferredDate": "2025-02-15",
    "notes": "Interested in...",
    "status": "pending",
    "createdAt": "2025-02-07T11:00:00.000Z"
  }
}
```

**Automatic Actions:**
- ✅ Saves request to database with status `pending`
- ✅ Sends confirmation email to applicant
- ✅ Sends notification email to ADMIN_EMAIL (if configured)

**Confirmation Email Details:**
- **To:** Customer email
- **Subject:** AUTOX — Test Drive Request Received
- **Content:** Personalized greeting, request summary, and contact info

---

### GET /testdrive - List All Test Drive Requests
Retrieve all test drive requests (admin use).

**Request:**
```bash
GET /api/testdrive
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+91 87654 32109",
      "carModel": "BMW 7 Series",
      "preferredDate": "2025-02-15",
      "notes": "Interested in...",
      "status": "pending",
      "createdAt": "2025-02-07T11:00:00.000Z"
    }
  ]
}
```

---

### GET /testdrive/:id - Get Specific Test Drive Request
Retrieve a single test drive request by ID.

**Request:**
```bash
GET /api/testdrive/1
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 87654 32109",
    "carModel": "BMW 7 Series",
    "preferredDate": "2025-02-15",
    "notes": "Interested in...",
    "status": "pending",
    "createdAt": "2025-02-07T11:00:00.000Z"
  }
}
```

---

### PUT /testdrive/:id - Update Test Drive Status
Update the status of a test drive request (admin use).

**Request:**
```bash
PUT /api/testdrive/1
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending` - Initial state after submission
- `confirmed` - Admin confirmed the test drive
- `completed` - Test drive was completed
- `cancelled` - Test drive was cancelled

**Success Response (200):**
```json
{
  "success": true,
  "message": "Test drive status updated",
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 87654 32109",
    "carModel": "BMW 7 Series",
    "preferredDate": "2025-02-15",
    "notes": "Interested in...",
    "status": "confirmed",
    "createdAt": "2025-02-07T11:00:00.000Z"
  }
}
```

**Invalid Status Response (400):**
```json
{
  "message": "Invalid status. Must be: pending, confirmed, completed, or cancelled"
}
```

---

## Health Check

### GET /health
Check if server is running.

**Request:**
```bash
GET /api/health
```

**Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Name, email, and message are required"
}
```

### 404 Not Found
```json
{
  "message": "Test drive request not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error submitting test drive request",
  "error": "..."
}
```

---

## CORS Configuration

CORS is enabled for the frontend URL specified in `.env`:
```
FRONTEND_URL=http://localhost:5173
```

Adjust this for production deployments.

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production.

---

## Testing with cURL

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","message":"Great cars!"}'
```

### Test Test Drive
```bash
curl -X POST http://localhost:5000/api/testdrive \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane",
    "email":"jane@test.com",
    "phone":"+91 98765 43210",
    "carModel":"BMW 7 Series",
    "preferredDate":"2025-02-15"
  }'
```

### Get All Feedback
```bash
curl http://localhost:5000/api/feedback
```

### Get All Test Drives
```bash
curl http://localhost:5000/api/testdrive
```

---

**Last Updated:** February 7, 2025
