const axios = require("axios");

const { USER_URL, ADMIN_URL, FORUM_URL, CHAT_URL, SCHEDULE_URL, DAILY_URL } =
  process.env;

const userAPI = axios.create({
  baseURL: "http://user-service:4001",
});

const adminAPI = axios.create({
  baseURL: "http://admin-service:4002",
});

const forumAPI = axios.create({
  baseURL: "http://forum-service:4003",
});

const chatAPI = axios.create({
  baseURL: "http://chat-service:4004",
});

const scheduleAPI = axios.create({
  baseURL: "http://schedule-service:4005",
});

const dailyAPI = axios.create({
  baseURL: "http://daily-service:4006",
});

module.exports = {
  userAPI,
  adminAPI,
  forumAPI,
  chatAPI,
  scheduleAPI,
  dailyAPI,
};
