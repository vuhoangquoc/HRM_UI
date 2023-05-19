import { isJwtExpired } from "jwt-check-expiration";
import { AuthProvider } from "./AuthContext";
import localStorageConst from "src/constants/localStorageConst";
import { EmployeeProvider } from "./EmployeeContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { FileProvider } from "./FileContext";
import { InsuranceProvider } from "./InsuranceContext";
import { UserProvider } from "./UserContext";
import { DepartmentProvider } from "./DepartmentContext";
import { PositionProvider } from "./PositionContext";
const { createContext, useContext, useEffect, useState } = require("react");

export const AppContext = createContext(null);
export function AppProvider(props) {
  const { children } = props;
  const [refreshApp, setRefreshApp] = useState(true);
  const refresh = () => setRefreshApp(!refreshApp);
  return (
    <AppContext.Provider value={{ refreshApp, refresh }}>
      <AuthProvider>
        <UserProvider>
          <EmployeeProvider>
            <FileProvider>
              <InsuranceProvider>
                <DepartmentProvider>
                  <PositionProvider>{children}</PositionProvider>
                </DepartmentProvider>
              </InsuranceProvider>
            </FileProvider>
          </EmployeeProvider>
        </UserProvider>
      </AuthProvider>
    </AppContext.Provider>
  );
}
export const AppConsumer = () => AppContext.Consumer;
export const useAppContext = () => useContext(AppContext);
