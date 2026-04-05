# YelpCamp

A modern, full-stack web application for reviewing and sharing campgrounds. This project is a feature-rich clone of a popular campsite directory, built with Node.js, Express, and MongoDB.

![YelpCamp Hero](camp.png)

## 🌟 Key Features

-   **User Authentication & Authorization**: Secure sign-up, login, and logout. Users can only edit/delete their own campgrounds and reviews.
-   **Campground Management**: Full CRUD (Create, Read, Update, Delete) operations for campsites.
-   **Review System**: Users can rate (1-5 stars) and leave comments on campgrounds.
-   **Image Upload**: Seamless image hosting and management via Cloudinary.
-   **Security**: Implementation of `mongo-sanitize`, `sanitize-html`, and common OWASP security practices.
-   **Responsive UI**: Sleek, responsive design built with EJS templates and modern CSS.
-   **Database Seeding**: Easily populate the database with dummy data for testing.
-   **Session & Flash Messaging**: Real-time feedback for user actions (success/error messages).

## 🛠️ Technology Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Frontend**: EJS (Embedded JavaScript), ejs-mate for layouts
-   **Authentication**: Passport.js with Local Strategy
-   **Image Storage**: Cloudinary (via Multer)
-   **Validation**: Joi (Schema validation)
-   **Styling**: Vanilla CSS, Bootstrap (for layout components)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14+)
-   [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas)
-   A [Cloudinary](https://cloudinary.com/) account for image uploads

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd YelpCamp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory and add your credentials:
    ```env
    DB_URL=mongodb://localhost:27017/yelpcamp
    SECRET=your_long_secret_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_KEY=your_cloudinary_key
    CLOUDINARY_SECRET=your_cloudinary_secret
    ```

4.  **Seed the Database** (Optional but recommended):
    ```bash
    node seeds/index.js
    ```

5.  **Run the Application**:
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

## 📂 Project Structure

```text
├── cloudinary/       # Cloudinary configuration
├── controllers/      # Route logic handlers
├── middleware/       # Custom middleware (auth, validation)
├── models/           # Mongoose schemas (User, Campground, Review)
├── public/           # Static assets (CSS, JS, Images)
├── routers/          # Express route definitions
├── seeds/            # Database seeding scripts & data
├── views/            # EJS templates
├── app.js            # Entry point of the application
└── joi.js            # Joi validation schemas
```

## 🔒 Security

This application implements several security measures:
-   **Session Cookies**: Configured with `httpOnly` for enhanced security.
-   **Input Sanitization**: Protection against NoSQL injection using `express-mongo-sanitize`.
-   **Safe HTML**: HTML sanitization for user-generated content.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

---
Built with ❤️ by [Your Name]
