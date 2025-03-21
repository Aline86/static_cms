import { useEffect, useState } from "react";
import s from "./styles.module.css";
import remove from "./../../../../../../../../assets/remove.png";
import add_to_database from "./../../../../../../../../assets/add_to_database.png";
import Footer from "../Footer";
import FileUploadWithProgress from "../../../../../../services/FileUploadWithProgress";

interface FooterInfo {
  input_bloc: Footer;
  updateFooter: any;
  saveBloc: any;
}

function FooterInput({ input_bloc, updateFooter, saveBloc }: FooterInfo) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {}, [input_bloc]);
  return (
    <div className={s.container}>
      <div className={s.container_column}>
        <div className={s.top_container}>
          <div className={s.color}>
            <h3 style={{ textDecoration: "underline" }}>Couleur de fond :</h3>
            <input
              type="color"
              className={s.color}
              value={input_bloc.background_color}
              onChange={(e) => {
                updateFooter(e, "footer", "background_color", undefined);
              }}
            />
          </div>
          <h3 style={{ textDecoration: "underline" }}>Adresse du site : </h3>
          <div className={s.title_bloc}>
            <h3>Nom : </h3>
            <input
              type="text"
              value={input_bloc?.address.title}
              onChange={(e) => {
                updateFooter(e, "address", "title", undefined);
              }}
            />
          </div>

          <div className={s.title_bloc}>
            <h3>Adresse : </h3>
            <input
              type="text"
              value={input_bloc?.address.address}
              onChange={(e) => {
                updateFooter(e, "address", "address", undefined);
              }}
            />
          </div>
          <div className={s.title_bloc}>
            <h3>Ville et code postal : </h3>
            <input
              type="text"
              value={input_bloc?.address.town}
              onChange={(e) => {
                updateFooter(e, "address", "town", undefined);
              }}
            />
          </div>
          <div className={s.map} onClick={() => setOpened(!opened)}>
            <div className={s.map_content}>
              <h3>Lien url de l'iframe google pour la carte :</h3>
              <input
                type="text"
                value={
                  input_bloc?.map_iframe_url !== "undefined"
                    ? input_bloc?.map_iframe_url
                    : ""
                }
                onChange={(e) => {
                  updateFooter(e, "footer", "map_iframe_url", undefined);
                }}
              />
            </div>
          </div>
          <div className={s.add_file}>
            <label
              className={s.addCard}
              onClick={(e) => {
                e.preventDefault();
                updateFooter(e, "ajout", undefined, undefined);
              }}
            >
              <span style={{ textTransform: "uppercase", width: "220px" }}>
                Ajouter un élément +
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className={s.social_networks}>
        {input_bloc !== undefined &&
          input_bloc.links_network_an_others_footer.length > 0 &&
          input_bloc.links_network_an_others_footer.map((value, key) => {
            return (
              <div className={s.social_network} key={key}>
                <div className="button_remove_container">
                  <img
                    src={remove}
                    alt="suppression box"
                    onClick={(e) => {
                      updateFooter(e, "social_network", "remove", key);
                    }}
                  />
                </div>
                <div className={s.url_logo}>
                  <h3>Image logo lien :</h3>

                  <FileUploadWithProgress
                    sub_field_name={"url_logo"}
                    update={updateFooter}
                    text_bouton_telechargement={"Charger une image"}
                    field_name={"social_network"}
                    component={input_bloc}
                    index={key}
                  />
                </div>
                <h3>Nom :</h3>
                <div className={s.name}>
                  <input
                    type="text"
                    value={value.name}
                    onChange={(e) => {
                      updateFooter(e, "social_network", "name", key);
                    }}
                  />
                </div>
                <h3>Lien :</h3>
                <div className={s.link_url}>
                  <input
                    type="text"
                    value={value.background_url}
                    onChange={(e) => {
                      updateFooter(e, "social_network", "background_url", key);
                    }}
                  />
                </div>
                <h3>Titre de la balise Lien :</h3>
                <div className={s.title}>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => {
                      updateFooter(e, "social_network", "title", key);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div
        className={s.button_save_page}
        onClick={() => {
          saveBloc(input_bloc);
        }}
        style={{ top: "30px", right: "30px" }}
      >
        <img src={add_to_database} alt="ajouter en base de données" />
      </div>
    </div>
  );
}

export default FooterInput;
