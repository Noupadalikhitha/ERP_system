# Deployment Guide

## Backend Deployment (Render/Railway)

### Render Setup

1. **Create New Web Service**
   - Connect your GitHub repository
   - Select the `backend` directory as root
   - Build command: `pip install -r requirements.txt && alembic upgrade head`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Environment Variables**
   ```
   DATABASE_URL=<your-postgresql-url>
   SECRET_KEY=<generate-a-secure-secret-key>
   OPENAI_API_KEY=<your-openai-api-key>
   FRONTEND_URL=<your-frontend-url>
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

3. **PostgreSQL Database**
   - Create a PostgreSQL database on Render
   - Copy the internal database URL
   - Update `DATABASE_URL` environment variable

### Railway Setup

1. **Create New Project**
   - Deploy from GitHub
   - Select `backend` directory

2. **Add PostgreSQL Service**
   - Add PostgreSQL database
   - Railway automatically provides `DATABASE_URL`

3. **Environment Variables**
   - Set all required environment variables
   - Railway will auto-detect Python and install dependencies

## Frontend Deployment (Vercel/Netlify)

### Vercel Setup

1. **Import Project**
   - Connect GitHub repository
   - Select `frontend` directory as root

2. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.com/api/v1
   ```

### Netlify Setup

1. **New Site from Git**
   - Connect repository
   - Base directory: `frontend`

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Add `VITE_API_URL` in site settings

## Database Setup (Supabase/Neon)

### Supabase

1. **Create Project**
   - Go to supabase.com
   - Create new project
   - Wait for database to be ready

2. **Get Connection String**
   - Go to Settings > Database
   - Copy connection string
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

3. **Run Migrations**
   ```bash
   cd backend
   alembic upgrade head
   ```

### Neon

1. **Create Project**
   - Go to neon.tech
   - Create new project
   - Select PostgreSQL version

2. **Connection String**
   - Copy connection string from dashboard
   - Update `DATABASE_URL` in backend

3. **Run Migrations**
   ```bash
   cd backend
   alembic upgrade head
   ```

## Docker Deployment

### Local Docker

```bash
docker-compose up -d
```

### Production Docker

1. **Update docker-compose.yml**
   - Change database credentials
   - Update environment variables
   - Use production-ready images

2. **Deploy to Cloud**
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Environment variables set
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled
- [ ] Database backups configured
- [ ] Monitoring set up
- [ ] Error logging configured
- [ ] API rate limiting enabled
- [ ] Frontend API URL updated
- [ ] Test all endpoints
- [ ] Test authentication flow
- [ ] Verify AI features work

## Troubleshooting

### Backend Issues

- **Database Connection**: Verify `DATABASE_URL` is correct
- **Migrations**: Run `alembic upgrade head` manually
- **OpenAI API**: Check API key is valid and has credits

### Frontend Issues

- **API Calls**: Verify `VITE_API_URL` is correct
- **CORS Errors**: Check backend CORS settings
- **Build Errors**: Check Node version (18+)

### Common Errors

- **401 Unauthorized**: Check JWT token and secret key
- **500 Internal Server Error**: Check backend logs
- **Database Errors**: Verify migrations ran successfully



