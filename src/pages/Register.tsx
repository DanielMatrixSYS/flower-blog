import React, { FormEventHandler, useEffect, useState } from "react";
import Title from "../components/Typography/Title.tsx";
import Hint from "../components/Typography/Hint.tsx";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../components/Firebase.tsx";
import { doc, setDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { getNiceErrorMessage } from "../components/FirebaseFunctions.tsx";

interface ErrorProps {
  code: string;
  message: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>();

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (loading) return false;

    if (email === "" || email === "") {
      return false;
    }

    setLoading(true);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const uid = userCredentials.user.uid;

        await setDoc(doc(db, "users", uid), {
          email: email,
          isSiteAdmin: false,
          createdAt: new Date().toISOString(),
        })
          .then(() => {
            setSuccess(true);
          })
          .catch((error) => {
            setError(getNiceErrorMessage(error));
          });

        setSuccess(true);
      })
      .catch((error) => {
        setError(getNiceErrorMessage(error));
      });

    setLoading(false);
  };

  return (
    <div className="flex flex-col p-4 flex-grow max-h-[37rem]">
      <div className="flex flex-col flex-grow items-center justify-center">
        <div
          className={
            "flex flex-col w-full sm:w-1/2 border border-neutral-400 dark:border-neutral-500 rounded-lg p-4 shadow-sm"
          }
        >
          <div className="flex flex-col items-center justify-center">
            <Title text={"Registrer deg"} />
          </div>

          <form
            className="flex flex-col space-y-4 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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

            {loading ? (
              <>
                <p className="text-3xl">Loading...</p>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </>
            )}

            {error?.code !== "" && error?.message && (
              <p className="text-red-500">
                {error?.code + " " + error?.message}
              </p>
            )}

            {success && <Navigate to="/" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
