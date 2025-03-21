import Page from "../../../backoffice/page/class/Page";
import { Button } from "../../../backoffice/page/page_template/bloc_components/components/button/class/Button";
import { Carousel } from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/Carousel";
import { Parallaxe } from "../../../backoffice/page/page_template/bloc_components/components/parallaxe/class/Parallaxe";
import { PictureGroup } from "../../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroup";
import { TextPicture } from "../../../backoffice/page/page_template/bloc_components/components/text_picture/class/TextPicture";
import { Video } from "../../../backoffice/page/page_template/bloc_components/components/video/class/Video";
import { Screen } from "../../../backoffice/page/page_template/bloc_components/components/screen/class/Screen";

export default class BlocTools {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getAllBlocsPage = async () => {
    return await this.getPage();
  };

  getPage = async () => {
    this.page = await this.page.get_bloc();

    let fullfilled_bloc_component_promises =
      await this.page.get_blocs_for_page();

    return this.getAllRequests(fullfilled_bloc_component_promises);
  };

  getAllRequests = async (async_result: any[]) => {
    const unordered_data = async (page: Page) => {
      async_result.forEach(async (bloc, index) => {
        if (bloc.type === "text_picture") {
          let text_picture = new TextPicture(
            bloc.id,
            bloc.bloc_number,
            page.id
          );
          async_result[index] = this.getBloc(text_picture.get_bloc());
        }
        if (bloc.type === "carousel") {
          let carousel = new Carousel(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(carousel.get_bloc());
        }
        if (bloc.type === "picture_group") {
          let picture_group = new PictureGroup(
            page.id,
            bloc.bloc_number,
            bloc.id
          );
          async_result[index] = this.getBloc(picture_group.get_bloc());
        }
        if (bloc.type === "button") {
          let button = new Button(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(button.get_bloc());
        }
        if (bloc.type === "video") {
          let video = new Video(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(video.get_bloc());
        }
        if (bloc.type === "parallaxe") {
          let parallaxe = new Parallaxe(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(parallaxe.get_bloc());
        }
        if (bloc.type === "screen") {
          let screen = new Screen(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(screen.get_bloc());
        }
      });

      return async_result;
    };

    let promises = await unordered_data(this.page);

    return Promise.all(promises).then((data) => {
      let ordered = this.sortComponents(data);
      return ordered;
    });
  };

  getBloc = (promise: Promise<any>) => {
    return new Promise(async function (resolve) {
      resolve(await promise);
    });
  };
  sortComponents = (array_unsorted: any) => {
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
      n--;

      // Reduce the range of the next iteration
    } while (swapped); // Continue if a swap occurred

    return arr;
  };
}
