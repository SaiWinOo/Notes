import { createContext, useState } from "react";
export const AppContext = createContext();

const AppProvider = ({ children }) => {

  // const [showBottomTabBar, setShowBottomTabBar] = useState(true);

  return (
    <AppContext.Provider value={{
    }}>
      <>
        {children}
      </>
    </AppContext.Provider>
  )
}

export default AppProvider;