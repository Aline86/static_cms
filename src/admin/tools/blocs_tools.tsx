import { Carousel } from "../backend/bloc/components/carousel/class/Carousel";
import Footer from "../backend/bloc/components/footer/Footer";
import Header from "../backend/bloc/components/header/Header";
import { TextPicture } from "../backend/bloc/components/text_picture/class/TextPicture";
import Page from "../backend/page/class/Page";

export default class BlocTools {
  header!: Header;
  footer!: Footer;
  page!: Page;

  constructor(header: Header, footer: Footer, page: Page) {
    this.header = header;
    this.footer = footer;
    this.page = page;
  }

  getHeader = async () => {
    return await this.header.get_bloc();
  };

  getFooter = async () => {
    return await this.footer.get_bloc();
  };

  getAllBlocsPage = async () => {
    await this.getHeader();
    await this.getFooter();
    let page_blocs = await this.getPage();

    let components = await this.sortComponents(page_blocs);
    return components;
  };

  getPage = async () => {
    this.page = await this.page.get_bloc();
    let async_result = await this.page.get_blocs_for_page();

    let get_page_requests = await this.getAllRequests(async_result);
    return get_page_requests;
  };

  async getAllRequests(async_result: any[]) {
    let unordered_data = async function (page: Page) {
      async_result.forEach(async (bloc, index) => {
        if (bloc.type === "text_picture") {
          let text_picture = new TextPicture(
            bloc.id,
            bloc.bloc_number,
            page.id
          );
          async_result[index] = await text_picture.get_bloc();
        }
        if (bloc.type === "carousel") {
          let carousel = new Carousel(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = await carousel.get_bloc();
        }
      });
      return async_result;
    };

    let data = await unordered_data(this.page);
    return data;
  }

  async sortComponents(array_unsorted: any) {
    let arr = array_unsorted;
    let n = arr.length;
    let swapped;
    // Bubble Sort Algorithm
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        // Compare the adjacent items based on the `key`
        if (arr[i].bloc_number > arr[i + 1].bloc_number) {
          // Swap the elements if they're in the wrong order
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
      n--; // Reduce the range of the next iteration
    } while (swapped); // Continue if a swap occurred
    return arr;
  }
}
