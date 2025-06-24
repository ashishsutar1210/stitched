# TailorApp Backend

This is the backend for the TailorApp MERN stack project. It provides RESTful APIs for user management, design gallery, authentication, and image uploads (Cloudinary).

---

## Features

- User CRUD (name, phone, address, description, dress type, measurements, images, etc.)
- Design gallery CRUD (title, description, image)
- Admin authentication (JWT)
- Image uploads to Cloudinary
- Notification logic for orders due soon

---

## Setup

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

- Get your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Get your Cloudinary credentials from [Cloudinary Dashboard](https://cloudinary.com/).

### 4. Start the server

```sh
npm run dev
```
or
```sh
npm start
```

---

## Admin Registration

- Register your admin user by sending a POST request to `/api/auth/register` with `{ "username": "admin", "password": "yourpassword" }` (use Postman or a temporary frontend form).
- After registration, use `/api/auth/login` to get your JWT token.

---

## Deployment (Free Tier)

### Deploy on [Render](https://render.com/) or [Railway](https://railway.app/):

- Create a new web service, connect your repo, and set the environment variables in the dashboard.
- Use the start command: `npm start`
- Make sure to allow incoming connections on your chosen port.

---

## API Endpoints

- `POST /api/auth/register` — Register admin (one-time)
- `POST /api/auth/login` — Login, returns JWT
- `GET/POST/PUT/DELETE /api/users` — User CRUD (admin only)
- `POST /api/users/:id/images` — Add images to user
- `GET/POST/DELETE /api/designs` — Design gallery CRUD (admin for POST/DELETE)