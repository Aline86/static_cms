import "./App.css";
import { useContext, useEffect, useState } from "react";
import ThemeContextProvider from "./RoutesElements";
import Prerequis from "./admin/backend/prerequis/prerequis";
import ColorContext from "./ColorContext";
import Page from "./admin/backend/page/class/Page";

function App() {
  const { common } = useContext(ColorContext);

  const styles = {
    backgroundColor: common !== null ? `${common?.fond}` : "transparent",
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
  };
  // initilization of the first page, it should always exist prior to any action
  const create_first_page = async () => {
    let page_type = new Page();
    let async_result = await page_type.get_pages();

    if (Array.isArray(async_result) && async_result.length >= 1) {
    } else {
      let page = new Page(-1, "Accueil");
      page.save_bloc();
    }
  };
  useEffect(() => {
    create_first_page();
  }, [common]);
  return (
    common !== null && (
      <div className="app_container" style={styles}>
        <div className="inside_app_container">
          <ThemeContextProvider>
            <Prerequis />
          </ThemeContextProvider>
        </div>
      </div>
    )
  );
}

export default App;
