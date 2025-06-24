# TailorApp Frontend

This is the frontend for the TailorApp MERN stack project. Built with React and plain CSS.

---

## Features

- Four main pages: Home, User (admin only), About, Design (public)
- User page: add/edit/delete users, upload images, notification banner for orders due soon
- Design page: public gallery, admin can upload/delete designs
- Admin login/logout
- Responsive, clean UI

---

## Setup

### 1. Install dependencies

```sh
cd frontend
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and set your backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000
```
- If deploying, set this to your deployed backend URL.

### 3. Start the frontend

```sh
npm start
```

---

## Deployment (Free Tier)

### Deploy on [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/):

- Connect your repo and select the `frontend` folder as the project root.
- Set the environment variable `REACT_APP_API_URL` in the dashboard.
- Build command: `npm run build`
- Output directory: `build`

---

## Usage

- Visit `/login` to log in as admin.
- Manage users and designs from the User and Design pages.
- Public users can view the Design gallery and About page.

---

## Security & Best Practices

- All sensitive data is stored in environment variables.
- Only the User page and design upload/delete are protected by admin login.
- Images are stored in Cloudinary, not locally.
- Use HTTPS in production.

---

## License

MIT