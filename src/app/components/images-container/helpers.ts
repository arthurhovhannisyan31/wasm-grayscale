import { convertFileToDataURL, convertImageToDataURL, createImage, getImageFromFile } from "app/utility/helpers/image";

import { baseCanvasProps, FILE_SIZE_LIMIT_MB, MIN_FILE_SIZE, supportedMimeTypes } from "./constants";
import { type BaseImageDimensions } from "./types";

export const imageFileValidation = (
  files: FileList,
  // setSnackbarProps: (message: string, severity: AlertProps["severity"]) => void,
): boolean => {
  if (!files.length) return false;

  if (files.length > 1) {
    // setSnackbarProps(
    //   errorsDict.filesQuantity,
    //   "warning",
    // );
    return false;
  }
  const file = files[0];

  if (!file.type) {
    // setSnackbarProps(
    //   errorsDict.fileType,
    //   "error",
    // );

    return false;
  }

  if (!supportedMimeTypes.includes(file.type)) {
    // setSnackbarProps(
    //   errorsDict.filesExtension,
    //   "error",
    // );

    return false;
  }

  if (file.size > FILE_SIZE_LIMIT_MB) {
    // setSnackbarProps(
    //   errorsDict.fileSize,
    //   "error",
    // );

    return false;
  }

  return true;
};

export const getNormalizedImageDimensions = (
  width: number,
  height: number,
): BaseImageDimensions => {
  const imgRatio = width / height;
  const baseRatio = baseCanvasProps.width / baseCanvasProps.height;

  if (imgRatio > baseRatio) {
    return {
      width: baseCanvasProps.width,
      height: baseCanvasProps.width / imgRatio,
    };
  }

  return {
    height: baseCanvasProps.height,
    width: baseCanvasProps.height * imgRatio,
  };
};

export const getImageDataURL = async (file: File): Promise<string> => {
  if (file.size < MIN_FILE_SIZE) {
    return convertFileToDataURL(file);
  }

  // get the width, height and src from an existing image
  const { width, height, src } = await getImageFromFile(file);
  const {
    width: resizedWidth,
    height: resizedHeight,
  } = getNormalizedImageDimensions(width, height);
  const scaledImg = await createImage(
    src,
    resizedWidth * 2, // create an image of a canvas double size for better quality
    resizedHeight * 2,
  );

  return convertImageToDataURL(
    scaledImg,
    resizedWidth * 2,
    resizedHeight * 2,
  );
};
