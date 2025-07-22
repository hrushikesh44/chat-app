import axios from 'axios';
import { useRef } from 'react';
import { apiUrl } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function login() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const res = await axios.post(`${apiUrl}/auth/signin`, {
      email,
      password,
    });

    const jwt = res.data.token;
    localStorage.setItem('token', jwt);
    navigate('/profile');
  }

  return (
    <div className="h-screen flex items-center justify-center">
        <div
          className="flex flex-col items-center justify-center p-6 sm:p-12 border border-zinc-900/10 w-fit
        rounded-xl gap-5 bg-[#f4f4f4] shadow-2xl scroll-pb-20 text-neutral-900"
        >
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight ">Login for Chatter</h1>
          <div className="flex flex-col pb-1 text-lg font-medium w-full">
            <label className="label">
              <span className="label-span pb-1  text-neutral-800">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="border border-zinc-900/10 rounded-md text-md p-3 focus:outline-none focus:ring-0 "
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col pb-1 text-lg font-medium w-full">
            <label className="label">
              <span className="label-span pb-1  text-neutral-800">Password</span>
            </label>
            <input
              type="password"
              placeholder=""
              className="border border-zinc-900/10 rounded-md text-md p-3 focus:outline-none focus:ring-0 "
              ref={passwordRef}
            />
            </div>
            <div
              onClick={() => login()}
              className="flex flex-col pt-5 text-lg font-medium w-full"
            >
              <button className="p-2.5 cursor-pointer border border-white/10 rounded-md bg-neutral-900 shadow-md hover:scale-105 transition duration-300 text-neutral-200">
                Login
              </button>
            </div>
            <p className="text-neutral-600 text-[18px] font-normal mx-auto pt-2">
              Don't have an account?{' '}
              <a
                className="text-blue-600 cursor-pointer"
                href="/signup"
              >
                Sign up
              </a>
            </p>
        </div>
    </div>
  );
};

export default Login;
