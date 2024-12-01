import s from "./style.module.css";
import ajout from "./../../../../../../assets/ajouter.png";
import { useEffect } from "react";
import remove from "./../../../../../../assets/remove.png";
import add_to_database from "./../../../../../../assets/add_to_database.png";
import Header from "./../Header";
import LinkNetworksAndOthersHeader from "../LinkNetworksAndOthersHeader";

interface HeaderInfo {
  input_bloc: Header | undefined;
  updateHeader: any;
  remove_bloc: any;
  saveBloc: any;
}
function HeaderInput({
  input_bloc,
  updateHeader,
  remove_bloc,
  saveBloc,
}: HeaderInfo) {
  useEffect(() => {}, [input_bloc]);
  return (
    <>
      <div className={s.container_column}>
        <div className={s.top_container}>
          <div className={s.title_bloc}>
            <h3>Titre du site : </h3>
            <input
              type="text"
              value={input_bloc !== undefined ? input_bloc.title : ""}
              onChange={(e) => {
                updateHeader(e, "title", undefined, undefined);
              }}
            />
          </div>
          <div className={s.title_bloc}>
            <h3>Logo : </h3>
            <label>
              <span>Choisir une image</span>
              <input
                type="file"
                onChange={(e) => {
                  updateHeader(e, "logo_url", undefined, undefined);
                }}
              />
            </label>
            <label>{input_bloc?.logo_url}</label>
          </div>
          <div className={s.background_pic}>
            <h3>Image de fond : </h3>
            <label>
              <span>Choisir une image</span>
              <input
                type="file"
                onChange={(e) => {
                  updateHeader(e, "background_url", undefined, undefined);
                }}
              />
            </label>
            <label>{input_bloc?.background_url}</label>
          </div>
          <div className={s.add_file}>
            <h3>Liens externes (ex: réseaux sociaux): </h3>
            <div
              className={s.addLink}
              onClick={(e) => {
                updateHeader(e, "ajout", undefined, undefined, input_bloc);
              }}
            >
              <img src={ajout} alt="bouton ajouter" />
            </div>
          </div>
        </div>
        <div className={s.social_networks}>
          {input_bloc !== undefined &&
            input_bloc.link_networks_an_others_header.length > 0 &&
            input_bloc.link_networks_an_others_header.map(
              (value: LinkNetworksAndOthersHeader, key: number) => {
                return (
                  <div className={s.social_network} key={key}>
                    <div className="button_remove_container">
                      <img
                        src={remove}
                        alt="suppression box"
                        onClick={() => {
                          remove_bloc(input_bloc, key);
                        }}
                      />
                    </div>
                    <div className={s.url_logo}>
                      <h3>Image logo lien :</h3>
                      <label>
                        <span>Choisir une image</span>
                        <input
                          type="file"
                          onChange={(e) => {
                            updateHeader(e, "social_network", "url_logo", key);
                          }}
                        />
                      </label>
                    </div>
                    <h3>Nom :</h3>
                    <div className={s.name}>
                      <input
                        type="text"
                        value={value.name}
                        onChange={(e) => {
                          updateHeader(e, "social_network", "name", key);
                        }}
                      />
                    </div>
                    <h3>Lien :</h3>
                    <div className={s.link_url}>
                      <input
                        type="text"
                        value={value.background_url}
                        onChange={(e) => {
                          updateHeader(
                            e,
                            "social_network",
                            "background_url",
                            key
                          );
                        }}
                      />
                    </div>
                    <h3>Titre de la balise Lien :</h3>
                    <div className={s.title}>
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => {
                          updateHeader(e, "social_network", "title", key);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
        </div>
        <div
          className={s.button_save_page}
          onClick={(e) => {
            e.preventDefault();
            saveBloc();
          }}
          style={{ top: "30px", right: "30px" }}
        >
          <img src={add_to_database} alt="ajouter en base de données" />
        </div>
      </div>
    </>
  );
}

export default HeaderInput;
