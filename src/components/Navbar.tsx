import { useState } from "react";
import Modal from "./Modal";

const RenderAnchor: React.FC<{
  href: string;
  value: string;
  onClick?: () => void;
}> = ({ href, value, onClick }) => {
  return (
    <a
      href={href}
      className="text-xl leading-relaxed text-neutral-800 hover:text-blue-700 dark:text-neutral-400 tracking-wide"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {value}
    </a>
  );
};

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-8">
        <RenderAnchor href="/" value="Hjem" />
        <RenderAnchor href="/about" value="Om oss" />
        <RenderAnchor href="/contact" value="Kontakt" />
      </div>

      <div className="flex items-center space-x-4">
        <RenderAnchor
          href="/"
          value="Login"
          onClick={() => {
            setIsLoginModalOpen(!isLoginModalOpen);
          }}
        />
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Login"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-neutral-800 dark:text-neutral-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-neutral-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-neutral-800 dark:text-neutral-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-neutral-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </Modal>
    </nav>
  );
};

export default Navbar;
