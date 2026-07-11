# Javelin Associates - Admin Setup Guide

## 🚀 Quick Start

### 1. Start the Application
Run the batch file:
```bash
start-everything.bat
```

Or manually:
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

### 2. Register Admin Account
1. Open browser: http://localhost:3000/admin/register
2. Fill in the registration form:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Create Admin Account"
4. You'll be redirected to the login page

### 3. Login to Admin Panel
1. Go to: http://localhost:3000/admin/login
2. Enter your registered email and password
3. Click "Login"
4. You'll be redirected to the dashboard

## 📋 Admin Features

### Dashboard
- Overview of all system statistics
- Quick access to all management sections

### Appointments Manager
- View all quote requests from clients
- Filter by status: Pending, Confirmed, Completed, Cancelled
- Approve/Reject appointment requests
- View detailed client information
- Mark appointments as complete

### Gallery Management
- Upload and manage security operation images
- Add descriptions and categories
- Organize by: Work in Action, Events, Team, Facilities

### Team Management
- Add/Edit/Delete team members
- Upload team photos
- Set roles and descriptions

### Sites Management
- Manage operational sites
- Add site locations and details

### News & Blogs
- Create and publish news articles
- Manage blog posts

### Messages
- View contact form submissions
- Respond to client inquiries

### Contact Info
- Update company contact information
- Manage office locations

## 🖼️ Gallery Setup

To populate the gallery with your images:

```bash
cd server
node seed-gallery.js
```

This will add 20 gallery items with descriptions organized by category.

## 🔑 First Time Setup

1. **Register First Admin**: Use the registration page to create your first admin account
2. **Seed Gallery**: Run the gallery seed script to add images
3. **Update Contact Info**: Login and update company contact information
4. **Add Team Members**: Add your leadership team
5. **Configure Sites**: Add your operational sites

## 📁 Image Paths

Images are stored in:
- Frontend: `client/public/images/`
- Backend uploads: `server/uploads/`

Current available images:
- javelin-logo-1.jpg
- javelin-logo-2.jpg
- javelin-logo.png
- javelin-site-2.jpg
- javelin-site-3.jpg
- javelin-site-5.jpg
- javelin-guard-4.jpg
- site1.jpg, site2.jpg, site3.jpg
- md_image.jpg

## 🎯 Client Quote Request Flow

1. Client visits Services page
2. Clicks "Request Quote" button
3. Redirected to Book Meeting page
4. Fills appointment form (meeting type, date, time, service interest)
5. Submits appointment request
6. Admin sees request in Appointments Manager
7. Admin can Confirm, Cancel, or Mark Complete

## 🔒 Security Notes

- All admin routes are protected
- JWT tokens are used for authentication
- Passwords are hashed before storage
- Only authenticated admins can access management features

## 📞 Support

For issues or questions, check the application logs in the terminal windows.
