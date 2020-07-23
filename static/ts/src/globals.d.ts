import "@testing-library/jest-dom/extend-expect";

interface User {
  username: string;
  isAuthenticated: boolean;
}

declare global {
  interface Window {
    user: User;
  }
}
