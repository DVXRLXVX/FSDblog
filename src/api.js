// src/api.js
import usersData from './data/users.json';

// In-memory array to store posts created during the current session
const sessionPosts = [];
// In-memory array to store brand new users who signed up and posted
const sessionUsers = [];

// We simulate asynchronous API calls using Promises with a small delay.
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch paginated posts from all users.
 */
export async function fetchPosts(page = 1, limit = 10) {
  await delay();
  // Extract all posts from all users and flatten them into a single array
  let allPosts = [];
  usersData.forEach(user => {
    user.posts.forEach(post => {
      allPosts.push({
        ...post,
        userId: user.id,
        email: user.email,
        name: user.name,
      });
    });
  });

  // Sort them randomly or consistently (we'll just reverse them so they don't look completely grouped by user)
  allPosts = allPosts.reverse();

  // Prepend session posts so they always appear at the top
  const combinedPosts = [...sessionPosts, ...allPosts];

  const start = (page - 1) * limit;
  return combinedPosts.slice(start, start + limit);
}

/**
 * Fetch paginated users.
 */
export async function fetchUsers(page = 1, limit = 10) {
  await delay();
  const start = (page - 1) * limit;
  // Map users to not include their full post arrays in the user list response to keep it light
  const apiUsers = usersData.map(({ id, name, email, niche, nicheEmoji }) => ({
    id, name, email, niche, nicheEmoji
  }));
  
  const allUsers = [...sessionUsers, ...apiUsers];
  return allUsers.slice(start, start + limit);
}

/**
 * Fetch all posts for a specific user.
 */
export async function fetchPostsByUser(userId) {
  await delay();
  const allUsers = [...sessionUsers, ...usersData];
  const user = allUsers.find(u => String(u.id) === String(userId));
  if (!user) return [];
  
  const apiUserPosts = (user.posts || []).map(post => ({
    ...post,
    userId: user.id,
    email: user.email,
    name: user.name
  }));
  
  const localUserPosts = sessionPosts.filter(p => String(p.userId) === String(userId));
  
  return [...localUserPosts, ...apiUserPosts];
}

/**
 * Get the number of posts for a given userId.
 */
export async function fetchPostCountByUser(userId) {
  await delay(100); // slightly faster for counts
  const allUsers = [...sessionUsers, ...usersData];
  const user = allUsers.find(u => String(u.id) === String(userId));
  const localCount = sessionPosts.filter(p => String(p.userId) === String(userId)).length;
  return (user && user.posts ? user.posts.length : 0) + localCount;
}

/**
 * Create a new post (mock).
 */
export async function createPost(title, body, userEmail) {
  await delay();
  
  // Find the user by email to associate the post correctly
  let user = usersData.find(u => u.email.toLowerCase() === userEmail.toLowerCase()) || 
             sessionUsers.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
             
  if (!user) {
    user = {
      id: `local-user-${Date.now()}`,
      name: userEmail.split('@')[0], // Generate a name from email
      email: userEmail,
      niche: "New Blogger",
      nicheEmoji: "🌱",
      posts: []
    };
    sessionUsers.unshift(user);
  }
  
  const newPost = {
    id: `local-${Date.now()}`,
    title,
    body,
    userId: user.id,
    email: user.email,
    name: user.name,
    isLocal: true
  };
  
  sessionPosts.unshift(newPost); // Add to top
  return newPost;
}
