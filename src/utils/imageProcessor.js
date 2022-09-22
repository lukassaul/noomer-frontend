export default function imageProcessor(file) {
  return new Promise((resolve, reject) => {

    if (!file) reject("error");
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      //document.querySelector("#input").src = event.target.result;

      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 480;

        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
        resolve(srcEncoded);
      };
    }

    reader.onerror = (error) => reject(error);
  });
}
