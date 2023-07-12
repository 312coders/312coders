import { useEffect, useState } from "react";
import { firebaseAuth } from "../api";
import { User } from "firebase/auth";


const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(firebaseAuth.currentUser);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsub();
    }
  }, [])

  return { user, loading };
}

export default useAuth;