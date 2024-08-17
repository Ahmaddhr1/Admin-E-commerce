"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { CircleSpinner } from "react-spinners-kit";

export default function Home() {
  const [adminname, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!adminname || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        adminname,
        password,
      });
      setIsLoading(false);

      if (result.ok) {
        router.push("/dashboard");
      } else {
        console.error(result.error);
        alert("Invalid credentials!");
      }
    } catch (e) {
      console.error("Error:", e.message);
      alert("An unexpected error occurred!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full padding md:w-[450px] md:mx-auto">
      <div className="flex flex-col items-center mb-4 w-full">
        <h1 className="text-2xl font-semibold">Hello There.!</h1>
        <p className="text-gray-600">Login using admin credentials!</p>
      </div>
      <form className="flex gap-3 flex-col w-full" onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Admin Name"
          icon="envelope"
          value={adminname}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-start md:w-[130px] w-full md:mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center md:w-[120px] w-full mt-3">
              <CircleSpinner size={30} color="#d90f0f" />
            </div>
          ) : (
            <Button
              style="btn-1"
              text="Login"
              icon="angle-small-right"
              type="submit"
            />
          )}
        </div>
      </form>
    </main>
  );
}
