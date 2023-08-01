import axios from "axios";

export const loginUser = async ({ email, password }) => {
  try {
    const res = await axios({
      url: "/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email, password }),
    });
    return res.data;
  } catch (error) {
    throw error.res.data;
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await axios({
      url: "/signup",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
    });
    return res.data;
  } catch (error) {
    throw error.res.data;
  }
};

export const authUser = async () => {
  try {
    const response = await axios({
      url: "/profile",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUser = async () => {
  try {
    const response = await axios({
      url: "/getdata",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

//logout user
export const logOutUser = async () => {
  try {
    const response = await axios({
      url: "/logout",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
