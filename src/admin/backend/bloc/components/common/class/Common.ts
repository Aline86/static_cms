import Container from "../../../Container";

export default class Common extends Container {
  id: number;
  title: string;
  type: string;
  fond: string;
  titles: string;
  background_color_buttons: string;
  parameters: string;

  constructor(
    fond: string = "transparent",
    titles: string = "black",
    background_color_buttons: string = "#2f6091",
    id: number = -1,
    title: string = "",
    type: string = "common"
  ) {
    super(id, title, type);
    this.id = id;
    this.title = title;
    this.type = type;
    this.fond = fond;
    this.titles = titles;
    this.background_color_buttons = background_color_buttons;
    this.parameters = this.type + "&id=1&type=" + this.type;
  }

  public update(e: any, field: string) {
    switch (field) {
      case "titles":
        this.set_titles(e.target.value);
        break;
      case "fond":
        this.set_fond(e.target.value);
        break;
      case "background_color_buttons":
        this.set_background_color_buttons(e.target.value);
        break;
    }

    return this;
  }
  _get_class_api_call_parameters(): string {
    return this.parameters;
  }

  public get_id(): number {
    return this.id;
  }
  public set_id(value: number) {
    this.id = value;
  }

  public get_title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }

  public get_type(): string {
    return this.type;
  }
  public set_type(value: string) {
    this.type = value;
  }

  public get_fond(): string {
    return this.fond;
  }
  public set_fond(value: string) {
    this.fond = value;
  }

  public get_titles(): string {
    return this.titles;
  }
  public set_titles(value: string) {
    this.titles = value;
  }

  public get_background_color_buttons(): string {
    return this.background_color_buttons;
  }
  public set_background_color_buttons(value: string) {
    this.background_color_buttons = value;
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }
}
