import { UploadService } from "../../../../services/uploadService";
import Container from "../../../Container";

export class Video extends Container {
  text: string;
  width: number;
  height: number;
  bloc_number: number;
  overlay: boolean;
  parameters: string;
  page_id: number;
  video_url;
  constructor(
    page_id: number,

    bloc_number: number,
    id: number = -1,
    overlay: boolean = true,
    text: string = "",
    width: number = 100,
    height: number = 100,
    title: string = "",
    type: string = "video",
    video_url: string = ""
  ) {
    super(id, title, type);

    this.bloc_number = bloc_number;
    this.page_id = page_id;
    this.overlay = overlay;
    this.width = width;
    this.height = height;
    this.text = text;
    this.video_url = video_url;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  public update(e: any, field: string) {
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
      case "height":
        let height = e.target.value;
        console.log(height);
        if (e.target.value < 15) {
          height = 15;
        } else if (e.target.value > 100) {
          height = 100;
        }
        this.set_height(height);
        break;
      case "width":
        let width = e.target.value;
        if (e.target.value < 25) {
          width = 25;
        } else if (e.target.value > 100) {
          width = 100;
        }
        console.log(width);
        this.set_width(width);
        break;
      case "video_url":
        if (
          e.target.value.includes("https") &&
          e.target.value.includes("youtube")
        ) {
          this.set_video_url(e.target.value);
        } else if (e.target.files !== null) {
          this.set_video_url(
            UploadService.sanitizeName(e.target.files[0].name)
          );
          UploadService.handleUpload(e.target.files[0], "http://localhost:80");
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
  public get_video_url(): string {
    return this.parameters;
  }
  public set_video_url(value: string) {
    this.video_url = value;
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
