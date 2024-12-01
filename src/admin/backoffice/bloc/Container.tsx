// Classe finalement adaptée à tous les types de blocs
// Permet de gérer tous les calls api grâce à une structure d'url liée aux noms
// d'attributs (logique qui sera suivie sur le même principe pour les méthodes api)
// Logique basée sur le fait que les noms de colonnes en bdd sont identiques au attributs des enfants

export default abstract class Container {
  id: number;
  title: string;
  type: string;
  // à mettre dans un process .env
  BASE_URL: string =
    "http://localhost:80/cms_v3/welcome_poitiers/api/index.php?method=";

  constructor(id: number = -1, title: string = "", type: string = "") {
    this.id = id;
    this.title = title;
    this.type = type;
  }
  /**
   *
   * @param bloc any child component
   * @returns a form with the data to send to the API
   */
  private _create_form(bloc: any): FormData {
    let formdata = new FormData();
    const class_properties = Object.keys(this);
    class_properties.forEach((property: any) => {
      if (typeof self[property] !== "function") {
        try {
          formdata.append(property, JSON.stringify(bloc[property]));
        } catch {
          formdata.append(property, encodeURIComponent(bloc[property]));
        }
      }
    });
    return formdata;
  }

  /**
   *
   * @param bloc child Class
   * @param action add or update
   * @returns string with promise status to say if data has been correctly sent
   */
  public async save_bloc(): Promise<this> {
    let sent: this;
    const action = this.id > -1 ? "update" : "add";
    let data_to_send = this._create_form(this);
    await fetch(
      this.BASE_URL + action + "_" + this._get_class_api_call_parameters(),
      {
        mode: "no-cors",
        method: "POST",
        body: data_to_send,
      }
    )
      .then((response) => response)
      .then((response) => {
        return this;
      })
      .catch((error: any) => {
        console.error(error.message);
      });

    return this;
  }

  /**
   *
   * @param id
   * @returns the full instance for each child type (the parent knows which child we are talking about)
   */
  public async get_blocs(): Promise<Array<this>> {
    let new_bloc: Array<this> = [];

    try {
      const response = await fetch(
        this.BASE_URL + "all_" + this._get_class_api_call_parameters()
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      try {
        const json_object = await response.json();
        new_bloc = json_object;
      } catch (error) {}
    } catch (error: any) {
      console.error(error.message);
    }

    return new_bloc;
  }

  /**
   *
   * @param id
   * @returns the full instance for each child type (the parent knows which child we are talking about)
   */
  public async get_blocs_for_component(): Promise<Array<any>> {
    let new_bloc: Array<any> = [];
    console.log(this.BASE_URL + "all_" + this._get_class_api_call_parameters());
    try {
      const response = await fetch(
        this.BASE_URL + "all_" + this._get_class_api_call_parameters()
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      try {
        const json_object = await response.json();
        new_bloc = json_object;
      } catch (error) {}
    } catch (error: any) {
      console.error(error.message);
    }

    return new_bloc;
  }
  /**
   *
   * @returns the full instance for each child type (the parent knows which child we are talking about)
   */
  public async get_bloc(): Promise<this> {
    let new_bloc: this = this;
    try {
      const response = await fetch(
        this.BASE_URL + "get_" + this._get_class_api_call_parameters()
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      try {
        const json_object = await response.json();
        if (json_object.length >= 1) {
          let property_list: any = {};
          const class_properties: any = Object.keys(this);
          class_properties.forEach((key_exists: string) => {
            if (key_exists !== "parameters" && key_exists !== "BASE_URL") {
              property_list[key_exists] = [];
            }
          });

          json_object.forEach((value: this) => {
            Object.entries(value).forEach(([property, data]) => {
              property_list[property] = data;
            });
          });

          this._property_call(property_list);
        }
      } catch (error) {}
    } catch (error: any) {
      console.error(error.message);
    }

    return new_bloc;
  }
  public async delete_bloc(): Promise<void | this> {
    try {
      const response = await fetch(
        this.BASE_URL + this._get_class_api_call_parameters()
      );
      if (response.ok) {
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public set_id(value: number) {
    this.id = value;
  }
  public _title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }

  public _type(): string {
    return this.type;
  }
  public set_type(value: string) {
    this.type = value;
  }
  /**
   *
   * @param property_list list of keys in json object received from api call
   */
  _property_call(property_list: any) {
    for (const property in property_list) {
      this.setProperty(this, property, property_list[property]);
    }
  }
  setProperty(instance: any, propName: any, value: any) {
    let name: any = "set_" + propName;

    if (instance[name] !== undefined) {
      try {
        value = JSON.parse(value);
      } catch (error) {
        value = value;
      }

      // Call the setter as a method
      instance[name](value);
    }
  }

  abstract _get_class_api_call_parameters(): string;
}
