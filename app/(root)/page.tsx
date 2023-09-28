"use client";
import { ApolloError, useMutation } from "@apollo/client";
import Modal from "@/Components/modal";
import { LOGIN_MUTATION } from "@/Apollo/mutations/Login";
import { useEffect, useMemo, useState } from "react";
import Heading from "@/Components/ui/heading";
import { Check, MoveLeft, ChevronRightSquare, AlertCircle } from "lucide-react";
import { FORGOT_PASSWORD } from "@/Apollo/mutations/ForgotPassword";
import { useRouter } from "next/navigation";
import LogoSVG from "@/public/logo";
import LoginForm from "@/Components/forms/loginForm";
import ResetPassword from "@/Components/forms/resetPassword";

interface FormData {
  email?: string;
  password?: string;
  userName?: string;
}
export enum STEPS {
  LOGIN = 0,
  RESET_PASSWORD = 1,
  MESSAGE = 2,
}

export default function Home() {
  const router = useRouter();
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [step, setStep] = useState(STEPS.LOGIN);
  const [loginForm, setLoginForm] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [resetPasswordForm, setResetPasswordForm] = useState({ email: "" });

  const [login, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);
  const [resetPassword, { loading: resetLoading, error: resetError }] =
    useMutation(FORGOT_PASSWORD);

  let bodyContent: any;

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  }, [loginError]);

  const onBack = () => {
    if (step === STEPS.RESET_PASSWORD) {
      setStep(STEPS.LOGIN);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOGIN) {
      return <Check size={50} />;
    }
    return <ChevronRightSquare size={35} />;
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.RESET_PASSWORD) {
      return <MoveLeft />;
    }

    return undefined;
  }, [step]);

  const onSubmit = async (formData: FormData) => {
    try {
      if (step === STEPS.RESET_PASSWORD) {
        await resetPassword({
          variables: {
            email: formData.email,
          },
        });
        setStep(STEPS.MESSAGE);
      }
      if (step === STEPS.LOGIN) {
        const { data } = await login({
          variables: {
            email: formData.email || formData.userName,
            password: formData.password,
          },
        });
        setLoginSuccessful(true);
        const user = JSON.stringify(data.login.user);
        localStorage.setItem("user", user);
        localStorage.setItem("jwt", data.login.jwt);
        setTimeout(() => {
          router.push("/protected");
        }, 1000);
      }
      if (step === STEPS.MESSAGE) {
        setStep(STEPS.LOGIN);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleEmailUserNameChange = (newValue: string) => {
    if (newValue.includes("@")) {
      setLoginForm({ ...loginForm, email: newValue });
    } else {
      setLoginForm({ ...loginForm, userName: newValue });
    }
  };

  const handlePasswordChange = (newValue: string) => {
    setLoginForm({ ...loginForm, password: newValue });
  };

  const handlEmailForResetPassword = (newValue: string) => {
    setResetPasswordForm({ ...resetPasswordForm, email: newValue });
  };

  bodyContent = (
    <LoginForm
      handleEmailUserNameChange={handleEmailUserNameChange}
      loginError={loginError as ApolloError}
      loginForm={loginForm}
      handlePasswordChange={handlePasswordChange}
      loginLoading={loginLoading}
      setStep={() => setStep(STEPS.RESET_PASSWORD)}
    />
  );

  if (step === STEPS.RESET_PASSWORD) {
    bodyContent = (
      <ResetPassword
        handleEmailForResetPassword={handlEmailForResetPassword}
        resetError={resetError as ApolloError}
        resetLoading={resetLoading}
        resetPasswordForm={resetPasswordForm}
      />
    );
  }

  if (step === STEPS.MESSAGE) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="We sent you "
          subtitle="an e-mail so you can create a new password"
        />
      </div>
    );
  }

  const LoadingContent = () => (
    <div className="w-40 h-40 bg-red-500 text-white flex justify-center items-center rounded-xl ml-60 transition duration-200 ease-in-out">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-r-4 border-b-4 border-white rounded-full animate-spin"></div>
        <p>Login in...</p>
      </div>
    </div>
  );

  const SuccessContent = () => (
    <div className="w-40 h-40 bg-green-500 text-white flex flex-col justify-center items-center rounded-xl ml-60 transition duration-500 ease-in-out opacity-100">
      <div className="flex flex-col justify-center items-center">
        <Check size={50} />
        <p>Success</p>
      </div>
    </div>
  );

  const ErrorContent = () => (
    <div className="hover:cursor-pointer  text-white flex flex-col justify-center items-center rounded-xl  transition duration-500 ease-in-out opacity-100">
      <div className="flex flex-col bg-orange-500 justify-center items-center p-6 rounded-xl">
        <AlertCircle size={60} />
        <p>Error!</p>
      </div>
      <Heading
        title="Ops!"
        subtitle="it was not possible to connect to your account. Try again."
      />
    </div>
  );

  if (loginLoading) {
    bodyContent = <LoadingContent />;
  }

  if (loginSuccessful) {
    bodyContent = <SuccessContent />;
  }

  if (loginError) {
    bodyContent = <ErrorContent />;
  }

  let isDisabled = false;

  if (loginLoading || loginSuccessful || loginError) {
    isDisabled = true;
  }

  return (
    <div>
      <Modal
        onSubmit={
          step === STEPS.LOGIN
            ? () => onSubmit(loginForm)
            : () => onSubmit(resetPasswordForm)
        }
        isOpen
        title={<LogoSVG />}
        actionLabel={actionLabel}
        body={bodyContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={onBack}
        disabled={isDisabled}
      />
    </div>
  );
}
