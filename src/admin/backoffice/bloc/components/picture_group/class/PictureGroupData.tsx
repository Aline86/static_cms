export default class PictureGroupData {
  id: number;
  card_number: number;
  picture_group_id: number;
  title: string;
  type: string;
  href_url: string;
  image_url: string;
  text: string;
  background_color: string;
  text_color: string;
  is_data_button: boolean;

  constructor(
    id: number = -1,

    card_number: number,
    picture_group_id: number,
    is_data_button: boolean = false,
    href_url: string = "",
    image_url: string = "",
    text: string = "",
    title: string = "",
    type: string = "picture_group_data",
    background_color: string = "#ffffff",
    text_color: string = "#000000"
  ) {
    this.id = id;
    this.image_url = image_url;
    this.card_number = card_number;

    this.text = text;
    this.href_url = href_url;
    this.picture_group_id = picture_group_id;
    this.title = title;
    this.type = type;
    this.background_color = background_color;
    this.text_color = text_color;
    this.is_data_button = is_data_button;
  }
}
