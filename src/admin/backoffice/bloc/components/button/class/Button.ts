import { UploadService } from "../../../../services/uploadService";
import Container from "../../../Container";

export class Button extends Container {
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  parameters: string;
  page_id: number;
  href_url: string;
  image_url: string;
  text: string;
  background_color: string;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    width: number = 15,
    height: number = 35,
    gap: number = 30,
    href_url: string = "",
    image_url: string = "",
    text: string = "",
    title: string = "",
    background_color: string = "#ffffff",
    type: string = "button"
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    this.href_url = href_url;
    this.image_url = image_url;
    this.text = text;
    this.background_color = background_color;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }

  public async remove() {
    this.set_parameters("delete&id=" + this.id + "&type=" + this.type);

    let new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public update(e: any, field: string) {
    switch (field) {
      case "href_url":
        if (e.target.files !== null) {
          this.set_href_url(UploadService.sanitizeName(e.target.files[0].name));
          UploadService.handleUpload(e.target.files[0]);
        } else {
          this.set_href_url(e.target.value);
        }
        break;
      case "title":
        this.set_title(e.target.value);
        break;
      case "text":
        this.set_text(e.target.value);
        break;
      case "height":
        let height = e.target.value;
        if (e.target.value < 15) {
          height = 15;
        } else if (e.target.value > 100) {
          height = 100;
        }
        this.set_height(height);
        break;
      case "width":
        let width = e.target.value;
        if (e.target.value < 5) {
          width = 5;
        } else if (e.target.value > 80) {
          width = 80;
        }
        this.set_width(width);
        break;

      case "image_url":
        this.set_image_url(UploadService.sanitizeName(e.target.files[0].name));
        UploadService.handleUpload(e.target.files[0]);
        break;
      case "background_color":
        this.set_background_color(e.target.value);
        break;
      case "bloc_number":
        this.set_bloc_number(e);
        break;
    }

    return this;
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

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public get_href_url(): string {
    return this.href_url;
  }
  public set_href_url(value: string) {
    this.href_url = value;
  }
  public get_background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  public get_image_url(): string {
    return this.image_url;
  }
  public set_image_url(value: string) {
    this.image_url = value;
  }

  public get_text(): string {
    return this.text;
  }
  public set_text(value: string) {
    this.text = value;
  }

  public get_page_id(): number {
    return this.page_id;
  }
  public set_page_id(value: number) {
    this.page_id = value;
  }
}
