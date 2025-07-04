# Portfolio API

This is a Node.js Express app to manage my portfolio projects and experiences. 
 
This app uses MongoDB Atlas as the backend database and Pug for admin dashboard templates.

## Features

✅ Admin dashboard to manage:
- Projects
- Experiences

✅ JSON API endpoints:
- GET /api/projects
- GET /api/experiences

✅ Connected to MongoDB Atlas



## How to Run
1. Clone this repository
```bash
git clone https://github.com/yourusername/portfolio-api.git
cd portfolio-api
```

2. Install dependencies
```bash
npm install
```
3. Create `.env` file in the root directory
```bash
MONGO_URI=your_mongo_connection_string
PORT=3000
```
4. Start the server
```bash
npm start
```
5. Visit Admin Dashboard
```bash
http://localhost:3000/admin/projects
http://localhost:3000/admin/experiences
```

