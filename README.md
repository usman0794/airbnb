# Wanderlust

Wanderlust is a full-stack **Airbnb-style property listing platform** built with Node.js, Express, MongoDB, and EJS. Users can browse stays, create and manage their own listings, upload images, view locations on a map, and leave reviews.

## Features

- 🏠 Browse property listings
- 🔐 User registration, login, and logout
- 👤 Session-based authentication with Passport
- ➕ Create new listings
- ✏️ Edit and delete owned listings
- 🖼️ Cloudinary image uploads
- 🗺️ Mapbox location mapping
- ⭐ Ratings and reviews
- 🔒 Owner-only listing management
- 🛡️ Review author authorization
- ✅ Joi form validation
- 💬 Flash messages for success and errors
- 📱 Responsive EJS interface
- 💰 Price display with optional tax information
- ☁️ MongoDB Atlas session storage

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Frontend:** EJS, EJS Mate, Bootstrap, JavaScript

**Authentication:** Passport.js, passport-local-mongoose, Express Session

**Validation:** Joi

**Image Storage:** Cloudinary, Multer

**Maps & Geolocation:** Mapbox SDK

**Other:** Connect Mongo, Connect Flash, Method Override, dotenv

## Architecture

```text
              ┌──────────────────────┐
              │     EJS + Bootstrap  │
              │      Frontend        │
              └──────────┬───────────┘
                         │
                         │ HTTP Requests
                         ▼
              ┌──────────────────────┐
              │   Express.js Server  │
              │                      │
              │ Routes • Controllers │
              │ Middleware • Auth    │
              └───────┬──────┬───────┘
                      │      │
             ┌────────┘      └───────────┐
             ▼                            ▼
      ┌──────────────┐            ┌──────────────┐
      │   MongoDB    │            │  Cloudinary  │
      │ Listings     │            │    Images    │
      │ Users        │            └──────────────┘
      │ Reviews      │
      └──────────────┘
                      │
                      ▼
               ┌──────────────┐
               │    Mapbox    │
               │ Geocoding /  │
               │     Maps     │
               └──────────────┘
```

## Project Structure

```text
wanderlust/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── users/
│   └── error.ejs
│
├── public/
│   ├── css/
│   └── js/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
└── package.json
```

## Core Models

### Listing

Each listing contains:

```text
Title
Description
Price
Location
Country
Image
Owner
Reviews
GeoJSON Coordinates
```

### User

Users contain:

```text
Username
Email
Password
```

Authentication is handled by `passport-local-mongoose`.

### Review

Reviews contain:

```text
Rating (1–5)
Comment
Author
Created At
Updated At
```

## Authentication & Authorization

Wanderlust uses Passport Local authentication with Express sessions.

### Public users can

- Browse listings
- View listing details
- View reviews

### Authenticated users can

- Create listings
- Add reviews
- Delete their own reviews
- Manage their own listings

### Listing owners can

- Edit their listings
- Delete their listings

Authorization middleware verifies ownership before protected listing actions.

## Listings

The main listing routes are:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Listing creation form |
| POST | `/listings` | Create listing |
| GET | `/listings/:id` | View listing |
| GET | `/listings/:id/edit` | Edit form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

Listing creation uses Mapbox geocoding to convert the entered location into coordinates.

## Reviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewid` | Delete review |

Reviews are validated with Joi and linked to both the listing and the author.

When a listing is deleted, its associated reviews are also removed from MongoDB.

## Image Uploads

Listing images are uploaded using:

```text
Multer
    ↓
Cloudinary Storage
    ↓
Cloudinary URL
    ↓
MongoDB Listing
```

Supported image formats:

```text
PNG
JPG
JPEG
```

Images are stored in the Cloudinary folder:

```text
wanderlust_DEV
```

## Maps

Mapbox is used for location search and map display.

When a listing is created:

```text
Location
   ↓
Mapbox Geocoding API
   ↓
GeoJSON Coordinates
   ↓
MongoDB Listing
   ↓
Mapbox Map
```

Each listing can display its location with a map marker.

## Validation & Error Handling

The application uses:

- Joi for request validation
- Custom `ExpressError` handling
- Async error wrapper middleware
- Express error pages
- Flash messages for user feedback
- Authentication and ownership middleware

## Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=<mongodb-atlas-connection-string>

SECRET=<session-secret>

CLOUD_NAME=<cloudinary-cloud-name>
CLOUD_API_KEY=<cloudinary-api-key>
CLOUD_API_SECRET=<cloudinary-api-secret>

MAP_TOKEN=<mapbox-access-token>
```

Never commit `.env` or cloud credentials to the repository.

## Installation

### Prerequisites

- Node.js 22+
- npm
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` and add:

```env
ATLASDB_URL=<your-mongodb-url>
SECRET=<your-session-secret>
CLOUD_NAME=<your-cloudinary-name>
CLOUD_API_KEY=<your-cloudinary-key>
CLOUD_API_SECRET=<your-cloudinary-secret>
MAP_TOKEN=<your-mapbox-token>
```

### 4. Start the application

```bash
node app.js
```

The application runs on:

```text
http://localhost:8080
```

For development, you can also use a Node.js development runner such as `nodemon`.

## Sample Data

The project includes sample listing data in:

```text
init/data.js
```

To initialize the sample database:

```bash
node init/index.js
```

The initialization script connects to MongoDB, clears existing listings, and inserts the sample listings.

## Main Pages

| Page | Purpose |
|---|---|
| `/listings` | Browse available listings |
| `/listings/new` | Create a listing |
| `/listings/:id` | Listing details, reviews, and map |
| `/listings/:id/edit` | Edit an owned listing |
| `/signup` | Register |
| `/login` | Login |

## Security

The application includes:

- Passport-based authentication
- Session-based authorization
- HTTP-only session cookies
- Listing ownership checks
- Review author checks
- Joi input validation
- Environment-based secrets

For production, use secure credentials, HTTPS, restricted API keys, and production-specific configuration.

## License

This project is licensed under the MIT License.
