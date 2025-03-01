import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 font-bold ${
            isLogin
              ? "text-rose-800 border-b-2 border-b-rose-800"
              : "text-gray-500"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 font-bold ${
            !isLogin
              ? "text-rose-800 border-b-2 border-b-rose-800"
              : "text-gray-500"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
