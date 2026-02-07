# AUTOX Car Showroom - Full Stack Application

A modern, full-stack pre-owned luxury car showroom website with contact form and test drive request functionality.

## Features

✅ **Contact Form** - Customers can submit feedback/inquiries via Contact page
✅ **Test Drive Requests** - Customers request test drives with confirmation emails
✅ **Email Notifications** - Automatic emails sent to customers and admin
✅ **Admin API** - Endpoints to retrieve all submissions for admin dashboard
✅ **Modern UI** - React + Material-UI + Framer Motion frontend
✅ **Responsive Design** - Mobile-friendly across all devices
✅ **Database** - MySQL with Sequelize ORM for data persistence

## Project Structure

```
car-showroom/
├── backend/                      # Node.js + Express server
│   ├── models/
│   │   ├── Car.js               # Car model (existing)
│   │   ├── Feedback.js          # Contact form submissions
│   │   └── TestDrive.js         # Test drive requests
│   ├── routes/
│   │   ├── cars.js              # Car endpoints (existing)
│   │   ├── feedback.js          # Feedback endpoints
│   │   └── testdrive.js         # Test drive endpoints
│   ├── config/
│   │   └── database.js          # Sequelize setup
│   ├── utils/
│   │   └── email.js             # Email sending utility
│   ├── server.js                # Main application entry
│   ├── .env.example             # Environment variables template
│   └── package.json
│
├── carshowroom/                 # React Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js         # API wrapper functions
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CarCard.jsx
│   │   │   └── TestDriveModal.jsx  # NEW: Test drive form modal
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Contact.jsx      # UPDATED: Wired with API
│   │   │   ├── Experience.jsx   # UPDATED: Added test drive buttons
│   │   │   └── ModelDetails.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MySQL (v5.7+)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env` with your values:**
   ```
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=autox_showroom
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_DIALECT=mysql

   # Server
   PORT=5000
   NODE_ENV=development

   # Email (Gmail SMTP example)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ADMIN_EMAIL=admin@autox.com

   # Frontend
   FRONTEND_URL=http://localhost:5173
   ```

   **Gmail Setup:**
   - Enable 2-factor authentication on your Google account
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the 16-character password as `SMTP_PASS`

5. **Create MySQL database:**
   ```bash
   mysql -u root -p
   CREATE DATABASE autox_showroom;
   EXIT;
   ```

6. **Start the server:**
   ```bash
   npm start
   # or
   npm run start
   ```

   Expected output:
   ```
   ✅ MySQL connected using Sequelize ORM
   📦 Database models synced
   🚀 Server running on port 5000
   📍 API: http://localhost:5000
   🔌 Database: localhost:3306
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd carshowroom
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Expected output:
   ```
   VITE v7.2.4  ready in 500 ms

   ➜  Local:   http://localhost:5173/
   ➜  Press h to show help
   ```

4. **Open in browser:**
   - Visit: http://localhost:5173/

## API Endpoints

### Feedback Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit contact form |
| GET | `/api/feedback` | Retrieve all feedback (admin) |
| GET | `/api/feedback/:id` | Retrieve specific feedback |

### Test Drive Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/testdrive` | Submit test drive request |
| GET | `/api/testdrive` | Retrieve all requests (admin) |
| GET | `/api/testdrive/:id` | Retrieve specific request |
| PUT | `/api/testdrive/:id` | Update status (admin) |

---

## cURL Examples

### 1. Submit Contact Form Feedback

```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "message": "I am interested in your luxury cars. Please contact me with more details."
  }'
```

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
    "message": "I am interested in your luxury cars...",
    "createdAt": "2025-02-07T10:30:00.000Z"
  }
}
```

### 2. Get All Feedback

```bash
curl -X GET http://localhost:5000/api/feedback
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "message": "I am interested...",
      "createdAt": "2025-02-07T10:30:00.000Z"
    }
  ]
}
```

### 3. Submit Test Drive Request

```bash
curl -X POST http://localhost:5000/api/testdrive \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 87654 32109",
    "carModel": "BMW 7 Series",
    "preferredDate": "2025-02-15",
    "notes": "I am interested in the automatic transmission variant."
  }'
```

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
    "notes": "I am interested...",
    "status": "pending",
    "createdAt": "2025-02-07T11:00:00.000Z"
  }
}
```

**Confirmation Email Sent to:**
- **To:** jane@example.com
- **Subject:** AUTOX — Test Drive Request Received
- **Content:** Personalized greeting with request summary and next steps

### 4. Get All Test Drive Requests

```bash
curl -X GET http://localhost:5000/api/testdrive
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
      "notes": "I am interested...",
      "status": "pending",
      "createdAt": "2025-02-07T11:00:00.000Z"
    }
  ]
}
```

### 5. Update Test Drive Status (Admin)

```bash
curl -X PUT http://localhost:5000/api/testdrive/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

**Valid status values:** `pending`, `confirmed`, `completed`, `cancelled`

---

## Frontend Features

### Contact Page (`/contact`)
- ✅ Contact form with fields: Name, Email, Phone (optional), Message
- ✅ Form validation (required fields)
- ✅ Success/error messages
- ✅ Loading state while submitting
- ✅ Form clears on successful submission

### Experience Page (`/experience`)
- ✅ "Request Test Drive" buttons in hero and CTA sections
- ✅ Test Drive Modal opens with form
- ✅ Pre-fill car model if coming from model page
- ✅ Fields: Name, Email, Phone, Car Model, Preferred Date, Notes
- ✅ Confirmation message after submission
- ✅ Error handling for failed submissions

### Test Drive Modal
- ✅ Clean, intuitive dialog interface
- ✅ Validation for required fields
- ✅ Disable form during submission
- ✅ Show success message with email confirmation
- ✅ Auto-close after 3 seconds on success

---

## Database Schema

### `feedback` Table
```sql
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `testdrive` Table
```sql
CREATE TABLE testdrive (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  carModel VARCHAR(100) NOT NULL,
  preferredDate DATE,
  notes TEXT,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Sequelize will auto-create these tables on server startup.

---

## Error Handling

### Common Errors & Solutions

**1. "Cannot connect to database"**
- Check MySQL is running: `mysql -u root -p`
- Verify `.env` DB credentials match MySQL setup
- Ensure database exists: `CREATE DATABASE autox_showroom;`

**2. "SMTP connection failed"**
- Verify Gmail App Password (not regular password)
- Enable "Less secure app access" or use App Password
- Check SMTP_HOST and SMTP_PORT in `.env`

**3. "Cannot find module './models/Feedback'"**
- Ensure all files are created in correct directories
- Check file paths match imports

**4. "API endpoint returns 404"**
- Verify backend server is running on port 5000
- Check routes are imported in `server.js`
- Confirm endpoint paths in cURL/fetch match route definitions

---

## Development Tips

### Proxy Configuration (Optional)
If frontend and backend are on different ports, configure Vite proxy in `carshowroom/vite.config.js`:

```javascript
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
```

Then update API base in `src/api/index.js`:
```javascript
const API_BASE = '/api'; // Will proxy to backend
```

### Environment Variables
Always use `.env` file for sensitive data:
- ✅ Database credentials
- ✅ SMTP passwords
- ✅ Admin email
- ❌ Never commit `.env` to git

### Testing Locally
1. Start backend: `npm start` (from `/backend`)
2. Start frontend: `npm run dev` (from `/carshowroom`)
3. Test Contact form at `http://localhost:5173/contact`
4. Test Test Drive at `http://localhost:5173/experience`
5. Check email in inbox for confirmations

---

## Deployment

### Backend Deployment (e.g., Heroku/AWS)
1. Ensure `.env` variables are set in platform settings
2. Use `npm start` as start command
3. Ensure MySQL database is accessible from deployment environment
4. Update `FRONTEND_URL` in `.env` to production frontend URL

### Frontend Deployment (e.g., Vercel/Netlify)
1. Update API_BASE in `src/api/index.js` to production backend URL
2. Deploy: `npm run build` creates optimized bundle
3. Enable CORS on backend for production domain

---

## Troubleshooting

### Logs
Check console output for errors:
- **Backend:** Terminal where `npm start` runs
- **Frontend:** Browser DevTools (F12 → Console)

### Database
View submitted data:
```bash
mysql -u root -p
USE autox_showroom;
SELECT * FROM feedback;
SELECT * FROM testdrive;
```

### Email
Test SMTP settings:
```bash
node -e "require('./utils/email.js').sendMail('test@example.com', 'Test', '<h1>Test Email</h1>')"
```

---

## Contributing

To add new features:
1. Create branch: `git checkout -b feature/new-feature`
2. Make changes and test locally
3. Commit: `git commit -m "feat: add new feature"`
4. Push: `git push origin feature/new-feature`
5. Create pull request

---

## Future Enhancements

- [ ] Admin dashboard to manage feedback/test drive requests
- [ ] Email templates with branding
- [ ] SMS notifications option
- [ ] Test drive availability calendar
- [ ] Payment integration for booking
- [ ] User authentication and profiles
- [ ] Real-time notifications with WebSockets
- [ ] Email reminders before test drive

---

## Support

For issues or questions:
- 📧 Email: info@autox.com
- 📞 Phone: +91 98765 43210
- 📍 Address: 12 Luxury Drive, Motor City, Chennai, India

---

**Last Updated:** February 7, 2025
**Version:** 1.0.0
