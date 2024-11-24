import Container from "../../../Container";
import ButtonCard from "./ButtonCard";

export class Button extends Container {
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  button_data: ButtonCard;
  parameters: string;
  pageID: number;
  constructor(
    pageID: number,
    bloc_number: number,
    id: number = -1,
    width: number = 25,
    height: number = 20,
    gap: number = 30,
    title: string = "",
    type: string = "button"
  ) {
    super(id, title, type);
    this.pageID = pageID;
    this.title = title;
    this.type = type;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    this.button_data = new ButtonCard(this.id, -1);

    this.parameters =
      this.type +
      "&id_bloc=" +
      this.id +
      "&id_page=" +
      this.pageID +
      "&type=" +
      this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }

  set_datas = (card: ButtonCard) => {
    this.add_data(card);
  };

  add_data = (card: ButtonCard) => {
    this.button_data = new ButtonCard(
      this.id,
      card.id,
      card.href_url,
      card.image_url,
      card.text,
      card.title,
      card.type,
      card.background_color,
      card.text_color
    );
  };

  public get_width(): number {
    return this.width;
  }
  public set_width(value: number) {
    this.width = value;
  }

  public get_height(): number {
    return this.height;
  }
  public set_height(value: number) {
    this.height = value;
  }

  public get_gap(): number {
    return this.gap;
  }
  public set_gap(value: number) {
    this.gap = value;
  }

  public get_bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
  }

  public get_carousel_data(): ButtonCard {
    return this.button_data;
  }
  public set_carousel_data(value: any) {
    this.set_datas(value);
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public get_pageID(): number {
    return this.pageID;
  }
  public set_pageID(value: number) {
    this.pageID = value;
  }
}
