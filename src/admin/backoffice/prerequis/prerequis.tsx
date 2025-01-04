import { useEffect, useState } from "react";
import s from "./style.module.css";
import HeaderVizualization from "../../frontend/bloc/header/header";
import FooterVizualization from "../../frontend/bloc/footer/footer";
import Header from "../bloc/components/header/Header";
import Footer from "../bloc/components/footer/Footer";
import HeaderInput from "../bloc/components/header/header_template/header_input";
import FooterInput from "../bloc/components/footer/footer_template/footer";
import BlocHeader from "../page/page_template/bloc_components/BlocHeader";
import BlocFooter from "../page/page_template/bloc_components/BlocFooter";
import CommonVisualization from "../bloc/components/common/general_settings";
import { Link } from "react-router-dom";
import Page from "../page/class/Page";

interface PageParams {}

function Prerequis({}: PageParams) {
  const [toggle, setToggle] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState<Footer>(new Footer());

  const savePrerequisites = async () => {
    await header.save_bloc();
    await footer.save_bloc();
    saveHeaderAndFooter();
  };

  const saveHeaderAndFooter = async () => {
    setRefresh(!refresh);
  };

  const updateHeader = async (
    e: any,
    field: string,
    input: string | undefined,
    id_network: number | undefined = undefined
  ) => {
    if (header !== undefined) {
      const new_bloc = await header.updateHeader(e, field, input, id_network);
      if (id_network !== undefined && input === "remove") {
        setRefresh(!refresh);
      } else {
        setHeader(new_bloc);
        setToggle(!toggle);
      }
    }
  };

  const getHeader = async () => {
    const new_bloc = await header.get_bloc();

    if (new_bloc.id === 1) {
      setHeader(header);
    }
  };
  const getFooter = async () => {
    const new_bloc = await footer.get_bloc();

    if (new_bloc.id === 1) {
      setFooter(new_bloc);
    }
  };
  const getFooterAndHeader = async () => {
    // await saveBloc();
    await getHeader();
    await getFooter();
    setToggle(!toggle);
  };
  const updateFooter = async (
    e: any,
    field: string,
    input: string,
    id_network: number | undefined = undefined
  ) => {
    const new_bloc = await footer.updateFooter(e, field, input, id_network);
    if (id_network !== undefined && input === "remove") {
      setRefresh(!refresh);
    } else {
      setFooter(new_bloc);
      setToggle(!toggle);
    }
  };
  // initilization of the first page, it should always exist prior to any action
  const create_first_page = async () => {
    let page_type = new Page();
    let async_result = await page_type.get_pages();
    if (Array.isArray(async_result) && async_result.length >= 1) {
    } else if (async_result !== undefined) {
      let page = new Page(-1, "Accueil");
      let result = await page.save_bloc();
      if (result.id > -1) {
        setRefresh(!refresh);
      }
    }
  };
  useEffect(() => {
    create_first_page();
    getFooterAndHeader();
  }, []);

  useEffect(() => {
    getFooterAndHeader();
  }, [refresh]);

  return (
    <div className={s.page_container}>
      <h2>
        Paramètres généraux : Attention à bien compléter l'en-tête et le bas de
        page
      </h2>
      <div className={s.blocs_container}>
        <CommonVisualization />
        <BlocHeader
          bloc={header}
          updateHeader={updateHeader}
          toggle={toggle}
          saveBloc={savePrerequisites}
        />
        <BlocFooter
          bloc={footer}
          updateFooter={updateFooter}
          toggle={toggle}
          saveBloc={savePrerequisites}
        />
      </div>
      <div className={s.center}>
        <Link to={{ pathname: `/admin/pages` }}>
          <li>
            <div className={s.navigate}>Créer des pages</div>
          </li>
        </Link>
      </div>
    </div>
  );
}

export default Prerequis;
