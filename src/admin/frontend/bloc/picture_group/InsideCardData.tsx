import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";

interface CardDatas {
  data: PictureGroupCard;
  isLightOrDark: any;
}

function InsideCardData({ data, isLightOrDark }: CardDatas) {
  const style = {
    cursor: "pointer",
    color: isLightOrDark(data.background_color),
    border: "1px solid " + `${isLightOrDark(data.background_color)}`,
    marginBottom: `25px`,
  };

  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        marginBlock: "0 auto",
        width: "90%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `center`,
          height: "100%",
          marginBottom: "15px",
          fontSize: "25px",
          color: isLightOrDark(data.background_color),
        }}
      >
        {data.text}
      </div>

      <button style={style} className="buttons">
        Voir
      </button>
    </div>
  );
}

export default InsideCardData;
