import { UploadService } from "../../../../services/uploadService";
import Container from "../../../Container";

export class Screen extends Container {
  text: string;
  bloc_number: number;
  overlay: boolean;
  parameters: string;
  page_id: number;
  screen_url;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    overlay: boolean = true,
    text: string = "",
    title: string = "",
    type: string = "screen",
    screen_url: string = ""
  ) {
    super(id, title, type);
    this.bloc_number = bloc_number;
    this.page_id = page_id;
    this.overlay = overlay;
    this.text = text;
    this.screen_url = screen_url;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  public async update(e: any, field: string) {
    switch (field) {
      case "bloc_number":
        this.set_bloc_number(e);
        break;
      case "title":
        this.set_title(e.target.value);
        break;
      case "text":
        this.set_text(e.target.value);
        break;
      case "screen_url":
        if (e.target.files !== null) {
          let picture_name = await UploadService.handleUpload(
            e.target.files[0]
          );
          if (picture_name !== undefined && picture_name !== "") {
            this.set_screen_url(picture_name);
          }
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
  public get_screen_url(): string {
    return this.parameters;
  }
  public set_screen_url(value: string) {
    this.screen_url = value;
  }

  public _text(): string {
    return this.text;
  }
  public set_text(value: string) {
    this.text = value;
  }

  public _bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
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
