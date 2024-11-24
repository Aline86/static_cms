import { Link } from "react-router-dom";
import s from "./styles.module.css";
import v from "./style_responsive.module.css";
import { useEffect, useState } from "react";

interface NavInfo {
  opened: boolean;
  isResponsive: boolean;
}
export default function Nav({ opened, isResponsive }: NavInfo) {
  const [stylePath, setStylePath] = useState(s);
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
  return (
    <nav
      className={
        opened
          ? `${stylePath.side_menu} ${stylePath.open_side_bar}`
          : `${stylePath.side_menu}`
      }
    >
      <ul className={stylePath.ul_menu}>
        <Link to="/">
          <li>
            <div>
              Accueil<span></span>
            </div>
          </li>
        </Link>
        <Link to="/pages">
          <li>
            <div>
              Liste des pages<span></span>
            </div>
          </li>
        </Link>
        <Link to="/commun">
          <li>
            <div>
              Paramètres généraux<span></span>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
