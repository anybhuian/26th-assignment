import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  
  login: (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    set({ user: userData, token });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  updateUser: (updatedData) => {
    localStorage.setItem('user', JSON.stringify(updatedData));
    set({ user: updatedData });
  }
}));

export default useAuthStore;