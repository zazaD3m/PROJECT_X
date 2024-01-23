import { Button } from "../../components/ui/button";
import { CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import Loader from "../../components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useAdminLoginMutation } from "../../features/auth/authApiSlice";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const [login, { isError, isLoading, isSuccess, error }] =
    useAdminLoginMutation();

  const form = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, reset } = form;

  async function onSubmit(data) {
    await login(data);
  }

  useEffect(() => {
    if (isError) {
      reset();
    }
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isError, isSuccess, reset, navigate]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        autoFocus={true}
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <input type="email" /> */}
            <div className="grid gap-2">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-y-4">
            {isError ? (
              <div className="text-destructive">{error.data.message}</div>
            ) : null}
            {isLoading ? (
              <Loader />
            ) : (
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </>
  );
};
export default LoginForm;
