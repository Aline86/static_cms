export default class ButtonCard {
  id: number;
  button_id: number;
  title: string;
  type: string;
  href_url: string;
  image_url: string;
  text: string;
  background_color: string;
  text_color: string;

  constructor(
    button_id: number,
    id: number = -1,
    href_url: string = "",
    image_url: string = "",
    text: string = "",
    title: string = "",
    type: string = "",
    background_color: string = "#ffffff",
    text_color: string = "#000000"
  ) {
    this.button_id = button_id;
    this.id = id;
    this.image_url = image_url;
    this.text = text;
    this.href_url = href_url;
    this.button_id = button_id;
    this.title = title;
    this.type = type;
    this.background_color = background_color;
    this.text_color = text_color;
  }
}
