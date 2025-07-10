# Django CRUD App

A simple Django task management application with CRUD operations.

## Local Development

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables (create a `.env` file):
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://postgres:10010010@localhost:5432/crud-app
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

## Deployment on Render.com

### Prerequisites
- A Render.com account
- A PostgreSQL database (you can create one on Render.com)

### Steps

1. **Push your code to GitHub**

2. **Create a new Web Service on Render.com**
   - Connect your GitHub repository
   - Choose "Python" as the runtime
   - Set the build command: `./build.sh`
   - Set the start command: `gunicorn myproject.wsgi`

3. **Set up Environment Variables on Render.com**
   - Go to your service settings
   - Add the following environment variables:
     - `SECRET_KEY`: A secure random string
     - `DEBUG`: `False`
     - `ALLOWED_HOSTS`: Your render domain (e.g., `your-app-name.onrender.com`)
     - `DATABASE_URL`: Your PostgreSQL connection string (provided by Render)

4. **Create a PostgreSQL Database**
   - In your Render dashboard, create a new PostgreSQL database
   - Copy the connection string and set it as `DATABASE_URL`

5. **Deploy**
   - Render will automatically deploy your app
   - The build script will install dependencies, collect static files, and run migrations

### Environment Variables for Production

Set these in your Render.com service settings:

```
SECRET_KEY=your-secure-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
DATABASE_URL=postgres://username:password@host:port/database
```

### Important Notes

- The `build.sh` script handles dependency installation, static file collection, and database migrations
- Make sure your PostgreSQL database is created before deploying
- The app uses `gunicorn` as the production server
- Static files are served from the `staticfiles` directory

## Features

- Create, Read, Update, Delete tasks
- Responsive design
- PostgreSQL database backend
- Production-ready configuration 