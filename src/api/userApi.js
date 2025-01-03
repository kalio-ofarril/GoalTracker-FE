import axios from "axios";

const login = async (email, password) => {
  return await axios.post(
    `${import.meta.env.VITE_GOAL_TRACKER_BE_URL}/users/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const loginGoogle = async (email) => {
  return await axios.post(
    `${import.meta.env.VITE_GOAL_TRACKER_BE_URL}/users/logingoogle`,
    {
      email: email,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const signUp = async (email, password) => {
  return await axios.post(
    `${import.meta.env.VITE_GOAL_TRACKER_BE_URL}/users/signup`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const signUpGoogle = async (email) => {
  return await axios.post(
    `${import.meta.env.VITE_GOAL_TRACKER_BE_URL}/users/signupgoogle`,
    {
      email: email,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

export { login, signUp, signUpGoogle, loginGoogle };
