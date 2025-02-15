import s from "./style.module.css";

import { useEffect, useState } from "react";

import { BASE_URL_SITE } from "../../../../config";
import { Video } from "../../../backoffice/page/page_template/bloc_components/components/video/class/Video";

interface BlocParams {
  bloc: Video;

  full: boolean;

  isResponsive: boolean;
}

function VideoVizualisation({
  bloc,

  full,

  isResponsive,
}: BlocParams) {
  useEffect(() => {}, [bloc]);
  const [external, isExternalLink] = useState<boolean>();

  const [url, setUrl] = useState<string>("");

  const result = window.matchMedia("(max-width: 800px)");

  const checkExternal = async (url: string) => {
    let prefixe = url.substring(0, 4);

    if (prefixe === "http") {
      isExternalLink(true);
    } else {
      isExternalLink(false);
    }
    setUrl(url);
  };
  useEffect(() => {
    checkExternal(bloc.video_url);
  }, []);

  useEffect(() => {}, [external, url, isResponsive]);

  return url !== undefined && url.length > 0 && external ? (
    <div
      style={{
        marginTop: bloc.bloc_number === 1 ? "150px" : "0px",
      }}
    >
      {bloc.title !== "" ? (
        <div
          className={s.encart}
          style={{
            position: "relative",
            zIndex: "2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              display: "inline-block",
              textAlign: "center",
              margin: "0",
            }}
          >
            {bloc.title}
          </h2>
          <p
            style={{
              fontSize: "25px",
              textAlign: "center",

              display: "inline-block",
            }}
          >
            {bloc.text}
          </p>
        </div>
      ) : (
        <span></span>
      )}

      <div
        style={{
          margin: "0 auto",
          marginTop: full
            ? !isResponsive && !result.matches
              ? "0px"
              : "30px"
            : "0px",
          marginBottom: "30px",
          width: `${
            full
              ? isResponsive || result.matches
                ? "380px"
                : `${bloc.width + "vw"}`
              : "43vw"
          }`,
          maxWidth: "90vw",
          height: "50vh",
          objectFit: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <iframe
          style={{
            display: "block",
            width: `${
              isResponsive || result.matches ? "350px" : bloc.width + "%"
            }`,
            margin: "0 auto",
            height: `${bloc.height + "%"}`,
          }}
          src={url}
          title={bloc.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  ) : (
    url !== undefined && !external && (
      <div className={s.bloc}>
        <div
          style={{
            position: "relative",
            width: `100vw`,

            height: `100vh`,
            marginLeft: full
              ? isResponsive || result.matches
                ? "0"
                : "0px"
              : "30px",
            marginTop: full
              ? isResponsive
                ? "0px"
                : result.matches
                ? "-60px"
                : "-30px"
              : "0",
            marginBottom: "30px",
          }}
        >
          <div
            className={s.encart}
            style={{
              maxWidth: "90vw",

              position: `${
                full
                  ? isResponsive || !result.matches
                    ? "absolute"
                    : "relative"
                  : "absolute"
              }`,
              top: `${
                full
                  ? isResponsive || result.matches
                    ? "350px"
                    : "50%"
                  : "100px"
              }`,
              left: `${full ? (isResponsive ? "50%" : "50%") : "0%"}`,
              transform: `${
                full
                  ? isResponsive
                    ? "translate(-50%, -50%)"
                    : "translate(-50%, -50%)"
                  : "unset"
              }`,

              height: full ? (isResponsive ? "auto" : "100vh") : "50%",
              width: full ? (isResponsive ? "100%" : "100%") : "43vw",
              zIndex: "51",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <h2
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textTransform: "uppercase",
                textAlign: "center",
                fontSize: `${
                  full ? (!isResponsive ? "100px" : "42px") : "72px"
                }`,
                opacity: "0.5",
              }}
            >
              {bloc.title}
            </h2>
            <p
              style={{
                color: "white",
                fontSize: "25px",
                textAlign: "center",

                display: "inline-block",
              }}
            >
              {bloc.text}
            </p>
          </div>
          <video
            style={{
              zIndex: "50",
              position: `relative`,

              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              height: `100vh`,
              width: `${full ? (isResponsive ? "360px" : "100vw") : "43vw"}`,
              objectFit: "cover",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            playsInline
            autoPlay
            muted
            loop
            controls={false}
          >
            <source
              src={BASE_URL_SITE + "/api/uploadfile/" + bloc.video_url}
              type="video/mp4"
            />
            <source
              src={BASE_URL_SITE + "/api/uploadfile/" + bloc.video_url}
              type="video/webm"
            />
          </video>
        </div>
      </div>
    )
  );
}

export default VideoVizualisation;
