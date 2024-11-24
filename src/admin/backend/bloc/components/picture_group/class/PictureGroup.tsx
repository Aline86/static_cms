import Container from "../../../Container";
import PictureGroupCard from "./PictureGroupData";

export class PictureGroup extends Container {
  isCarousel: boolean;
  isAutomatique: boolean;
  card_number: number;
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  picture_group_data: Array<PictureGroupCard>;
  parameters: string;
  page_id: number;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    isCarousel: boolean = true,
    isAutomatique: boolean = false,
    card_number: number = 4,
    width: number = 25,
    height: number = 20,
    gap: number = 30,
    title: string = "",
    type: string = "picture_group",
    picture_group_data: Array<any> = []
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.isCarousel = isCarousel;
    this.isAutomatique = isAutomatique;
    this.card_number = card_number;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    this.picture_group_data = picture_group_data;
    if (id === -1) {
      this.init_datas();
    }
    this.parameters =
      this.type +
      "&id_bloc=" +
      this.id +
      "&id_page=" +
      this.page_id +
      "&type=" +
      this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }
  init_datas = () => {
    for (let index = 1; index <= this.card_number; index++) {
      this.picture_group_data.push(
        new PictureGroupCard(this.id, this.card_number, index)
      );
      this.card_number++;
    }
  };
  set_datas = (cards: Array<any>) => {
    cards.forEach((card) => {
      this.add_data(card);
    });
  };

  add_data = (card: PictureGroupCard) => {
    this.picture_group_data.push(
      new PictureGroupCard(
        this.id,
        card.id,
        card.card_number,
        card.href_url,
        card.image_url,
        card.text,
        card.title,
        card.type,
        card.background_color,
        card.text_color,
        card.is_data_button
      )
    );
  };
  remove_data = (index: number | undefined) => {
    index !== undefined && this.picture_group_data.splice(index, 1);
    this.card_number--;
  };

  public get_isCarousel(): boolean {
    return this.isCarousel;
  }
  public set_isCarousel(value: boolean) {
    this.isCarousel = value;
  }

  public get_isAutomatique(): boolean {
    return this.isAutomatique;
  }
  public set_isAutomatique(value: boolean) {
    this.isAutomatique = value;
  }

  public get_data_number(): number {
    return this.card_number;
  }
  public set_data_number(value: number) {
    this.card_number = value;
  }

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

  public get_picture_group_data(): Array<any> {
    return this.picture_group_data;
  }
  public set_picture_group_data(value: any) {
    this.set_datas(value);
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public get_page_id(): number {
    return this.page_id;
  }
  public set_page_id(value: number) {
    this.page_id = value;
  }
}
