import React, { useContext } from "react";
import { AuthContext, AuthContextProps } from "../Auth/AuthContext.tsx";
import { getAuth, signOut } from "firebase/auth";

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
  const { user, loading, userProfile } = useContext(
    AuthContext,
  ) as AuthContextProps;

  const RenderAdminButton = () => {
    if (!user) return <RenderAnchor href={"/login"} value={"Logg inn"} />;

    return (
      <>
        {userProfile?.isSiteAdmin && (
          <RenderAnchor href={"/upload"} value={"Last opp"} />
        )}

        <RenderAnchor
          href={"/logout"}
          value={"Logg ut"}
          onClick={() => {
            const auth = getAuth();

            signOut(auth).then(() => {
              console.log("User signed out!");
            });
          }}
        />
      </>
    );
  };

  return (
    <nav
      className={`flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 justify-between p-4 ${loading ? "opacity-0" : "opacity-100"} transition-all duration-200 transform`}
    >
      <div className="flex space-x-4 md:space-x-8">
        <RenderAnchor href="/" value="Hjem" />
        <RenderAnchor href="/about" value="Om oss" />
        <RenderAnchor href="/contact" value="Kontakt" />
      </div>

      <div className="flex md:space-x-8 space-x-4">
        <RenderAdminButton />
      </div>
    </nav>
  );
};

export default Navbar;
