import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ColorContextProvider } from "./ColorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ColorContextProvider>
    <App />
  </ColorContextProvider>
);
