"use client";

import Modal from "@/Components/modal";
import LogoSVG from "@/public/logo";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  companyName: string;
  companyPosition: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  type: string;
}
const ProtectedPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    setUser(JSON.parse(userString as string));
  }, []);

  let bodyContent = (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Welcome to admin 2.0</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-sm font-medium">ID:</div>
        <div className="text-sm font-light">{user?._id}</div>

        <div className="text-sm font-medium">Company Name:</div>
        <div className="text-sm font-light">{user?.companyName}</div>

        <div className="text-sm font-medium">Company Position:</div>
        <div className="text-sm font-light">{user?.companyPosition}</div>

        <div className="text-sm font-medium">Email:</div>
        <div className="text-sm font-light">{user?.email}</div>

        <div className="text-sm font-medium">First Name:</div>
        <div className="text-sm font-light">{user?.firstName}</div>

        <div className="text-sm font-medium">Last Name:</div>
        <div className="text-sm font-light">{user?.lastName}</div>

        <div className="text-sm font-medium">Status:</div>
        <div className="text-sm font-light">{user?.status}</div>

        <div className="text-sm font-medium">Type:</div>
        <div className="text-sm font-light">{user?.type}</div>
      </div>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      isOpen
      title={<LogoSVG />}
      secondaryActionLabel={<MoveLeft />}
      secondaryAction={() => {
        router.push("/");
      }}
    />
  );
};
export default ProtectedPage;
