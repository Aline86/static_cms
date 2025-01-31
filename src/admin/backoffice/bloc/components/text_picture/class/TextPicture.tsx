import { UploadService } from "../../../../services/uploadService";
import Container from "../../../Container";
import OptionsCss from "./OptionsCss";

export class TextPicture extends Container {
  show_picture: boolean;
  show_text: boolean;
  bloc_column: boolean;
  image_right: boolean;
  text_button_more: boolean;
  text: string;
  image: string;
  alt_image: string;
  bloc_number: number;
  css: OptionsCss;
  background_color: string;
  parameters: string;
  page_id: number;
  constructor(
    id: number = -1,
    bloc_number: number,
    page_id: number,

    show_picture: boolean = true,
    show_text: boolean = true,
    bloc_column: boolean = false,
    image_right: boolean = false,
    text_button_more: boolean = false,
    text: string = "",
    image: string = "",
    alt_image: string = "",

    title: string = "",
    type: string = "text_picture",
    background_color: string = "#ffffff",
    css: OptionsCss = new OptionsCss()
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.show_picture = show_picture;
    this.show_text = show_text;
    this.bloc_column = bloc_column;
    this.image_right = image_right;
    this.text_button_more = text_button_more;
    this.text = text;
    this.image = image;
    this.alt_image = alt_image;
    this.bloc_number = bloc_number;
    this.css = css;
    this.background_color = background_color;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  public async update(
    e: any,
    field: string,
    css_type: string | undefined = undefined
  ) {
    switch (field) {
      case "show_picture":
        this.set_show_picture(e.target.checked ? true : false);
        break;
      case "show_text":
        this.set_show_text(e.target.checked ? true : false);
        break;
      case "bloc_column":
        this.set_bloc_column(e);
        break;
      case "bloc_number":
        this.set_bloc_number(e);
        break;
      case "image_right":
        this.set_image_right(e);
        break;

      case "text_button_more":
        this.set_text_button_more(e.target.checked ? true : false);
        break;
      case "title":
        this.set_title(e.target.value);
        break;
      case "alt_image":
        this.set_alt_image(e.target.value);
        break;
      case "color":
        this.set_background_color(e.target.value);
        break;
      case "image":
        if (e.target.files !== null) {
          let picture_name = await UploadService.handleUpload(
            e.target.files[0]
          );
          console.log("image", picture_name);
          if (picture_name !== undefined && picture_name !== "") {
            this.set_image(picture_name);
          }
        }
        break;
      case "css":
        switch (css_type) {
          case "width":
            this.css.width = e.target.value;
            break;
          case "height":
            this.css.height = e.target.value;
            break;
          case "position":
            this.css.position = e.target.alt;
            break;
        }
        break;
      default:
        null;
    }

    return this;
  }

  public async remove() {
    this.set_parameters(
      "delete&id=" +
        this.id +
        "&type=" +
        this.type +
        "&id_component=" +
        this.page_id +
        "&associated_table=page"
    );

    let new_bloc = await this.delete_bloc();
    return new_bloc;
  }
  _get_class_api_call_parameters() {
    return this.parameters;
  }
  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public _show_picture(): boolean {
    return this.show_picture;
  }
  public set_show_picture(value: boolean) {
    this.show_picture = value;
  }

  public _show_text(): boolean {
    return this.show_text;
  }
  public set_show_text(value: boolean) {
    this.show_text = value;
  }

  public _bloc_column(): boolean {
    return this.bloc_column;
  }
  public set_bloc_column(value: boolean) {
    this.bloc_column = value;
  }

  public _image_right(): boolean {
    return this.image_right;
  }
  public set_image_right(value: boolean) {
    this.image_right = value;
  }

  public _text_button_more(): boolean {
    return this.text_button_more;
  }
  public set_text_button_more(value: boolean) {
    this.text_button_more = value;
  }

  public _text(): string {
    return this.text;
  }
  public set_text(value: string) {
    this.text = value;
  }

  public _image(): string {
    return this.image;
  }
  public set_image(value: string) {
    this.image = value;
  }

  public _alt_image(): string {
    return this.alt_image;
  }
  public set_alt_image(value: string) {
    this.alt_image = value;
  }

  public _bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
  }

  public _css(): OptionsCss {
    return this.css;
  }
  public set_css(value: OptionsCss) {
    this.css = value;
  }

  public _background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  public _id(): number {
    return this.id;
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
}
