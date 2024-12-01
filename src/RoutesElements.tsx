import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import { useState } from "react";

import axios from "axios";
import Voir from "./admin/frontend/page/voir";
import Page from "./admin/backoffice/page/class/Page";
import Prerequis from "./admin/backoffice/prerequis/prerequis";
import Pages from "./admin/backoffice/page/pages";
import Visualization from "./admin/backoffice/page/page_template/page";
import CommonVisualization from "./admin/backoffice/bloc/components/common/general_settings";

export default function ThemeContextProvider({}: { children: any }) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Prerequis />}>
          Accueil
        </Route>
        <Route path="/pages" element={<Pages />}>
          Pages
        </Route>
        <Route path="/page/:id/:name/" element={<Visualization />}>
          Page
        </Route>
        <Route path="/:id/:name/" element={<Voir />}>
          Visualization
        </Route>
        <Route path="/commun" element={<CommonVisualization />}>
          Paramètres généraux
        </Route>
      </Routes>
    </HashRouter>
  );
}
