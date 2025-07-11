# React Frontend for Django Task Manager

This is the React frontend for the Django CRUD Task Management application.

## Features

- User login with token authentication (connects to Django backend)
- Fetch and display tasks for the logged-in user
- Simple, clean UI

## Prerequisites

- Node.js and npm installed
- Django backend running (see backend/README.md for setup)

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

3. **Connect to the backend:**
   - The frontend expects the Django backend to be running at `http://localhost:8000`.
   - Make sure the backend is running and has the `/api-token-auth/` endpoint enabled for login.

4. **Login:**
   - Use your Django username and password to log in.
   - On successful login, your tasks will be fetched and displayed.

## Environment Variables

If you want to change the backend API URL, create a `.env` file in the `frontend` directory:

```
REACT_APP_API_URL=http://localhost:8000
```

Then, update your API calls in the code to use `process.env.REACT_APP_API_URL`.

## Project Structure

- `src/App.js` — Main React component, handles login and task fetching
- `src/services/api.js` — (Optional) Place for API helper functions

## Troubleshooting

- **CORS errors:**  
  Make sure your Django backend allows requests from `localhost:3000`.  
  You may need to install and configure `django-cors-headers` in your backend.

- **Login issues:**  
  Ensure the `/api-token-auth/` endpoint is enabled in your Django backend and the user exists.

## Build

To create a production build:
```bash
npm run build
```

---

## Learn More

- [React documentation](https://reactjs.org/)
- [Django REST Framework](https://www.django-rest-framework.org/)
