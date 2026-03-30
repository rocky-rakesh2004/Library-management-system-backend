<h1 align="center">📚 Library Management System Backend</h1>

<p align="center">
  <b>REST API built with NestJS, PostgreSQL, TypeORM, and JWT Authentication</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-Backend-red?style=for-the-badge&logo=nestjs"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/badge/TypeORM-ORM-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-green?style=for-the-badge&logo=jsonwebtokens"/>
  <img src="https://img.shields.io/badge/Swagger-API Docs-brightgreen?style=for-the-badge&logo=swagger"/>
  <img src="https://img.shields.io/badge/Postman-Testing-orange?style=for-the-badge&logo=postman"/>
  <img src="https://img.shields.io/badge/Token-Blacklist-red?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Scheduler-Cron-blue?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/rocky-rakesh2004/Library-management-system-backend?style=social"/>
  <img src="https://img.shields.io/github/forks/rocky-rakesh2004/Library-management-system-backend?style=social"/>
  <img src="https://img.shields.io/github/issues/rocky-rakesh2004/Library-management-system-backend?style=social"/>
  <img src="https://img.shields.io/github/repo-size/rocky-rakesh2004/Library-management-system-backend"/>
  <img src="https://img.shields.io/github/last-commit/rocky-rakesh2004/Library-management-system-backend"/>
</p>

---

## 📖 Overview

A **Library Book Management System API** built using **NestJS, PostgreSQL, and TypeORM** with **JWT Authentication, Token Blacklist, Logout-All Sessions, and Role-Based Access Control (Admin & User)**.

This project demonstrates:

* 🔐 Secure Authentication
* 👨‍💼 Admin & 👤 User Roles
* 📚 Book CRUD Operations
* 📡 Swagger API Documentation
* 🧪 Postman Testing
* ⚙️ Config Module & Environment Variables
* 🧱 Clean Backend Architecture

---
## 🚀 Features

### 🔐 Authentication & Security

| Feature | Description |
|--------|------------|
| Register | User account creation |
| Login | JWT authentication |
| Logout | Blacklist current token |
| Logout All | Logout from all devices |
| Token Blacklist | Stores logged out JWT tokens |
| Scheduler | Removes expired tokens daily |
| Default Admin | Pre-created admin account |
| Guards | Protected routes |
| JWT | Token-based security |

---

### 📚 Book Management

| Feature | Admin | User |
|--------|------|------|
| View All Books | ✅ | ✅ |
| View Book by ID | ✅ | ✅ |
| Create Books | ✅ | ❌ |
| Update Books | ✅ | ❌ |
| Delete Books | ✅ | ❌ |

---

### 👥 User Management

| Feature | Admin | User |
|--------|------|------|
| Register | ❌ | ✅ |
| Login | ✅ | ✅ |
| View All Users | ✅ | ❌ |
| Delete Users | ✅ | ❌ |
| Delete Admin | ❌ | ❌ |
| Logout | ✅ | ✅ |
| Logout-all | ✅ | ✅ |

---

## 🛠️ Tech Stack

| Technology        | Usage              |
| ----------------- | ------------------ |
| NestJS            | Backend Framework  |
| PostgreSQL        | Database           |
| TypeORM           | ORM                |
| JWT               | Authentication     |
| Swagger           | API Documentation  |
| Class Validator   | DTO Validation     |
| Guards            | Authorization      |
| Middleware        | Request Handling   |
| Interceptors      | Response Control   |
| Exception Filters | Error Handling     |
| Postman           | API Testing        |
| Config Module     | Environment Config |


---

## 📁 Project Structure

```
src
│
├── auth
├── users
├── books
├── blacklist
├── common
│   ├── guards
│   ├── decorators
│   ├── interceptors
│   ├── filters
│   ├── middleware
│
├── config
├── app.module.ts
└── main.ts
```

---

## 🔑 Default Admin Login

```
Email: admin@library.com
Password: admin123
```

---

## 📡 API Endpoints

#### 🔐Auth

```
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/logout-all
```
#### 👨🏻‍💻ADMIN
```
POST   /admin/books
GET    /admin/books
GET    /admin/books/:id
PATCH  /admin/books/:id
DELETE /admin/books/:id
GET    /users
GET    /users/:id
DELETE /users/admin/:id
```
#### 👤USERS
```
GET    /users/books
GET    /users/books/:id
```

---

## 📖 Swagger Documentation

```
http://localhost:3000/api
```

Test all APIs directly in browser.

---

## 📮 Postman API Collection

<p align="center">
  <a href="https://rakesh-s-85506702-1575679.postman.co/workspace/Rakesh-S's-Workspace~5f001d6a-ea45-40a0-87da-814ff9206896/collection/53260583-0d0c2ba8-292a-4ab0-80c3-90be1d5d13cb?action=share&creator=53260583">
    <img src="https://img.shields.io/badge/Open-Postman Collection-orange?style=for-the-badge&logo=postman"/>
  </a>
</p>

Use the Postman collection to test all API endpoints easily.


1. Login as Admin
2. Copy JWT Token
3. Add Bearer Token in Authorization
4. Test APIs

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/rocky-rakesh2004/Library-management-system-backend.git
```

### 2️⃣ Go to Project

```bash
cd Library-management-system-backend
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup PostgreSQL

Create database:

```
library_db
```

### 5️⃣ Create .env file

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=library_db

JWT_SECRET=librarysecret
JWT_EXPIRES_IN=1d

PORT=3000
```

### 6️⃣ Run Project

```bash
npm run start:dev
```

---

## 🧪 Run API

| Service | URL                       |
| ------- | ------------------------- |
| Server  | http://localhost:3000     |
| Swagger | http://localhost:3000/api |

---

## 🎯 Project Purpose

* Learn NestJS architecture
* Understand JWT authentication
* Implement role-based authorization
* Work with PostgreSQL and TypeORM
* Build real-world backend APIs
* Prepare for backend developer roles

---

## 👨‍💻 Author

**RAKESH**

GitHub:
https://github.com/rocky-rakesh2004

---

## ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork it
🛠️ Contribute
📩 Share feedback

---

<p align="center">
  Made with ❤️ using NestJS
</p>
