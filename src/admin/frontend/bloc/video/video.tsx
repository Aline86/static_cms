import s from "./style.module.css";

import { useEffect, useRef, useState } from "react";
import { Video } from "../../../backoffice/bloc/components/video/class/Video";

interface BlocParams {
  bloc: Video;

  updateLoaded: any;
  full: boolean;
  videoLoaded: boolean;
  isResponsive: boolean;
}

function VideoVizualisation({
  bloc,
  updateLoaded,
  full,
  videoLoaded,
  isResponsive,
}: BlocParams) {
  useEffect(() => {}, [bloc]);
  const [external, isExternalLink] = useState<boolean>();
  const [isToggle, setToggle] = useState<boolean>(false);
  const [blocWidth, setblocWidth] = useState<number>(0);
  const [blocHeight, setblocHeight] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const blocRef = useRef<any>();
  const result = window.matchMedia("(max-width: 800px)");
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
  }, [videoLoaded]);
  useEffect(() => {
    updateblocRef();
  }, [external, url, isResponsive]);

  useEffect(() => {
    setToggle(!isToggle);
  }, [blocHeight]);
  useEffect(() => {
    window.addEventListener("resize", updateblocRef);
  }, [isToggle, window.innerWidth]);
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
          marginTop: full
            ? !isResponsive && !result.matches
              ? "-60px"
              : "30px"
            : "0px",
          marginBottom: "60px",
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
  ) : url !== undefined && url.length > 0 ? (
    <div className={s.bloc}>
      <div
        style={{
          position: "relative",
          width: `${blocWidth + "px"}`,
          height: `${blocHeight + "px"}`,
          marginLeft: full
            ? isResponsive
              ? "0"
              : result.matches
              ? "0"
              : "0px"
            : "30px",
          marginTop: full
            ? isResponsive
              ? "-0px"
              : !result.matches
              ? "-60px"
              : "75px"
            : "0",
        }}
      >
        <div
          className={s.encart}
          style={{
            position: `${
              full
                ? isResponsive || !result.matches
                  ? "absolute"
                  : "relative"
                : "absolute"
            }`,
            top: `${full ? (isResponsive ? "200px" : "40%") : "100px"}`,
            left: `${full ? (isResponsive ? "50%" : "50%") : "0%"}`,
            transform: `${
              full
                ? isResponsive
                  ? "translate(-50%, -50%)"
                  : "translate(-50%, -50%)"
                : "unset"
            }`,
            color: "red",
            height: full ? (isResponsive ? "auto" : "100vh") : "50%",
            width: full ? (isResponsive ? "100vw" : "100vw") : "43vw",
            zIndex: "2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",

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
        <video
          ref={blocRef}
          style={{
            position: `${
              full
                ? isResponsive || !result.matches
                  ? "relative"
                  : "absolute"
                : "relative"
            }`,

            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            height: `${full ? (isResponsive ? "300px" : "auto") : "auto"}`,
            width: `${full ? (isResponsive ? "380px" : "100vw") : "43vw"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          autoPlay
          muted
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
  ) : (
    url !== undefined &&
    url.length === 0 && (
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
    )
  );
}

export default VideoVizualisation;
