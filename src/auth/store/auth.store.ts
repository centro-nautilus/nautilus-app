import { create } from 'zustand'
import { loginUser } from '../actions/login-user.action'
import { persist, createJSONStorage } from 'zustand/middleware';
import { logoutUser } from '../actions/logout-user.action';

type AuthState = {
  role: string | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null,
  setToken: (token: string | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setToken: (token: string | null) => {
        set({ token, isAuthenticated: true});
      },
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await loginUser(email, password);
          set({
            token: data.token,
            role: data.role,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (err) {
          set({
            role: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Credenciales inválidas',
          });
        }
      },
      logout: async () => {
        try {
          await logoutUser()
        } catch (error) {
          console.error("Error al cerrar sesión en servidor", error);
        } finally {
          set({
            role: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);