import { useEffect, useState } from "react";
import v from "./style_responsive.module.css";
import s from "./style.module.css";
import e from "./edition.module.css";
import Nav from "./Nav/Nav";
import { Link } from "react-router-dom";
import reseaux from "./../../../../assets/reseaux.png";
import { BASE_URL_SITE } from "../../../../config";
import Header from "../../../backoffice/page/page_template/bloc_components/components/header/Header";
import { debounce } from "lodash";

interface HeaderInfo {
  input_bloc: Header;
  isResponsive: boolean;
  full: boolean;
  toggle: boolean;
}
function HeaderVizualization({
  input_bloc,
  toggle,
  full,
  isResponsive,
}: HeaderInfo) {
  const [open, setOpen] = useState(false);
  const [trigger_show_link, setTrigger_show_link] = useState(true);
  const [stylePath, setStylePath] = useState(s);
  const result = window.matchMedia("(max-width: 800px)");
  const isLightOrDark = (hexcolor: string = "#2f6091") => {
    var c = hexcolor.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 90) {
      return "white";
    }
    return "black";
  };
  const style_width = {
    width: isResponsive ? "380px" : "100%",
    color: isLightOrDark(input_bloc.background_color),
  };

  const handleShowLinks = () => {
    setTrigger_show_link(!trigger_show_link);
  };

  const nav_animation = () => {
    let lastScroll = 0;
    window.addEventListener("scroll", function () {
      let now = Date.now();
      if (now - lastScroll >= 150) {
        const nav = document.getElementById(stylePath.nav);
        if (nav === null || nav === undefined) return;

        if (window.scrollY > nav.offsetHeight + 150) {
          if (!nav.className.includes("active")) {
            nav.classList.add(stylePath.active);
          }
        } else if (nav.className.includes("active")) {
          nav.classList.remove(stylePath.active);
        }
        lastScroll = now;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", nav_animation);
  }, []);

  useEffect(() => {}, [toggle]);
  useEffect(() => {
    if (isResponsive || result.matches) {
      setTrigger_show_link(false);
      if (result.matches) {
        setStylePath(s);
      } else {
        setStylePath(v);
      }
    } else if (full) {
      setTrigger_show_link(true);
      setStylePath(s);
    } else if (!full) {
      setTrigger_show_link(true);
      setStylePath(e);
    }
  }, [isResponsive]);
  useEffect(() => {
    nav_animation();
  }, []);
  return (
    <div id={stylePath.nav}>
      <div
        className={stylePath.backdrop}
        style={{
          background: input_bloc.image_url
            ? `url(${
                BASE_URL_SITE + "/api/uploadfile/" + input_bloc.image_url
              })`
            : input_bloc.background_color,
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
            <Nav opened={open} isResponsive={isResponsive} setOpen={setOpen} />
          </div>
        </div>
        <div className={stylePath.title}>
          <div className={stylePath.title_container}>
            <h1>{input_bloc.title}</h1>
            <span></span>
          </div>
        </div>
        <div className={stylePath.end}>
          <div className={stylePath.links}>
            {(isResponsive || result.matches) && (
              <div className="plus" onClick={() => handleShowLinks()}>
                <img src={reseaux} alt="réseaux sociaux" />
              </div>
            )}

            {input_bloc.link_networks_an_others_header.length > 0 &&
              input_bloc.link_networks_an_others_header.map(
                (value: any, key: number) => {
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
                            BASE_URL_SITE + "/api/uploadfile/" + value.logo_url
                          }
                          alt={value.title}
                          className={
                            trigger_show_link ? "tr show_link" : "tr small"
                          }
                        />
                      ) : (
                        value.name
                      )}
                    </a>
                  );
                }
              )}
          </div>
          <Link to="/">
            <div className={stylePath.logo}>
              <img
                src={BASE_URL_SITE + "/api/uploadfile/" + input_bloc.logo_url}
                alt="logo"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderVizualization;
