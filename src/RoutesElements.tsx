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
  const [pages, setPages] = useState<Array<Page>>([]);
  const getPages = async () => {
    let new_pages: Array<Page> = [];
    await axios
      .get("http://localhost:80/cms_v2/api/index.php?method=get_pages")
      .then((response) => {
        let elements = response.data;
        if (Array.isArray(elements) && elements.length >= 1) {
          elements.forEach((element: { id: number; title: string }) => {
            let new_page = new Page(element.id, element.title);
            new_page !== null && new_pages.push(new_page);
          });
        }
      })

      .catch((err: any) => {
        alert(err);
      });

    setPages(new_pages);
  };
  //   //path="/:name/:id" element=<Visualization />
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
