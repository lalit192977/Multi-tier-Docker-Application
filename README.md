# 🧱 Multi-Tier Web Application using Docker Networks

## 📌 Project Description

This project demonstrates a **secure, production-style multi-tier web application architecture** using **Docker containers and isolated Docker networks**.

The application follows a classic **3-tier architecture**:

- **Frontend**: Nginx serving a static web page
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB

The key focus of this project is **network-level security and isolation** using **multiple Docker bridge networks**, ensuring that each service can only communicate with the services it is intended to.

---

## 🏗️ Architecture Overview

```
Internet
   ↓
Frontend (Nginx Container)
   │  [frontend-network]
   ↓
Backend (Node.js / Express Container)
   │  [backend-network]
   ↓
Database (MongoDB Container)
```

### 🔐 Security Design

- MongoDB is **completely hidden** from the internet
- Backend is **not exposed to the host**
- Frontend is the **only public-facing service**
- Backend acts as the **only gateway** between frontend and database

---

## 🌐 Docker Networks Used

| Network Name        | Connected Containers       | Purpose |
|--------------------|----------------------------|--------|
| frontend-network   | Frontend ↔ Backend         | Public access & API routing |
| backend-network    | Backend ↔ Database         | Secure database communication |

---

## ⚙️ Tech Stack

- Docker
- Docker Bridge Networks
- Nginx
- Node.js
- Express.js
- MongoDB

---

## 📁 Project Structure

```
multi-tier-app/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── index.html
├── backend/
│   ├── Dockerfile
│   └── index.js
└── database/
    └── Dockerfile
```

---

## 🚀 How to Run This Project

### ✅ Prerequisites

- Docker installed
- Docker daemon running

---

### 🧹 Step 1: Clean Existing Containers (Optional but Recommended)

```bash
docker ps -q | xargs -r docker stop
docker ps -aq | xargs -r docker rm
```

---

### 🌐 Step 2: Create Docker Networks (with Subnets)

```bash
docker network create \
  --subnet 172.20.0.0/16 \
  frontend-network

docker network create \
  --subnet 172.21.0.0/16 \
  backend-network
```

---

### 🗄️ Step 3: Run MongoDB (Database Layer)

```bash
cd database
docker build -t mongo-db .

docker run -d \
  --name db \
  --network backend-network \
  mongo-db
```

🔒 **No ports are exposed** — database is fully private.

---

### 🔧 Step 4: Run Backend (Node.js / Express)

```bash
cd ../backend
docker build -t backend-app .

docker run -d \
  --name api \
  --network backend-network \
  backend-app
```

Now connect backend to frontend network:

```bash
docker network connect frontend-network api
```

---

### 🌍 Step 5: Run Frontend (Nginx)

```bash
cd ../frontend
docker build -t frontend-app .

docker run -d \
  --name ui \
  --network frontend-network \
  -p 80:80 \
  frontend-app
```

---

## ✅ Verification

### 🔎 Check Networks

```bash
docker network inspect frontend-network
docker network inspect backend-network
```

---

### 🌐 Access Application

Open browser:

```
http://localhost
```

You should see the frontend web page.

---

### 🧪 Test Data Flow

1. Enter a message in the frontend UI
2. Click **Save**
3. Data flows as:

```
Frontend → Backend API → MongoDB
```

---

## 📚 Key Learnings

- Why **multiple Docker networks** are more secure than a single network
- How **container DNS names** enable service discovery
- How **network isolation** prevents unauthorized access
- Real-world **multi-tier container architecture**

---

## 🔮 Future Improvements

- Docker Compose
- Environment variables & secrets
- Authentication
- CI/CD pipeline
- Deployment on AWS EC2 / ECS

---

## 👤 Author

**Lalit Kumar**  
DevOps | Docker | Cloud | Linux | AWS

---

⭐ If you find this project useful, consider starring the repository!

