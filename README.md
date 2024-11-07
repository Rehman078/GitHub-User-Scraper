# 🚀 GitHub User Scraper Application (MERN)

A full-stack GitHub User Scraper application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This application enables users to search for and view GitHub profiles, providing a list of scraped user data for convenient access.

## 📖 Features

- **GitHub User Search**: Search for GitHub profiles by username.
- **Profile Data Display**: View key details of each GitHub user, such as repositories, followers, and bio.
- **Responsive Design**: Beautiful, responsive UI powered by Bootstrap.
- **Real-time Data**: Scrapes and displays live GitHub profile data using Puppeteer.

## 🖥️ Tech Stack

**Frontend**  
- **React**: Component-based JavaScript library for building UIs.
- **Axios**: For making API requests to the backend.
- **Bootstrap**: For responsive and styled components.
- **React Router**: For seamless navigation between pages.

**Backend**  
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web server framework.
- **Axios**: For making HTTP requests to GitHub.
- **Puppeteer**: Headless browser for scraping GitHub profile data.
- **MongoDB**: Database to store user data.
- **Mongoose**: MongoDB object modeling.
- **Body-parser**: Middleware for parsing request bodies.
- **CORS**: Middleware to enable cross-origin resource sharing.
- **Dotenv**: For managing environment variables.
- **Nodemon**: Development tool for automatically restarting the server.

## 📂 Project Structure

```plaintext
GitHub-User-Scraper/
├── client/            # React frontend
│   ├── public/
│   └── src/
├── server/            # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env               # Environment variables
├── package.json       # Project configuration
└── README.md          # Project documentation

