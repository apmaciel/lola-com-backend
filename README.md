# lola-com-backend
Lola.com Fashion Wear - Backend Service

## How to use

Besides installing the `npm i` packages, create a `.env` file in this parent dir:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=fatecats
DB_NAME=webapp_store
PORT=3001
```
## How to build
### Steps to Build and Run the Docker Image:
1. **Build the Docker Image**:
   ```bash
   docker build -t lola-com-backend .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 3001:3001 --env-file .env lola-com-backend
   ```

This assumes your .env file is in the same directory as the `Dockerfile`.