import { UploadService } from "../../../../../../services/uploadService";
import Container from "../../Container";

export class Parallaxe extends Container {
  image: string;
  parameters: string;
  page_id: number;
  alt_image: string;
  bloc_number: number;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    image: string = "",
    alt_image: string = "",
    title: string = "",
    type: string = "parallaxe"
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.image = image;
    this.alt_image = alt_image;
    this.bloc_number = bloc_number;
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
      case "alt_image":
        this.set_alt_image(e.target.value);
        break;
      case "image":
        let picture_name = await UploadService.handleUpload(e.target.files[0]);

        if (picture_name !== undefined && picture_name !== "") {
          this.set_image(picture_name);
          return this;
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
