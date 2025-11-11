# 📡 API Documentation - Bedeew Digital

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-api.render.com/api
```

## Authentication

La plupart des endpoints nécessitent un token JWT dans le header :

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication Endpoints

### Register

```http
POST /api/auth/register
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login

```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Update Details

```http
PUT /api/auth/updatedetails
Authorization: Bearer {token}
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com",
  "phone": "+221XXXXXXXXX"
}
```

### Update Password

```http
PUT /api/auth/updatepassword
Authorization: Bearer {token}
```

**Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## 📧 Contact Endpoints

### Submit Contact Form

```http
POST /api/contact
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+221XXXXXXXXX",
  "subject": "Demande de devis",
  "message": "Je souhaite...",
  "isQuote": true,
  "projectType": "web",
  "budget": "1M-3M",
  "deadline": "2024-12-31"
}
```

### Get All Contacts (Admin)

```http
GET /api/contact?status=new&page=1&limit=10
Authorization: Bearer {admin_token}
```

### Get Single Contact (Admin)

```http
GET /api/contact/:id
Authorization: Bearer {admin_token}
```

### Update Contact (Admin)

```http
PUT /api/contact/:id
Authorization: Bearer {admin_token}
```

**Body:**
```json
{
  "status": "read",
  "adminNotes": "Contacted by phone"
}
```

### Delete Contact (Admin)

```http
DELETE /api/contact/:id
Authorization: Bearer {admin_token}
```

---

## 🎨 Services Endpoints

### Get All Services

```http
GET /api/services?category=development&published=true
```

### Get Single Service

```http
GET /api/services/:slug
```

### Create Service (Admin)

```http
POST /api/services
Authorization: Bearer {admin_token}
```

**Body:**
```json
{
  "title": "Développement Web",
  "shortDescription": "Sites web professionnels",
  "fullDescription": "Description complète...",
  "icon": "code",
  "category": "development",
  "features": [
    {
      "title": "Responsive Design",
      "description": "Compatible tous appareils"
    }
  ],
  "pricing": {
    "startingPrice": 500000,
    "currency": "FCFA",
    "pricingType": "project"
  },
  "published": true,
  "order": 1
}
```

### Update Service (Admin)

```http
PUT /api/services/:id
Authorization: Bearer {admin_token}
```

### Delete Service (Admin)

```http
DELETE /api/services/:id
Authorization: Bearer {admin_token}
```

---

## 🖼️ Portfolio Endpoints

### Get All Portfolio Items

```http
GET /api/portfolio?category=web&featured=true&page=1&limit=12
```

**Query Parameters:**
- `category`: web, mobile, design, seo, social-media, video, branding, other
- `featured`: true/false
- `published`: true/false
- `page`: Page number
- `limit`: Items per page

### Get Single Portfolio Item

```http
GET /api/portfolio/:slug
```

### Create Portfolio Item (Admin)

```http
POST /api/portfolio
Authorization: Bearer {admin_token}
```

**Body:**
```json
{
  "title": "Site E-commerce",
  "description": "Boutique en ligne moderne",
  "fullDescription": "Description détaillée...",
  "category": "web",
  "tags": ["ecommerce", "react", "nodejs"],
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Screenshot",
      "isPrimary": true
    }
  ],
  "client": {
    "name": "Client Name",
    "logo": "https://example.com/logo.png",
    "website": "https://client.com"
  },
  "technologies": ["React", "Node.js", "MongoDB"],
  "projectUrl": "https://project.com",
  "completionDate": "2024-01-15",
  "featured": true,
  "published": true
}
```

### Update Portfolio Item (Admin)

```http
PUT /api/portfolio/:id
Authorization: Bearer {admin_token}
```

### Delete Portfolio Item (Admin)

```http
DELETE /api/portfolio/:id
Authorization: Bearer {admin_token}
```

---

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "totalPages": 5,
  "currentPage": 1
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message here",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

---

## 🔒 Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Contact form**: 3 requests per hour

---

## 📝 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Server Error

---

## 🧪 Testing with cURL

### Get Services

```bash
curl http://localhost:5000/api/services
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bedeew.digital","password":"Admin123!"}'
```

### Create Service (with auth)

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Service","shortDescription":"Test","fullDescription":"Test","category":"development","published":true}'
```

---

## 🔮 Phase 2 Endpoints (À venir)

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `GET /api/courses/:slug` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job posting
- `POST /api/jobs/:id/apply` - Apply to job
- `GET /api/applications` - Get applications

---

**Pour plus d'informations, consultez le code source dans `/server/src/routes/`**
