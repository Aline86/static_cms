import { createContext, useContext, useEffect, useState } from "react";
import Common from "./admin/backoffice/bloc/components/common/class/Common";

const getBloc = async () => {
  let common = new Common();
  return new Promise(async function (resolve, _) {
    let result = await common.get_bloc();
    resolve(result);
    if (result.id >= 1) {
      resolve(await common.get_bloc());
    }
    if (result.id === -1) {
      resolve(await common.save_bloc());
      resolve(await common.get_bloc());
    }
  });
};

const saveBloc = async () => {
  let common = new Common();

  let result = await common.get_bloc();

  if (result.id === -1) {
    await common.save_bloc();
    return false;
  } else if (result !== undefined) {
    return true;
  }
};
const ColorContext = createContext<any>(
  new Common("#ffffff", "black", "#2f6091")
);

export const useCommon = () => {
  return useContext(ColorContext);
};
function ColorContextProvider(children: any) {
  const [common, setCommon] = useState<any>(
    new Common("#ffffff", "black", "#2f6091")
  );

  async function updateCommon(e: any, field: string, common: Common) {
    common.update(e, field);
    await common.save_bloc();
    initCommon();
  }
  async function initCommon() {
    return await getBloc().then((data) => {
      setCommon(data);
    });
  }

  useEffect(() => {}, []);
  useEffect(() => {}, [common]);
  return (
    <ColorContext.Provider
      value={{ common, updateCommon, saveBloc, initCommon }}
    >
      {children.children}
    </ColorContext.Provider>
  );
}

export default ColorContext;

export { ColorContextProvider };
