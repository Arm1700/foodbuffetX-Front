// src/shared/api/authService.js

let logoutHandler = null;

export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

export const logout = () => {
  if (logoutHandler) {
    logoutHandler();
  }
};
