import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Voir from "./admin/frontend/page/voir";
import Pages from "./admin/backoffice/page/pages";
import Visualization from "./admin/backoffice/page/page_template/page";
import Front from "./front/page/voir";
import Prerequis from "./admin/backoffice/prerequis/prerequis";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./admin/authentication/login";
import { AuthContextProvider } from "./auth/AuthContext";
import NotFoundPage from "./auth/NotFoundPage";

export default function ThemeContextProvider({}: { children: any }) {
  return (
    <HashRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/1/accueil" replace />}>
            Accueil
          </Route>
          <Route path="/:id/:slug" element={<Front />}>
            Front
          </Route>

          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/pages" element={<Pages />}>
              Pages
            </Route>
            <Route path="/admin/page/:id/:slug" element={<Visualization />}>
              Page
            </Route>
            <Route path="/admin/:id/:slug" element={<Voir />}>
              Visualization
            </Route>

            <Route path="/admin" element={<Prerequis />}>
              Paramètres généraux
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </HashRouter>
  );
}
