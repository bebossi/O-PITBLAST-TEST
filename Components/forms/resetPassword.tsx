import { User } from "lucide-react";
import Heading from "../ui/heading";
import Input from "../ui/input";
import { ApolloError } from "@apollo/client";

interface ResetPasswordProps {
  resetError: ApolloError;
  handleEmailForResetPassword: (newValue: string) => void;

  resetPasswordForm: {
    email?: string;
  };
  resetLoading: boolean;
}
const ResetPassword: React.FC<ResetPasswordProps> = ({
  resetError,
  resetPasswordForm,
  resetLoading,
  handleEmailForResetPassword,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="To reset "
        subtitle="your password, please enter your email below. We will send you a request to start the process."
      />
      <Input
        onChange={handleEmailForResetPassword}
        value={resetPasswordForm.email as string}
        type="email"
        id="email"
        label="Email or Username"
        disabled={resetLoading}
        error={resetError}
        required
        icon={<User />}
      />
    </div>
  );
};

export default ResetPassword;
