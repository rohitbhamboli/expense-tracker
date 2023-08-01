export const initialState = localStorage.getItem("isLogIn") || null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    localStorage.setItem("isLogIn", action.payload);
    return action.payload;
  }

  return state;
};
