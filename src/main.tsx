import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { TenantProvider } from "./providers/TenantProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <TenantProvider>
      <App />
    </TenantProvider>
  </AuthProvider>
);
