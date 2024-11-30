import { UploadService } from "../../../../services/uploadService";
import Container from "../../../Container";
import CarouselData from "./CarouselData";

export class Carousel extends Container {
  isAutomatique: boolean;

  card_number: number;
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  carousel_data: Array<CarouselData>;
  parameters: string;
  page_id: number;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    isAutomatique: boolean = false,
    card_number: number = 5,
    width: number = 25,
    height: number = 32,
    gap: number = 30,
    title: string = "",
    type: string = "carousel",
    carousel_data: Array<CarouselData> = []
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.isAutomatique = isAutomatique;
    this.card_number = card_number;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    if (carousel_data.length === 0) {
      this.carousel_data = this.init_datas();
    } else {
      this.carousel_data = carousel_data;
    }

    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }
  init_datas() {
    let carousel_data = [];
    for (let index = 0; index < this.card_number; index++) {
      carousel_data.push(new CarouselData(-1, index, this.id));
    }
    return carousel_data;
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
          (this.carousel_data[index].href_url = e.target.value);
        break;
      case "text":
        index !== undefined &&
          (this.carousel_data[index].text = e.target.value);
        break;
      case "height":
        this.set_height(e.target.value);
        break;
      case "width":
        this.set_width(e.target.value);
        break;
      case "image_url":
        index !== undefined &&
          (this.carousel_data[index].image_url = UploadService.sanitizeName(
            e.target.files[0].name
          ));
        UploadService.handleUpload(e.target.files[0], "http://localhost:80");
        break;
      case "color":
        index !== undefined &&
          (this.carousel_data[index].background_color = e.target.value);
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
          this.carousel_data[index] !== undefined &&
          this.card_number >= 2 &&
          this.remove_data(index);
        break;
    }

    return this;
  }
  public set_carousel_data(carousel_datas: Array<CarouselData>) {
    this.carousel_data = [];

    carousel_datas.forEach((carousel_data) => {
      this.add_carousel_data(carousel_data);
    });
  }
  public add_data() {
    this.carousel_data.push(
      new CarouselData(-1, this.carousel_data.length - 1, this.id)
    );
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.carousel_data[index].id +
        "&type=" +
        this.type +
        "&associated_table=carousel_data"
    );

    let new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public add_carousel_data(carousel_data: CarouselData) {
    this.carousel_data.push(
      new CarouselData(
        carousel_data.id,
        carousel_data.card_number,
        this.id,
        carousel_data.href_url,
        carousel_data.image_url,
        carousel_data.text,
        carousel_data.title,
        carousel_data.type,
        carousel_data.background_color,
        carousel_data.text_color
      )
    );
  }
  remove_data(index: number | undefined) {
    index !== undefined && this.carousel_data.splice(index, 1);
    this.card_number--;
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

  public get_carousel_data(): Array<any> {
    return this.carousel_data;
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
