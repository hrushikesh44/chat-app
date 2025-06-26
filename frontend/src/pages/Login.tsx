const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" ">
        <div
          className="flex flex-col items-center justify-center p-6 sm:p-12 border border-zinc-900/10 w-fit
        rounded-xl gap-5 bg-[#f4f4f4] shadow-2xl scroll-pb-20 text-neutral-500/75"
        >
          <h1 className="text-3xl font-bold text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#9ea0f7] via-purple-500 to-[#9ea0f7]">
            Login for Chatter
          </h1>
          <div className="flex flex-col pb-1 text-lg font-medium ">
            <label className="label">
              <span className="label-span pb-1  text-neutral-500">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="border border-zinc-900/10 rounded-md text-md p-3 focus:outline-none focus:ring-0 "
            />
          </div>
          {/* <div className="flex flex-col pb-1 text-lg font-medium">
            <label className="label">
              <span className="label-span pb-1 text-neutral-500">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="border border-zinc-900/10 rounded-md text-md p-3 focus:outline-none focus:ring-0 "
            />
          </div> */}
          <div className="flex flex-col pb-1 text-lg font-medium">
            <label className="label">
              <span className="label-span pb-1  text-neutral-500">Password</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-zinc-900/10 rounded-md text-md p-3 focus:outline-none focus:ring-0 "
            />
            <div className="flex flex-col pt-5 text-lg font-medium">
              <button className="p-2.5 cursor-pointer border border-white/10 rounded-md bg-gradient-to-r from-[#9ea0f7] via-purple-500 to-[#9ea0f7] shadow-md hover:scale-105 transition duration-300 text-black/60 hover:text-black/90">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
