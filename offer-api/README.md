# Offer Management API (NestJS + MongoDB)

##  Project Description
A simple recruitment REST API for managing job offers.  
Built using **NestJS** (Node.js framework) and **MongoDB**.

The API allows:
- Creating job offers (`POST /offers`)
- Editing offers (`PATCH /offers/:id`)
- Fetching paginated lists of offers with filters (`GET /offers`)
- Deleting offers (`DELETE /offers/:id`)

The project follows good NestJS practices:
- Clear separation of layers: **DTO**, **Service**, and **Repository**
- Global **Exception Filter** for unified error responses
- **Logging Middleware** for HTTP request logging
- **Response Interceptor** adding metadata (like response time)
- Unit tests using **Jest**

---

##  Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure MongoDB is running locally (e.g. MongoDB Community Server).

3. Configure `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/offer_management
   PORT=3000
   ```

4. Start the development server:
   ```
   npm run start:dev
   ```

5. The API will be available at:  
     http://localhost:3000

---

##  Testing

Run all unit tests:
```
npm run test
```

---

## Example API Requests (REST Client)

### GET (list offers)
```
GET http://localhost:3000/offers?page=1&limit=10
```

### POST (create offer)
```
POST http://localhost:3000/offers

Content-Type: application/json

{
  "title": "Backend Developer",
  "description": "Short job description",
  "status": "draft"
}
```

### PATCH (update offer)
```
PATCH http://localhost:3000/offers/{{id}}

Content-Type: application/json

{
  "status": "published"
}
```

### DELETE (remove offer)
```
DELETE http://localhost:3000/offers/{{id}}
```

---

##  Technologies Used

- **NestJS**
- **MongoDB (Mongoose)**
- **Jest** for testing
- **class-validator** for DTO validation
- **TypeScript**


---

## 📖 API Docs (Swagger)

Swagger UI is available after starting the app:

- Open **http://localhost:3000/docs**
- OpenAPI JSON: **http://localhost:3000/docs-json**
