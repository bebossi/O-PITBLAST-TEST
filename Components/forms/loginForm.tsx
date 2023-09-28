import { ApolloError } from "@apollo/client";
import Heading from "../ui/heading";
import Input from "../ui/input";
import { STEPS } from "@/app/(root)/page";
import { User, Lock } from "lucide-react";

interface LoginFormProps {
  loginError: ApolloError;
  handleEmailUserNameChange: (newValue: string) => void;
  handlePasswordChange: (newValue: string) => void;
  loginForm: {
    email?: string;
    userName?: string;
    password: string;
  };
  loginLoading: boolean;
  setStep: (step: STEPS) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginError,
  handleEmailUserNameChange,
  handlePasswordChange,
  loginForm,
  loginLoading,
  setStep,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        error={loginError}
        title="Welcome, "
        subtitle="sign in to access your account!"
        errrorTitle="Ops!"
        errorSubtitle="It was not possible to connect your account. Verify your username and password and try again!"
      />
      <Input
        onChange={handleEmailUserNameChange}
        value={(loginForm.email || loginForm.userName) as string}
        type="email"
        id="email"
        label="Email or Username"
        disabled={loginLoading}
        error={loginError}
        required
        icon={<User />}
      />
      <Input
        onChange={handlePasswordChange}
        value={loginForm.password}
        id="password"
        label="Password"
        type="password"
        disabled={loginLoading}
        error={loginError}
        required
        icon={<Lock />}
      />
      <div className="flex justify-end">
        <p
          onClick={() => setStep(STEPS.RESET_PASSWORD)}
          className="text-black hover:cursor-pointer w-fit"
        >
          {" "}
          <span className="font-semibold border-b-[1px] border-red-500 text-red-500">
            Forgot
          </span>{" "}
          your password?
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
