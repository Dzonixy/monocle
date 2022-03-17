// Routes
import AppRoutes from "routes/AppRoutes";

// Providers
import MonocleThemeProvider from "theme";
import {
  DrawerProvider,
  LinearProgressProvider,
  TabProvider,
  WalletProvider,
} from "contexts";
import { ToastProvider } from "contexts/ToastContext/ToastContext";

function App() {
  return (
    <WalletProvider>
      <MonocleThemeProvider>
        <ToastProvider>
          <LinearProgressProvider>
            <TabProvider>
              <DrawerProvider>
                <AppRoutes />
              </DrawerProvider>
            </TabProvider>
          </LinearProgressProvider>
        </ToastProvider>
      </MonocleThemeProvider>
    </WalletProvider>
  );
}

export default App;
