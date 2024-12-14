import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";
import { Models } from "react-native-appwrite";

const GlobalContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  user: null as Models.Document | null,
  setUser: (user: Models.Document | null) => {},
  isLoading: false,
});


export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<Models.Document | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getCurrentUser()
    .then((res) => {
      if (res) {
        setIsLoggedIn(true)
        setUser(res)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
  })

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      isLoading,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;