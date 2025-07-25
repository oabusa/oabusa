// utils/logout.ts
export const performLogout = () => {
  localStorage.removeItem("authUser");
};
