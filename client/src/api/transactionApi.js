import axios from "axios";

export const getExpense = async () => {
  try {
    const response = await axios({
      url: "/get-expense",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getIncome = async () => {
  try {
    const response = await axios({
      url: "/get-income",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//add

export const addExpense = async (data) => {
  try {
    const res = await axios({
      url: "/add-expense",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const addIncome = async (data) => {
  try {
    const res = await axios({
      url: "/add-income",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteIncome = async (id) => {
  try {
    const res = await axios({
      url: `/delete-income/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteExpense = async (id) => {
  try {
    const res = await axios({
      url: `/delete-expense/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
