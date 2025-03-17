/* returns base64 encoding string */
export const convertFileToDataURL = (
  file: File,
): Promise<string> => new Promise((res, rej) => {
  const reader = new FileReader();

  reader.onload = () => res(reader.result as string);
  reader.onerror = rej;
  reader.readAsDataURL(file);
});

export const convertImageToDataURL = (
  image: CanvasImageSource,
  width: number,
  height: number,
): string => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const canvasCtx = canvas.getContext("2d");
  canvasCtx?.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg");
};

export const createImage = async (
  src: string,
  width?: number,
  height?: number,
): Promise<HTMLImageElement> => {
  const img = document.createElement("img");

  if (width) {
    img.width = width;
  }

  if (height) {
    img.height = height;
  }

  img.src = src;

  return new Promise((res, rej) => {
    img.onload = () => {
      res(img);
    };
    img.onerror = (err) => {
      rej(err);
    };
  });
};

export const getImageFromFile = async (file: File): Promise<HTMLImageElement> => {
  const base64 = await convertFileToDataURL(file);

  return createImage(base64);
};
