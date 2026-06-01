import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful!");

      navigate("/admin");

    } catch (error) {

      alert(error.message);

      console.log(error);

    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
          Admin Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="bg-green-700 text-white w-full py-4 rounded-2xl"
          >
            Login
          </button>

        </form>
      </div>
    </section>
  );
}