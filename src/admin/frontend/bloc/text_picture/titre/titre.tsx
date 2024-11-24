interface TitreParams {
  titre: string;
}

function Titre({ titre }: TitreParams) {
  return <h2>{titre}</h2>;
}

export default Titre;
