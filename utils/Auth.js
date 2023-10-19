import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

async function Authenticate(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response.data;
}

export async function signUpUser(email, password) {
  return Authenticate("signUp", email, password);
}

export async function logInUser(email, password) {
  return Authenticate("signInWithPassword", email, password);
}
