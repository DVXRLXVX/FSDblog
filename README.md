# MyApp - Modern React Blog Platform ✦

MyApp is a modern, responsive, and dynamic blog platform built with React and Material-UI (MUI). It features a beautiful UI with deep purple gradients, glassmorphism elements, and smooth interactions.

## 🚀 Features

- **Dynamic Feed**: View an aggregated list of posts from multiple users, displayed in a clean, two-column CSS grid layout.
- **Floating Modals**: Click "Read More" on any post to view its full contents in a sleek, centered modal dialog with fixed dimensions and internal scrolling.
- **Authentication**: Simple localStorage-based authentication system. Log in to post, log out to view as a guest. Protected routes ensure guests cannot access the post creation page.
- **Local State Management**: When a user creates a new post, it is immediately prepended to the global feed and the user's individual feed. 
- **Dynamic User Creation**: If you log in with an entirely new email and create a post, a new Local User profile is automatically generated and added to the community page.
- **Niche-Specific Content**: The app features 10 pre-generated users, each with a specific niche (e.g., Tech & Startups, Fitness, Cooking) and dozens of highly detailed, realistic posts generated via a custom Node.js script.
- **Community Page**: Browse a table of all users, search by email, view their niches and total post counts, and navigate directly to their individual profiles.

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router v6
- **UI Library**: Material-UI (MUI) v6
- **Styling**: MUI System (`sx` prop), custom themes, and CSS grids.
- **Icons**: `@mui/icons-material`

## 📂 Project Structure

```
hw3-FSDblog/
├── index.html
├── package.json
├── vite.config.js
├── generate_users.js      # Script used to generate long, detailed mock posts
├── src/
│   ├── App.jsx            # Main application root and MUI Theme configuration
│   ├── main.jsx           # React entry point
│   ├── api.js             # API simulation layer (handles mock data and local session state)
│   ├── AuthContext.jsx    # Context provider for authentication
│   ├── data/
│   │   └── users.json     # Pre-generated database of 10 users and 68 long-form posts
│   └── components/
│       ├── TopBar.jsx         # Responsive navigation bar
│       ├── Feed.jsx           # Main home page displaying all posts
│       ├── SinglePost.jsx     # Post card component with modal expansion
│       ├── UsersPage.jsx      # Table view of all community members
│       ├── UserPostsFeed.jsx  # Individual user's profile and post history
│       ├── NewPostPage.jsx    # Protected route for creating new posts
│       ├── LoginPage.jsx      # Login interface
│       ├── SignupPage.jsx     # Signup interface
│       ├── AboutPage.jsx      # Static about page
│       └── ProtectedRoute.jsx # Wrapper component to guard authenticated routes
```

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or download the source):
   ```bash
   cd hw3-FSDblog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **(Optional) Re-generate User Data**:
   If you want to re-generate the `users.json` data with long posts, you can run the node script:
   ```bash
   node generate_users.js
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy

The application utilizes a custom MUI theme centered around a primary purple palette (`#673ab7`). It heavily relies on rounded corners (`borderRadius: 16px`), soft drop shadows, and subtle gradient backgrounds to create a "premium" and engaging user experience. The TopBar specifically removes border radius for a flush, native application feel, while modals use strict height constraints for usability.
