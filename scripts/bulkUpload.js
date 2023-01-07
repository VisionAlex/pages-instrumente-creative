require("dotenv").config();

const pLimit = require("p-limit");
const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

const { exit } = require("./utils");
const imgConfig = require("../app/config/images.json");

const imageFolder = "scripts/images/";
const zone = "instrumente-creative/";
let errored = 0;
let alreadyUploaded = 0;

const images = Object.values(imgConfig).reduce((acc, image) => {
  return [...acc, image.src];
}, []);

async function bulkUpload() {
  const { CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY } = process.env;
  if (!CF_IMAGES_ACCOUNT_ID || !CF_IMAGES_API_KEY) {
    exit(
      "Please set both CF_IMAGES_ACCOUNT_ID and CF_IMAGES_API_KEY in the environment"
    );
  }

  const limit = pLimit(10);
  const promises = [];
  for (const image of images) {
    promises.push(
      limit(() => upload(image, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY))
    );
  }
  await Promise.all(promises);
  if (errored > 0 || alreadyUploaded > 0) {
    console.log(
      `Done. From ${images.length} images: ${errored} errored, ${alreadyUploaded} already uploaded.`
    );
  } else {
    console.log(`Done. All ${images.length} images uploaded successfully.`);
  }
}

async function upload(imageName, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY) {
  const body = new FormData();
  const fileContent = fs.readFileSync(imageFolder + imageName);
  body.append("file", fileContent, {
    filename: zone + imageName,
  });
  body.append("id", zone + imageName);
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${CF_IMAGES_API_KEY}` },
        body,
      }
    );

    if (res.status !== 200 && res.status !== 409) {
      throw new Error("HTTP " + res.status + " : " + (await res.text()));
    }

    if (res.status === 409) {
      // 409: image already exists, it must have been imported by a previous run
      console.log("Already exist: " + imageName);
      alreadyUploaded++;
    }
  } catch (error) {
    errored++;
    console.log(`Could not upload ${imageName}: ${error}`);
  }
}

bulkUpload();
