import React, { FormEventHandler, useState } from "react";
import Title from "../components/Typography/Title.tsx";
import Hint from "../components/Typography/Hint";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getNiceErrorMessage } from "../components/FirebaseFunctions.tsx";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigate();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return false;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        nav("/");

        console.log("User signed in: " + userCredential.user.email);
      })
      .catch((error) => {
        console.log(getNiceErrorMessage(error));
      });
  };

  return (
    <div className={"flex flex-col p-4 flex-grow max-h-[37rem]"}>
      <div className={"flex flex-col flex-grow items-center justify-center"}>
        <div
          className={
            "flex flex-col w-full sm:w-1/2 border border-neutral-400 dark:border-neutral-500 rounded-lg p-4 shadow-sm"
          }
        >
          <div className={"flex flex-col items-center justify-center"}>
            <Title text={"Logg inn"} />
          </div>

          <form
            className={"flex flex-col space-y-4 mt-6"}
            onSubmit={handleSubmit}
          >
            <div className={"flex flex-col"}>
              <label htmlFor={"email-input"}>
                <Hint text={"E-post"} />
              </label>

              <input
                id={"email-input"}
                className={
                  "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
                }
                type={"email"}
                placeholder={"mail@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={"flex flex-col"}>
              <label htmlFor="password-input">
                <Hint text={"Passord"} />
              </label>

              <input
                id="password-input"
                className={
                  "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
                }
                type={"password"}
                placeholder={"Ditt passord"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
