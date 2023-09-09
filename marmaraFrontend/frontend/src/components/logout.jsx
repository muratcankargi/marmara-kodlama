import React from "react";

export function logout(setIsAuthenticated) {
  setIsAuthenticated(false);
  localStorage.removeItem("auth");
}
