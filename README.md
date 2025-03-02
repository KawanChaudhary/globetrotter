# Globetrotter

Welcome to Globetrotter, an engaging quiz application that tests your knowledge about the world. This project includes both backend and frontend components, and this README will guide you through setting up and running the project.

## 📹 Short Video

https://github.com/KawanChaudhary/globetrotter/blob/main/quiz.mp4

Created a short video showcasing the Globetrotter app in action. Highlight the following features:
1. User registration and login.
2. Starting a quiz and answering questions.
3. Viewing the leaderboard.
4. Sharing quiz results on social media.
5. Celebrating high scores with animations.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/KawanChaudhary/globetrotter.git
   cd globetrotter/server
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file:**
   ```sh
   touch .env
   ```

4. **Add the following environment variables to the `.env` file:**
   ```env
   MONGODB_URI= mongodb uri
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   PORT=5000
   ACCESS_TOKEN_EXPIRATION=1h
   REFRESH_TOKEN_EXPIRATION=2h
   FRONTEND_URL= Your frontend url
   ```

5. **Start the backend server:**
   ```sh
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd ../client
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file:**
   ```sh
   touch .env
   ```

4. **Add the following environment variables to the `.env` file:**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start the frontend development server:**
   ```sh
   npm start
   ```

## 📚 Libraries Used

### Backend

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **bcryptjs**: For hashing passwords.
- **uuid**: For generating unique identifiers.
- **dotenv**: For managing environment variables.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library.
- **react-redux**: Official React bindings for Redux.
- **redux-saga**: Middleware for handling side effects in Redux.
- **axios**: Promise-based HTTP client.
- **react-router-dom**: Declarative routing for React.
- **tailwindcss**: Utility-first CSS framework.
- **@heroicons/react**: Beautiful hand-crafted SVG icons.
- **lottie-react**: Library for rendering Lottie animations.
- **html-to-image**: Library for converting HTML to images.

## 📄 Project Structure

```plaintext
globetrotter/
├── client/                # Frontend code
│   ├── public/
│   ├── src/
│   │   ├── assets/        # Images, animations, etc.
│   │   ├── components/    # React components
│   │   ├── pages/         # React pages
│   │   ├── store/         # Redux store
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
├── server/                # Backend code
│   ├── controllers/       # Express controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── helpers/           # Helper functions
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── ...
├── README.md
├── package.json
└── ...
```

## 📞 Contact

For any questions or feedback, please reach out to [your email address].

Happy coding!
