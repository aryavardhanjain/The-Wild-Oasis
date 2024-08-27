import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () =>
      toast.success(
        "Account successfully created! Please verify by your email address"
      ),
  });

  return { signup, isLoading };
}
