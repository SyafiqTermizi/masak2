import "@testing-library/jest-dom/extend-expect";

interface User {
  username: string;
  isAuthenticated: boolean;
  userId: string;
}

declare global {
  interface Window {
    user: User;
  }
}
