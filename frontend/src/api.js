const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};

export const checkEmail = async (email) => {
  const res = await fetch(`${BASE_URL}/check_email`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email})
  });
  return res.json();
};

export const checkPassword = async (password) => {
  const res = await fetch(`${BASE_URL}/check_password`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({password})
  });
  return res.json();
};

export const checkUsername = async (username) => {
  const res = await fetch(`${BASE_URL}/check_username`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username})
  });
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`);
  return res.json();
};

export const sendChatMessage = async (message) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  return res.json();
};