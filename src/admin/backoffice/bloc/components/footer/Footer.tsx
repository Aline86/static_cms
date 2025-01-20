import LinkNetworksAndOthersFooter from "./LinkNetworksAndOthersFooter";
import Address from "./Address";
import Container from "../../Container";
import { UploadService } from "../../../services/uploadService";

export default class Footer extends Container {
  id: number;
  title: string;
  type: string;
  parameters: string;
  address: Address;
  links_network_an_others_footer: Array<any>;
  map_iframe_url: string;
  background_color: string;

  constructor(
    id: number = -1,
    title: string = "",
    type: string = "footer",
    map_iframe_url: string = "",
    background_color: string = "#f9f9f9"
  ) {
    super(id, title, type);
    this.id = id;
    this.title = title;
    this.type = type;
    this.parameters = this.type + "&id=1&type=" + this.type;
    this.address = new Address();
    this.links_network_an_others_footer = [];
    this.map_iframe_url = map_iframe_url;
    this.background_color = background_color;
  }

  set_links_network_an_others_footer(
    links_network_an_others_footer: Array<any>
  ) {
    this.links_network_an_others_footer = [];
    links_network_an_others_footer.forEach((link_network_an_others_footer) => {
      this.links_network_an_others_footer.push(link_network_an_others_footer);
    });
  }

  add_links_network_an_others_footer(
    links_network_an_others_footer: LinkNetworksAndOthersFooter
  ) {
    this.links_network_an_others_footer.push(
      new LinkNetworksAndOthersFooter(
        links_network_an_others_footer.title,
        links_network_an_others_footer.background_url,
        links_network_an_others_footer.name,
        links_network_an_others_footer.logo_url
      )
    );
  }

  public async remove_link(index: number) {
    if (index !== undefined) {
      this.set_parameters(
        "delete_child&id=" +
          this.links_network_an_others_footer[index].id +
          "&type=" +
          this.type +
          "&associated_table=links_network_an_others_footer"
      );
      this.links_network_an_others_footer.splice(index, 1);
      await this.delete_bloc();
      this.set_parameters(this.type + "&id=1&type=" + this.type);

      return this;
    }
  }

  _get_class_api_call_parameters(): string {
    return this.parameters;
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

  public get_address(): Address {
    return this.address;
  }
  public set_address(address_array: Address[]) {
    address_array.forEach((value) => {
      this.address = new Address(
        value.title,
        value.address,
        value.town,
        value.id
      );
    });
  }

  public get_links_network_an_others_footer(): Array<any> {
    return this.links_network_an_others_footer;
  }

  public get_map_iframe_url(): string {
    return this.map_iframe_url;
  }
  public set_map_iframe_url(value: string) {
    this.map_iframe_url = value;
  }

  public get_background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  async updateFooter(
    e: any,
    field: string,
    input: string,
    index: number | undefined
  ) {
    switch (field) {
      case "footer":
        switch (input) {
          case "map_iframe_url":
            this.set_map_iframe_url(e.target.value);
            break;
          case "background_color":
            this.set_background_color(e.target.value);
            break;
        }
        break;
      case "address":
        switch (input) {
          case "title":
            this.address.title = e.target.value;
            break;
          case "address":
            this.address.address = e.target.value;
            break;
          case "town":
            this.address.town = e.target.value;
            break;
          default:
            null;
            break;
        }
        break;
      case "social_network":
        switch (input) {
          case "title":
            index !== undefined &&
              (this.links_network_an_others_footer[index].title =
                e.target.value);
            break;
          case "background_url":
            index !== undefined &&
              (this.links_network_an_others_footer[index].background_url =
                e.target.value);
            break;
          case "name":
            index !== undefined &&
              (this.links_network_an_others_footer[index].name =
                e.target.value);
            break;
          case "url_logo":
            index !== undefined &&
              (this.links_network_an_others_footer[index].logo_url =
                UploadService.sanitizeName(e.target.files[0].name));
            UploadService.handleUpload(e.target.files[0]);
            break;
          case "remove":
            index !== undefined && this.remove_link(index);
            break;
          default:
            null;
            break;
        }
        break;
      case "ajout":
        this.add_links_network_an_others_footer(
          new LinkNetworksAndOthersFooter()
        );
        break;
      default:
        null;
        break;
    }
    return this;
  }
}
