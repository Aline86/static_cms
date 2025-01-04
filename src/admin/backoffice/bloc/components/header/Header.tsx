import { UploadService } from "../../../services/uploadService";
import Container from "../../Container";
import LinkNetworksAndOthersHeader from "./LinkNetworksAndOthersHeader";

export default class Header extends Container {
  id: number;
  title: string;
  type: string;
  parameters: string;
  link_networks_an_others_header: Array<LinkNetworksAndOthersHeader>;
  logo_url: string;
  background_url: string;

  constructor(
    id: number = -1,
    title: string = "",
    type: string = "header",
    logo_url: string = "",
    background_color: string = ""
  ) {
    super(id, title, type);
    this.id = id;
    this.title = title;
    this.type = type;
    this.logo_url = logo_url;
    this.background_url = background_color;
    this.link_networks_an_others_header = [];
    this.parameters = this.type + "&id=1&type=" + this.type;
  }
  public set_link_networks_an_others_header(
    link_networks_an_others_header: Array<any>
  ) {
    this.link_networks_an_others_header = [];

    link_networks_an_others_header.length > 0 &&
      link_networks_an_others_header.forEach(
        (link_networks_an_others_header) => {
          this.add_link_networks_an_others_header(
            link_networks_an_others_header
          );
        }
      );
  }

  public add_link_networks_an_others_header(
    link_networks_an_others_header: LinkNetworksAndOthersHeader = new LinkNetworksAndOthersHeader()
  ) {
    this.link_networks_an_others_header.push(
      new LinkNetworksAndOthersHeader(
        this.link_networks_an_others_header.length,
        link_networks_an_others_header.id,
        link_networks_an_others_header.title,
        link_networks_an_others_header.background_url,
        link_networks_an_others_header.name,
        link_networks_an_others_header.logo_url
      )
    );
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.link_networks_an_others_header[index].id +
        "&type=" +
        this.type +
        "&associated_table=link_networks_an_others_header"
    );
    await this.delete_bloc();
    index !== undefined && this.link_networks_an_others_header.splice(index, 1);
    this.set_parameters(this.type + "&id=1&type=" + this.type);

    return this;
  }

  _get_class_api_call_parameters(): string {
    return this.parameters;
  }

  public async updateHeader(
    e: any,
    field: string,
    input: string | undefined,
    index: number | undefined
  ) {
    switch (field) {
      case "title":
        this.set_title(e.target.value);
        break;
      case "logo_url":
        this.set_logo_url(UploadService.sanitizeName(e.target.files[0].name));
        UploadService.handleUpload(e.target.files[0]);

        break;
      case "background_url":
        this.set_background_url(
          UploadService.sanitizeName(e.target.files[0].name)
        );
        UploadService.handleUpload(e.target.files[0]);
        break;
      case "social_network":
        switch (input) {
          case "title":
            index !== undefined &&
              (this.link_networks_an_others_header[index].title =
                e.target.value);

            break;
          case "background_url":
            index !== undefined &&
              (this.link_networks_an_others_header[index].background_url =
                e.target.value);

            break;
          case "url_logo":
            index !== undefined &&
              (this.link_networks_an_others_header[index].logo_url =
                UploadService.sanitizeName(e.target.files[0].name));

            UploadService.handleUpload(e.target.files[0]);

            break;

          case "name":
            index !== undefined &&
              (this.link_networks_an_others_header[index].name =
                e.target.value);
            break;
          case "remove":
            console.log("index", index);
            index !== undefined && (await this.remove_link(index));
            break;
          default:
            null;
            break;
        }
        break;
      case "ajout":
        this.add_link_networks_an_others_header();
        break;

      default:
        null;
    }

    return this;
  }

  public get_id(): number {
    return this.id;
  }
  public set_id(value: number) {
    this.id = value;
  }

  public get_title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }

  public get_type(): string {
    return this.type;
  }
  public set_type(value: string) {
    this.type = value;
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public get_link_networks_an_others_header(): Array<LinkNetworksAndOthersHeader> {
    return this.link_networks_an_others_header;
  }

  public get_logo_url(): string {
    return this.logo_url;
  }
  public set_logo_url(value: string) {
    this.logo_url = value;
  }

  public get_background_url(): string {
    return this.background_url;
  }
  public set_background_url(value: string) {
    this.background_url = value;
  }
}
