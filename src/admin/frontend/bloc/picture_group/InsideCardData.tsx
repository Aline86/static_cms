import PictureGroupCard from "../../../backend/bloc/components/picture_group/class/PictureGroupData";

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
        width: "360px",

        aspectRatio: "1",
      }}
    >
      <div
        style={{
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `center`,
          marginBottom: "15px",
          fontSize: "25px",
          color: isLightOrDark(data.background_color),
          aspectRatio: "1",
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
