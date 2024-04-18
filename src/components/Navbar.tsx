const RenderAnchor: React.FC<{ href: string; value: string }> = ({
  href,
  value,
}) => {
  return (
    <a
      href={href}
      className="text-xl leading-relaxed text-neutral-800 hover:text-blue-700 dark:text-neutral-400 tracking-wide"
    >
      {value}
    </a>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-8">
        <RenderAnchor href="/" value="Home" />
        <RenderAnchor href="/" value="About" />
        <RenderAnchor href="/" value="Contact" />
      </div>

      <div className="flex items-center space-x-4">
        <RenderAnchor href="/" value="Login" />
      </div>
    </nav>
  );
};

export default Navbar;
