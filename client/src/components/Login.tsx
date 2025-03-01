import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { loginRequest } from '../store/actions/authActions';
import { LockClosedIcon, UserIcon } from '@heroicons/react/20/solid';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ username, password }));
  };

  return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 " />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition duration-200"
            disabled={loading}
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>
  );
};

export default Login;