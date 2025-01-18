import Container from "../../bloc/Container";

export default class Page extends Container {
  parameters: string;
  page_number: number;
  constructor(
    id: number = -1,
    page_number: number = -1,
    title: string = "",
    type: string = "page"
  ) {
    super(id, title, type);
    this.id = id;
    this.title = title;
    this.type = type;
    this.page_number = page_number;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }
  _get_class_api_call_parameters(): string {
    return this.parameters;
  }
  updatePage(e: any, field: string) {
    switch (field) {
      case "title":
        this.set_title(e.target.value);
        break;
      default:
        null;
    }
  }

  async get_pages() {
    this.set_parameters(this.type + "&type=" + this.type);
    let page_array: Page[] = [];
    let pages = await this.get_blocs();
    pages.forEach((page) => {
      page_array.push(
        new Page(page.id, page.page_number, page.title, page.type)
      );
    });
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return page_array;
  }

  async get_blocs_for_page() {
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    let page_array: any[] = [];
    let pages = await this.get_blocs_for_component();
    pages.forEach((component) => {
      page_array.push(component);
    });

    return page_array;
  }

  public async remove_page() {
    this.set_parameters(
      "delete_" + this.type + "&id=" + this.id + "&type=" + this.type
    );

    let result = await this.delete_bloc();
    if (result !== undefined) {
      this.set_parameters(this.type + "&id=1&type=" + this.type);
      return this;
    }
  }
  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }
  public get_page_number(): number {
    return this.page_number;
  }
  public set_page_number(value: number) {
    this.page_number = value;
  }
}
