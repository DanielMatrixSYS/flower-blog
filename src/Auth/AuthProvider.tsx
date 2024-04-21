import React, { useEffect, useState } from "react";
import { AuthContext, UserProfile } from "./AuthContext.tsx";
import { auth, db } from "../components/Firebase.tsx";
import { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        const docRef = doc(db, "users", user.uid);

        const unsubData = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserProfile(doc.data() as UserProfile);
          }

          setLoading(false);
        });

        return () => {
          unsubData();
        };
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
