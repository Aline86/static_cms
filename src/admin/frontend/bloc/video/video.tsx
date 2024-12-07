import s from "./style.module.css";

import { useEffect, useRef, useState } from "react";
import { Video } from "../../../backoffice/bloc/components/video/class/Video";

interface BlocParams {
  bloc: Video;
  updateLoaded: any;
  full: boolean;
  isResponsive: boolean;
}

function VideoVizualisation({
  bloc,
  updateLoaded,
  full,
  isResponsive,
}: BlocParams) {
  useEffect(() => {}, [bloc]);
  const [external, isExternalLink] = useState<boolean>();
  const [isToggle, setToggle] = useState<boolean>(false);
  const [blocWidth, setblocWidth] = useState<number>(0);
  const [blocHeight, setblocHeight] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const blocRef = useRef<any>();
  function updateblocRef() {
    const blocWidth: number | undefined = blocRef?.current?.clientWidth;

    const blocHeight: number | undefined = blocRef.current?.clientHeight;
    if (blocHeight !== undefined && blocWidth !== undefined) {
      setblocHeight(blocHeight);
      setblocWidth(blocWidth);
      updateLoaded !== undefined && updateLoaded(true);
    }
  }
  const checkExternal = async (url: string) => {
    let prefixe = url.substring(0, 4);

    if (prefixe === "http") {
      isExternalLink(true);
    } else if (/.pdf/.test(url.substring(url.length - 4))) {
      setToggle(true);
    } else {
      isExternalLink(false);
    }
    setUrl(url);
  };

  useEffect(() => {
    checkExternal(bloc.video_url);
  }, []);
  useEffect(() => {
    updateblocRef();
  }, [external, url, isResponsive]);

  useEffect(() => {
    setToggle(!isToggle);
  }, [blocHeight]);
  useEffect(() => {}, [url]);
  return url !== undefined && url.length > 0 && external ? (
    <div>
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
            marginBottom: "0",
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
      <div
        style={{
          margin: "0 auto",
          marginTop: "30px",
          width: `${full ? (isResponsive ? "380px" : "50vw") : "43vw"}`,
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
            width: `${isResponsive ? "380px" : bloc.width + "%"}`,
            height: `${bloc.height + "%"}`,
          }}
          ref={blocRef}
          src={url}
          title={bloc.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => {
            updateLoaded !== undefined && updateLoaded(true);
          }}
        ></iframe>
      </div>
    </div>
  ) : (
    url !== undefined && url.length > 0 && (
      <div
        className={s.bloc}
        style={{
          width: "100%",
          marginLeft: `${full ? "0" : "30px"}`,
          height: `${
            full ? (isResponsive ? 150 : blocHeight - 330) : blocHeight
          }px`,

          maxHeight: "calc(100vh - 330px)",
          marginTop: `${
            full
              ? !isResponsive
                ? "130px"
                : "75px"
              : bloc.bloc_number > 1
              ? "230px"
              : "0"
          }`,
          marginBottom: full ? (!isResponsive ? "230px" : "60px") : "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className={s.encart}
          style={{
            position: "relative",
            width: "100%",
            zIndex: "2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "white",
              display: "inline-block",
              textAlign: "center",
              fontSize: `${full ? (!isResponsive ? "72px" : "35px") : "72px"}`,
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
        <div
          ref={blocRef}
          style={{
            position: "absolute",
            left: full ? 0 : "53vw",
            right: full ? 0 : "3vw",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video
            autoPlay
            muted
            width={bloc.width + "%"}
            height={bloc.height + "%"}
            onLoadedData={() => {
              updateblocRef();
            }}
          >
            <source
              src={
                "http://localhost:80/cms_v3/welcome_poitiers/api/uploadfile/" +
                url
              }
              type="video/webm"
            />
          </video>
        </div>
      </div>
    )
  );
}

export default VideoVizualisation;
