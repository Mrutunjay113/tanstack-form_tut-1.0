import RegisterForm from "@/lib/Register-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans bg-background">
      <RegisterForm />
    </div>
  );
}
