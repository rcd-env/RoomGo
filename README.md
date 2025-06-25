# RoomGo 🏠

A full-stack room/accommodation booking platform built with Node.js, Express, and MongoDB. RoomGo allows users to list their properties, browse available accommodations, make bookings, and manage their hosted spots.

![RoomGo Logo](public/images/RoomGO_Logo.png)

## 🌟 Features

### 🏡 Property Management

- **List Properties**: Host your space with detailed descriptions, photos, and pricing
- **Image Upload**: Secure image storage using Cloudinary
- **Edit/Delete Listings**: Full CRUD operations for property owners
- **Interactive Maps**: Location visualization using Leaflet

### 📅 Booking System

- **Real-time Booking**: Calendar-based date selection
- **Price Calculation**: Automatic pricing with GST inclusion
- **Booking Prevention**: Smart system prevents duplicate bookings
- **Booking Management**: View and cancel bookings from user profile

### 👤 User Authentication & Profiles

- **Secure Authentication**: Passport.js with local strategy
- **User Profiles**: Comprehensive profile pages
- **Session Management**: MongoDB session store for scalability
- **Flash Messages**: User feedback system

### ⭐ Review System

- **Rating & Reviews**: 5-star rating system with detailed reviews
- **Review Validation**: Joi-based input validation
- **User Authorization**: Only authenticated users can review

### 🎨 Modern UI/UX

- **Responsive Design**: Bootstrap 5 with custom styling
- **Interactive Modals**: Smooth booking and confirmation dialogs
- **Flash Notifications**: Bottom-screen notifications
- **Clean Interface**: Modern, user-friendly design

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend

- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Leaflet** - Interactive maps

### Authentication & Security

- **Passport.js** - Authentication middleware
- **Express-session** - Session management
- **Connect-mongo** - MongoDB session store
- **Joi** - Input validation

### File Upload & Storage

- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization

### Additional Tools

- **Connect-flash** - Flash message middleware
- **Cookie-parser** - Cookie parsing
- **Dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Cloudinary Account](https://cloudinary.com/) (for image storage)

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd RoomGo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   MONGO_URL=mongodb://localhost:27017/roomgo
   # or for MongoDB Atlas:
   # MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/roomgo

   # Session Secret
   SESSION_SECRET=your-super-secret-key-here

   # Cloudinary Configuration
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Maps API (Optional)
   MAP_TILES_API_KEY=your-map-tiles-api-key

   # Environment
   NODE_ENV=development
   ```

4. **Start the application**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

5. **Access the application**

   Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
RoomGo/
├── controllers/          # Route handlers
│   ├── auth.controller.js
│   ├── booking.controller.js
│   ├── lists.controller.js
│   └── reviews.controller.js
├── models/              # Database schemas
│   ├── booking.model.js
│   ├── list.model.js
│   ├── review.model.js
│   └── user.model.js
├── routes/              # Route definitions
│   ├── auth.route.js
│   ├── booking.route.js
│   ├── list.route.js
│   └── review.route.js
├── middlewares/         # Custom middleware
│   ├── isAuthor.middleware.js
│   ├── isLoggedIn.middleware.js
│   ├── isOwner.middleware.js
│   ├── savedRedirectUrl.middleware.js
│   ├── validateList.middleware.js
│   └── validateReview.middleware.js
├── views/               # EJS templates
│   ├── includes/        # Partial templates
│   ├── layouts/         # Layout templates
│   ├── lists/           # Property-related views
│   ├── users/           # User-related views
│   └── bookings/        # Booking-related views
├── public/              # Static files
│   ├── stylesheets/     # CSS files
│   ├── javascripts/     # Client-side JS
│   └── images/          # Static images
├── db/                  # Database configuration
├── utils/               # Utility functions
├── app.js               # Main application file
├── cloudConfig.js       # Cloudinary configuration
└── package.json         # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication

- `GET /auth/signup` - Registration page
- `POST /auth/signup` - Create new user
- `GET /auth/login` - Login page
- `POST /auth/login` - Authenticate user
- `POST /auth/logout` - Logout user

### Properties/Lists

- `GET /lists` - View all properties
- `GET /lists/new` - Create property form
- `POST /lists` - Create new property
- `GET /lists/:id` - View property details
- `GET /lists/:id/edit` - Edit property form
- `PUT /lists/:id` - Update property
- `DELETE /lists/:id` - Delete property

### Bookings

- `POST /lists/:id/book` - Create booking
- `POST /lists/:id/book/cancel/:bookingId` - Cancel booking
- `GET /profile` - User profile with bookings

### Reviews

- `POST /lists/:id/reviews` - Add review
- `DELETE /lists/:id/reviews/:reviewId` - Delete review

## 🎯 Key Features Explained

### Smart Booking System

- **Date Validation**: Prevents booking past dates or invalid date ranges
- **Duplicate Prevention**: Users cannot book the same property twice
- **Price Calculation**: Automatic calculation including 18% GST
- **Modal Interface**: Smooth user experience with date pickers

### Authorization & Security

- **Route Protection**: Middleware ensures users can only modify their own content
- **Session Security**: Secure session management with MongoDB store
- **Input Validation**: Server-side validation using Joi schemas
- **CSRF Protection**: Built-in Express security features

### File Upload System

- **Image Optimization**: Cloudinary automatically optimizes uploaded images
- **Format Validation**: Only allows JPEG, PNG, and JPG formats
- **Secure Storage**: Images stored securely in cloud storage

## 🔒 Security Features

- **Authentication**: Passport.js local strategy with password hashing
- **Authorization**: Role-based access control for CRUD operations
- **Input Validation**: Joi schemas prevent malicious input
- **Session Security**: Secure session configuration with httpOnly cookies
- **Environment Variables**: Sensitive data protected via environment variables

## 🚀 Deployment

### Environment Setup for Production

1. Set `NODE_ENV=production` in your environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Configure proper session secrets
4. Set up Cloudinary for image storage
5. Configure reverse proxy (nginx) if needed

### Recommended Hosting Platforms

- **Heroku** - Easy deployment with MongoDB Atlas
- **Railway** - Modern platform with great developer experience
- **DigitalOcean App Platform** - Scalable and reliable
- **AWS/Azure/GCP** - For enterprise-level deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:

- ✅ **Use** - Use the code for any purpose
- ✅ **Modify** - Change the code as needed
- ✅ **Distribute** - Share the original or modified code
- ✅ **Commercial Use** - Use in commercial applications
- ✅ **Private Use** - Use in private/internal projects
- ❗ **Attribution Required** - Must include the original license notice

## 👨‍💻 Author

**Rakesh Das**

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- **Bootstrap** for the responsive UI framework
- **MongoDB** for the robust database solution
- **Cloudinary** for image storage and optimization
- **Leaflet** for interactive maps
- **Express.js** community for excellent middleware

---

**Happy Coding! 🎉**
