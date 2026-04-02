# 🎵 Music Streaming App Backend

This is a backend system for a music streaming platform that supports user authentication and role-based access for normal users and artists.
---

## Features

### 👤 Authentication

* User registration & login
* Password hashing for security
* Logout functionality

### 🎧 User Features

* Access all albums
* View specific albums

### 🎤 Artist Features

* Upload songs
* Create albums

### 🔐 Roles

* **Normal Users** → Consume content
* **Artists** → Upload & manage content

---

## 🛠️ Tech Stack (edit this based on your actual stack)

* Backend: Node.js / Express 
* Database: MongoDB 
* Authentication: JWT 

---

## 📂 API Overview

### 🔐 Auth Routes (`/api/auth`)

- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  
- `POST /api/auth/logout` → Logout user  

---

### 🎧 Music Routes (`/api/music`)

#### 🎵 Songs

- `POST /api/music/create` → Upload song (Artist only)  
- `GET /api/music/all-musics` → Get all songs (User only)  
- `GET /api/music/single-music/:musicID` → Get single song  

---

#### 📀 Albums

- `POST /api/music/album` → Create album (Artist only)  
- `GET /api/music/all-albums` → Get all albums (User & Artist)  
- `GET /api/music/album-music/:albumID` → Get songs of a specific album  

---

## 🔐 Security

* Passwords are hashed before storage
* Role-based access control (User / Artist)

---

## ⚙️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/music-streaming-app-backend.git

# Navigate into project
cd music-streaming-app-backend

# Install dependencies
npm install

# Run the server
npm start
```

---

## Goal

To build a strong foundation in backend development by implementing authentication, role-based access control, and well-structured, maintainable server-side applications.
