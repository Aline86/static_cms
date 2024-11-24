import { Link } from "react-router-dom";
import s from "./styles.module.css";

interface NavInfo {
  opened: boolean;
}
export default function Nav({ opened }: NavInfo) {
  return (
    <nav
      className={
        opened ? `${s.side_menu} ${s.open_side_bar}` : `${s.side_menu}`
      }
    >
      <ul className={s.ul_menu}>
        <Link to="/">
          <li>
            <div>
              Accueil<span></span>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
