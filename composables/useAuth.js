import { useAuthStore } from "~/store/auth";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  onMounted(() => {
    if (process.client) {
      const storedUser = localStorage.getItem("auth_user");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        authStore.user = JSON.parse(storedUser);
        authStore.token = storedToken;
      }
    }
  });

  const login = async (credentials) => {
    const response = await authStore.login(credentials);
    return response;
  };

  const register = async (userData) => {
    const response = await authStore.register(userData);
    return response;
  };

  const logout = async () => {
    await authStore.logout();
  
    if (process.client) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  
    router.push("/login");
  };
  

  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const user = computed(() => authStore.user);

  return {
    login,
    register,
    logout,
    isAuthenticated,
    user,
  };
};
