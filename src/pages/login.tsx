import React, { type ReactElement } from "react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Typography from "@/ui/Typography";
import GuestLayout from "@/components/GuestLayout";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response?.data);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex w-full flex-col gap-6"
    >
      <Typography variant="headline" classes="text-center">
        Login
      </Typography>
      <Input
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        errors={errors}
        type="email"
      />
      <Input
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        errors={errors}
        type="password"
      />
      <Button size="medium" rounded="md" classes="w-full">
        Submit
      </Button>
    </form>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Login;
