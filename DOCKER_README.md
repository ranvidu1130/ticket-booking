# Docker Setup for Ticket Booking Application

This document provides instructions for running the ticket booking application using Docker.

## Overview

The application consists of three main services:
- **Frontend**: React application served via Nginx (Production build)
- **Backend**: Node.js API server
- **Database**: MySQL 8.0

## Prerequisites

- Docker and Docker Compose installed
- Ports 3000, 5000, and 3307 available on your system

## Quick Start

1. **Build and start all services:**
   ```bash
   docker compose up -d
   ```

2. **Check the status of services:**
   ```bash
   docker compose ps
   ```

3. **View logs:**
   ```bash
   # All services
   docker compose logs
   
   # Specific service
   docker compose logs frontend
   docker compose logs backend
   docker compose logs mysql
   ```

4. **Stop all services:**
   ```bash
   docker compose down
   ```

5. **Rebuild and restart (after code changes):**
   ```bash
   docker compose down
   docker compose build
   docker compose up -d
   ```

## Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Backend Health Check**: http://localhost:5000/api/health
- **MySQL Database**: localhost:3307 (external), mysql:3306 (internal)

## Database Configuration

- **Host**: mysql (for backend), localhost:3307 (for external access)
- **Username**: root
- **Password**: rootpassword
- **Database**: ticket_booking

## Environment Variables

### Backend
- `PORT`: 5000
- `DB_HOST`: mysql
- `DB_USER`: root
- `DB_PASSWORD`: rootpassword
- `DB_NAME`: ticket_booking
- `JWT_SECRET`: your-super-secret-jwt-key

### Frontend
- `REACT_APP_API_URL`: http://localhost:5000

## Docker Configuration Files

### Backend Dockerfile
- Multi-stage build for security
- Non-root user execution
- Health checks enabled
- Dependencies cached for faster rebuilds

### Frontend Dockerfile
- Multi-stage build (build + nginx)
- Production optimized
- Custom nginx configuration
- Static asset caching

### docker-compose.yml
- Orchestrates all services
- Network isolation
- Volume persistence for database
- Health checks and restart policies

## Development Notes

1. **Database Schema**: Automatically initialized from `back-end/database/schema.sql`
2. **Security**: Both frontend and backend run as non-root users
3. **Performance**: Frontend uses nginx for static file serving with compression and caching
4. **Monitoring**: Health checks configured for backend service

## Troubleshooting

1. **Port conflicts**: If ports are in use, modify the port mappings in `docker-compose.yml`
2. **Database connection issues**: Ensure MySQL container is fully started before backend
3. **Build failures**: Clear Docker cache with `docker system prune` and rebuild
4. **Permission issues**: Ensure Docker daemon has proper permissions

## Useful Commands

```bash
# Remove all containers and volumes (fresh start)
docker compose down -v

# View real-time logs
docker compose logs -f

# Execute commands inside containers
docker compose exec backend sh
docker compose exec frontend sh
docker compose exec mysql mysql -u root -p

# Rebuild specific service
docker compose build backend
docker compose up -d backend
```