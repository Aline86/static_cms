import { useEffect, useState } from "react";
import v from "./style_responsive.module.css";
import s from "./style.module.css";

import Nav from "./Nav/Nav";
import { Link } from "react-router-dom";
import Header from "../../../backoffice/bloc/components/header/Header";

interface HeaderInfo {
  input_bloc: Header;
  isResponsive: boolean;
  toggle: boolean;
}
function HeaderVizualization({ input_bloc, toggle, isResponsive }: HeaderInfo) {
  const [open, setOpen] = useState(false);
  const [stylePath, setStylePath] = useState(s);
  const style_width = {
    width: isResponsive ? "380px" : "100%",
  };

  useEffect(() => {}, [toggle]);
  useEffect(() => {
    if (isResponsive) {
      setStylePath(v);
    } else {
      setStylePath(s);
    }
  }, [isResponsive]);
  return (
    <>
      <div
        className={stylePath.backdrop}
        style={{
          backgroundImage: `url(${
            "http://localhost:80/cms_v2/api/uploadfile/" +
            input_bloc.background_url
          })`,
        }}
      ></div>
      <div className={stylePath.container} style={style_width}>
        <div className={stylePath.burger_menu}>
          <div
            className={
              open
                ? `${stylePath.menu_btn} ${stylePath.open}`
                : `${stylePath.menu_btn}`
            }
            onClick={() => setOpen(!open)}
          >
            <div className={stylePath.menu_btn__burger}></div>
          </div>
          <div>
            <Nav opened={open} isResponsive={isResponsive} />
          </div>
        </div>
        <div className={stylePath.title}>
          <div className={stylePath.title_container}>
            <h1>{input_bloc.title}</h1>
            <span></span>
          </div>
        </div>
        <div className={stylePath.end}>
          {input_bloc.link_networks_an_others_header.length > 0 &&
            input_bloc.link_networks_an_others_header.map((value, key) => {
              return (
                <a
                  key={key}
                  className={stylePath.facebook}
                  href={value.background_url}
                  title={value.title}
                  target="_blank"
                >
                  {value.logo_url.length > 0 ? (
                    <img
                      src={
                        "http://localhost:80/cms_v2/api/uploadfile/" +
                        value.logo_url
                      }
                      alt={value.title}
                    />
                  ) : (
                    value.name
                  )}
                </a>
              );
            })}

          <Link to="/">
            <div className={stylePath.logo}>
              <img
                src={
                  "http://localhost:80/cms_v2/api/uploadfile/" +
                  input_bloc.logo_url
                }
                alt="logo"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderVizualization;
