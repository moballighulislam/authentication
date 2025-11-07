import { create } from "zustand";

type userInfo = {
  username: string;
  password: string;
  isAuthenticated: boolean;
};

const userInfo = {
  username: "",
};

const useStore = create((set) => ({
  userInfo: {},
}));
