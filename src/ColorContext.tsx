import { createContext, useContext } from "react";
import Common from "./admin/backend/bloc/components/common/class/Common";

const getBloc = async () => {
  let common = new Common("transparent", "black", "#2f6091");
  const new_bloc = await common.get_bloc();
  if (new_bloc !== undefined && new_bloc.id === 1) {
    return new_bloc;
  }
};
const ColorContext = createContext<any>(getBloc());

function ColorContextProvider(children: any) {
  const { common, setCommon } = useContext(ColorContext);

  return (
    <ColorContext.Provider value={{ common, setCommon }}>
      {children}
    </ColorContext.Provider>
  );
}

export default ColorContext;

export { ColorContextProvider };
