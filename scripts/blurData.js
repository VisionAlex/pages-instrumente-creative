const fs = require("fs");
const { getPlaiceholder } = require("plaiceholder");
const imgConfig = require("../app/config/images.json");

const baseUrl =
  "https://imagedelivery.net/_Qvu0ID0pPyVjDxZnl16ng/instrumente-creative/";

const getBlurData = async () => {
  for (let name in imgConfig) {
    const { base64 } = await getPlaiceholder(
      baseUrl + imgConfig[name].src + "/gamma=0"
    );
    imgConfig[name].blurDataUrl = base64;
  }
};

getBlurData().then(() => {
  fs.writeFileSync(
    "app/config/images.json",
    JSON.stringify(imgConfig, null, 2)
  );
});
