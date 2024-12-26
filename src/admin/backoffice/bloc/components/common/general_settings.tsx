import { useEffect, useState } from "react";
import s from "./style.module.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useCommon } from "./../../../../../ColorContext";
interface PageParams {}

function CommonVisualization({}: PageParams) {
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const [toggle, setToggle] = useState<boolean>(false);

  const { common, updateCommon } = useCommon();

  async function asynchronRequestsToPopulateBlocs() {
    setHeader(await header.get_bloc());
    setFooter(await footer.get_bloc());
    setToggle(!toggle);
  }

  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, []);

  useEffect(() => {}, [toggle]);

  useEffect(() => {}, [common, toggle]);
  return (
    <div className="page">
      <div className={s.page_container_setting}>
        <div className={s.page_container}>
          <div className={s.page}>
            <div className={s.page_container}>
              {common !== undefined && (
                <div className={s.flex_row}>
                  <h3>Couleur de fond générale :</h3>
                  <div className={s.color_display}>
                    <input
                      type="color"
                      value={common?.fond}
                      onChange={(e) => {
                        updateCommon(e, "fond", common);
                      }}
                    />
                  </div>

                  <h3>Couleur des titres :</h3>
                  <div className={s.color_display}>
                    <input
                      type="color"
                      value={common?.titles}
                      onChange={(e) => {
                        updateCommon(e, "titles", common);
                      }}
                    />
                  </div>
                  <h3>Couleur de fond des boutons :</h3>
                  <div className={s.color_display}>
                    <input
                      type="color"
                      value={common?.background_color_buttons}
                      onChange={(e) => {
                        updateCommon(e, "background_color_buttons", common);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonVisualization;
