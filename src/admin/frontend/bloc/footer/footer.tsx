import { useEffect, useState } from "react";
import s from "./styles.module.css";
import v from "./style_responsive.module.css";
import Footer from "../../../backoffice/bloc/components/footer/Footer";

interface FooterInfo {
  input_bloc: Footer;
  toggle: boolean;
  isResponsive: boolean;
}
function FooterVizualization({ input_bloc, toggle, isResponsive }: FooterInfo) {
  const [opened, setOpened] = useState(false);
  const [stylePath, setStylePath] = useState(s);
  const root_map: string =
    input_bloc.map_iframe_url; /*.replace("watch?v=", "v/");*/

  const style_width = {
    width: isResponsive ? "380px" : "100%",
  };

  useEffect(() => {
    if (isResponsive) {
      setStylePath(v);
    } else {
      setStylePath(s);
    }
  }, [isResponsive]);
  useEffect(() => {}, [toggle]);
  return (
    <div className={stylePath.container} style={style_width}>
      <div className={stylePath.facebook}>
        <div className={stylePath.end}>
          {input_bloc.links_network_an_others_footer.length > 0 &&
            input_bloc.links_network_an_others_footer.map((value, key) => {
              return value.logo_url.length > 0 && value.name.length === 0 ? (
                <a
                  key={key}
                  className={stylePath.facebook}
                  href={value.background_url}
                  title={value.title}
                  target="_blank"
                  style={{
                    position: "relative",
                    zIndex: "106",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={
                      "http://localhost:80/cms_v3/welcome_poitiers/api/uploadfile/" +
                      value.logo_url
                    }
                    alt={value.title}
                  />
                </a>
              ) : (
                <a
                  key={key}
                  className={stylePath.facebook}
                  href={
                    "http://localhost:80/cms_v3/welcome_poitiers/api/uploadfile/" +
                    value.logo_url
                  }
                  title={value.title}
                  target="_blank"
                  style={{
                    position: "relative",
                    zIndex: "106",
                    cursor: "pointer",
                  }}
                >
                  {value.name}
                </a>
              );
            })}
        </div>
      </div>
      <div className={stylePath.address}>
        <h3>{input_bloc.address.title}</h3>
        <div>{input_bloc.address.address}</div>
        <div>{input_bloc.address.town}</div>
      </div>
      <div className={stylePath.map} onClick={() => setOpened(!opened)}>
        <div className={stylePath.see_map}>Voir la carte</div>
        <div className={!opened ? `${s.none}` : `${stylePath.full_back_drop}`}>
          <div className={stylePath.drop}></div>
          <div className={stylePath.map_content} id="map_content">
            <iframe
              src={root_map + "&output=embed"}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              width="600"
              height="450"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterVizualization;
