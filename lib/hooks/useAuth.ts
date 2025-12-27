import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAuth() {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);

    if (success) {
      toast.success("Login successful!");
      router.push("/dashboard");
      return true;
    } else {
      toast.error("Invalid credentials");
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return {
    isAuthenticated,
    user,
    handleLogin,
    handleLogout,
  };
}
