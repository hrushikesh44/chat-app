import { Github, LogOut, LucideTwitter, MessageCircleMore, User } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="">
      <div className="flex items-center justify-center pt-10 mx-auto">
        <div
          className=" min-w-[70vw] md:min-w-md lg:min-w-lg xl:min-w-xl border border-black/20 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 rounded-lg
           h-16 shadow-xl flex items-center justify-around gap-3 p-3 bg-opacity-10 backdrop-blur-lg"
        >
          <span className=" rounded-lg p-1 hover:scale-105 duration-300 group">
            <a
              href="/profile"
              className="text-neutral-900 flex flex-row font-medium"
            >
              <span className="hidden md:block">Profile </span>
              <User className="size-5 pt-0.5 tracking-normal group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </a>
          </span>
          <span className=" rounded-lg p-1 hover:scale-105 duration-300 group">
            <a
              href="/messages"
              className="text-neutral-900 flex flex-row font-medium"
            >
              <span className="hidden md:block">Messages </span>
              <MessageCircleMore className="size-5 pt-0.5 tracking-normal group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </a>
          </span>
          <span className=" rounded-lg p-1 hover:scale-105 duration-300 group">
            <a
              href="https://github.com/hrushikesh44/chat-app"
              className="text-neutral-900 flex flex-row font-medium"
              target="_blank"
            >
              <span className="hidden md:block">Github </span>
              <Github className="size-5 pt-0.5 tracking-normal group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </a>
          </span>
          <span className=" rounded-lg p-1 hover:scale-105 duration-300 group">
            <a
              href="https://x.com/hrushikesh_44"
              className="text-neutral-900 flex flex-row font-medium"
              target="_blank"
            >
              <span className="hidden md:block">Twitter </span>
              <LucideTwitter className="size-5 pt-0.5 tracking-normal group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </a>
          </span>
          <span className=" rounded-lg p-1 hover:scale-105 duration-300 group">
            <a
              href="/login"
              className="text-neutral-900 flex flex-row font-medium"
            >
              <span className="hidden md:block">Logout </span>
              <LogOut className="size-5 pt-0.5 tracking-normal group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
