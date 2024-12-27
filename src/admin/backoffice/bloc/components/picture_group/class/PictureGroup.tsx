import { UploadService } from "../../../../services/uploadService";
import Container from "../../../Container";
import PictureGroupData from "./PictureGroupData";

export class PictureGroup extends Container {
  card_number: number;
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  picture_group_data: Array<PictureGroupData>;
  parameters: string;
  page_id: number;

  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    card_number: number = 4,
    width: number = 35,
    height: number = 25,
    gap: number = 30,
    title: string = "",
    type: string = "picture_group",
    picture_group_data: Array<any> = []
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.card_number = card_number;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;

    if (picture_group_data.length === 0) {
      this.picture_group_data = this.init_datas();
    } else {
      this.picture_group_data = picture_group_data;
    }

    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }
  init_datas() {
    let picture_group_data = [];
    for (let index = 0; index < this.card_number; index++) {
      picture_group_data.push(new PictureGroupData(-1, index, this.id));
    }
    return picture_group_data;
  }

  public async remove() {
    this.set_parameters("delete&id=" + this.id + "&type=" + this.type);

    let new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public update(e: any, field: string, index: number | undefined) {
    switch (field) {
      case "href_url":
        index !== undefined &&
          (this.picture_group_data[index].href_url = e.target.value);
        break;
      case "text":
        index !== undefined &&
          (this.picture_group_data[index].text = e.target.value);
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
        if (e.target.value < 25) {
          width = 25;
        } else if (e.target.value > 100) {
          width = 100;
        }
        this.set_width(width);
        break;
      case "is_data_button":
        index !== undefined &&
          (this.picture_group_data[index].is_data_button = e.target.checked
            ? true
            : false);
        break;
      case "image_url":
        index !== undefined &&
          (this.picture_group_data[index].image_url =
            UploadService.sanitizeName(e.target.files[0].name));
        UploadService.handleUpload(e.target.files[0], "http://localhost:80");
        break;
      case "color":
        index !== undefined &&
          (this.picture_group_data[index].background_color = e.target.value);
        break;
      case "bloc_number":
        this.set_bloc_number(e);
        break;
      case "ajout":
        this.add_data();
        this.card_number++;
        break;
      case "remove":
        index !== undefined &&
          this.picture_group_data[index] !== undefined &&
          this.remove_data(index);
        break;
    }

    return this;
  }
  public set_picture_group_data(picture_group_datas: Array<PictureGroupData>) {
    this.picture_group_data = [];

    picture_group_datas.forEach((picture_group_data) => {
      this.add_picture_group_data(picture_group_data);
    });
  }
  public add_data() {
    this.picture_group_data.push(
      new PictureGroupData(-1, this.picture_group_data.length - 1, this.id)
    );
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.picture_group_data[index].id +
        "&type=" +
        this.type +
        "&associated_table=picture_group_data"
    );

    let new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public add_picture_group_data(picture_group_data: PictureGroupData) {
    console.log("picture_group_data", picture_group_data.id);
    this.picture_group_data.push(
      new PictureGroupData(
        Number(picture_group_data.id),
        Number(picture_group_data.card_number),
        this.id,
        Boolean(Number(picture_group_data.is_data_button)),
        picture_group_data.href_url,
        picture_group_data.image_url,
        picture_group_data.text,
        picture_group_data.title,
        picture_group_data.type,
        picture_group_data.background_color,
        picture_group_data.text_color
      )
    );
  }
  remove_data(index: number | undefined) {
    index !== undefined && this.remove_link(index);
    index !== undefined && this.picture_group_data.splice(index, 1);
    this.card_number--;
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
