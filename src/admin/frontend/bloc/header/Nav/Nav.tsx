import { Link } from "react-router-dom";
import s from "./styles.module.css";
import v from "./style_responsive.module.css";
import { useEffect, useState } from "react";
import Page from "../../../../backoffice/page/class/Page";

interface NavInfo {
  opened: boolean;
  setOpen: any;
  isResponsive: boolean;
}
export default function Nav({ opened, setOpen, isResponsive }: NavInfo) {
  const [stylePath, setStylePath] = useState(s);
  const [pages, setPages] = useState<Page[]>([]);
  const page_type = new Page();
  // const { id, name } = useParams();
  const getPages = async () => {
    let async_result = await page_type.get_pages();

    if (Array.isArray(async_result) && async_result.length >= 1) {
      setPages(async_result);
    }
  };

  useEffect(() => {
    if (isResponsive) {
      setStylePath(v);
    } else {
      setStylePath(s);
    }
  }, [isResponsive]);
  useEffect(() => {
    getPages();
  }, []);
  useEffect(() => {}, [pages]);
  return (
    <nav
      className={
        opened
          ? `${stylePath.side_menu} ${stylePath.open_side_bar}`
          : `${stylePath.side_menu}`
      }
    >
      {pages.map((page, index) => {
        return (
          <ul className={stylePath.ul_menu} key={index}>
            <div key={page.id}>
              <Link
                to={`/${page.id}/${page.slug}`}
                key={page.id}
                onClick={() => setOpen(false)}
              >
                <li>
                  <div>
                    {page.title}
                    <span></span>
                  </div>
                </li>
              </Link>
            </div>
          </ul>
        );
      })}
    </nav>
  );
}
