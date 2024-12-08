import { useEffect, useState } from "react";
import s from "./style.module.css";
import HeaderVizualization from "../../frontend/bloc/header/header";
import FooterVizualization from "../../frontend/bloc/footer/footer";
import Header from "../bloc/components/header/Header";
import Footer from "../bloc/components/footer/Footer";
import HeaderInput from "../bloc/components/header/header_template/header_input";
import FooterInput from "../bloc/components/footer/footer_template/footer";

interface PageParams {}

function Prerequis({}: PageParams) {
  const [toggle, setToggle] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState<Footer>(new Footer());
  const saveBloc = async () => {
    await saveHeaderAndFooter(header);
    await saveHeaderAndFooter(footer);
  };

  const saveHeaderAndFooter = async (bloc: Header | Footer) => {
    let update = null;
    update = await bloc.save_bloc();
    if (bloc.id === -1) {
      setRefresh(!refresh);
    } else {
      setToggle(!toggle);
    }
  };

  const updateHeader = async (
    e: any,
    field: string,
    input: string | undefined,
    id_network: number | undefined = undefined
  ) => {
    if (header !== undefined) {
      const new_bloc = header.updateHeader(e, field, input, id_network);
      if (id_network !== undefined) {
        setToggle(!toggle);
      } else {
        setHeader(new_bloc);
        setToggle(!toggle);
      }
    }
  };

  const remove_bloc = async (bloc: Header | Footer, index: number) => {
    await bloc.remove_link(index);
    let result = await bloc.get_bloc();
    if (result !== undefined && result instanceof Footer) {
      setFooter(result);

      setRefresh(!refresh);
    }

    if (result !== undefined && result instanceof Header) {
      setHeader(result);
      setRefresh(!refresh);
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
    const new_bloc = footer.updateFooter(e, field, input, id_network);
    if (id_network !== undefined) {
      setToggle(!toggle);
    } else {
      setFooter(new_bloc);
      setToggle(!toggle);
    }
  };
  useEffect(() => {
    getFooterAndHeader();
  }, []);

  useEffect(() => {
    getFooterAndHeader();
  }, [refresh]);

  return (
    <div className={s.page_container}>
      <h2>En-tête du site</h2>

      <div>
        <HeaderVizualization
          input_bloc={header}
          toggle={toggle}
          isResponsive={false}
        />
        <HeaderInput
          input_bloc={header}
          updateHeader={updateHeader}
          remove_bloc={remove_bloc}
          saveBloc={saveBloc}
        />
      </div>

      <h2>Bas de page du site</h2>

      <div>
        <FooterInput
          input_bloc={footer}
          remove_bloc={remove_bloc}
          updateFooter={updateFooter}
          saveBloc={saveBloc}
        />
        <FooterVizualization
          input_bloc={footer}
          toggle={toggle}
          isResponsive={false}
        />
      </div>
    </div>
  );
}

export default Prerequis;
