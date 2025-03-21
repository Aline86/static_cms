import { TextPicture } from "../../../../backoffice/page/page_template/bloc_components/components/text_picture/class/TextPicture";

interface TitreParams {
  bloc: TextPicture;
}

function Titre({ bloc }: TitreParams) {
  return <h2>{bloc.title}</h2>;
}

export default Titre;
