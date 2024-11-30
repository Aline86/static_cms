import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import Prerequis from "./admin/backend/prerequis/prerequis";

import Page from "./admin/backend/page/class/Page";
import Visualization from "./admin/backend/page/page_template/page";
import Pages from "./admin/backend/page/pages";
import Voir from "./admin/frontend/page/voir";

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
          Page
        </Route>
        <Route path="/pages" element={<Pages />}>
          Pages
        </Route>
        <Route path="/page/:id/:name/" element={<Visualization />}>
          Page
        </Route>
        <Route path="/:id/:name/" element={<Voir />}>
          Vizualisation
        </Route>
      </Routes>
    </HashRouter>
  );
}
