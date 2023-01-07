import { CloudflareImage } from "~/components/shared/image/types";
import jsonImages from "./images.json";

export const images = {
  images: jsonImages satisfies { [key: string]: CloudflareImage },
  baseUrl:
    "https://imagedelivery.net/_Qvu0ID0pPyVjDxZnl16ng/instrumente-creative/",
};
