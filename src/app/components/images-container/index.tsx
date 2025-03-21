import { FC, useRef, useState } from "react";

import { Box, Button, Input } from "@mui/material";
import Image from "next/image";

import { errorsDict, IMAGE_META_DATA_REGEX } from "app/components/images-container/constants";
import { imageFileValidation } from "app/components/images-container/helpers";
import { convertFileToDataURL } from "app/utility/helpers/image";
import { useInitWasm } from "app/utility/hooks/useInitWasm";

import { inputStyles } from "app/components/images-container/styles";

export const ImagesContainer: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wasm = useInitWasm();
  const [imageData, setImageData] = useState("");

  const processFiles = async (files: FileList | null | undefined) => {
    if (!files) {
      return;
    }
    if (!imageFileValidation(files)) {
      return;
    }

    try {
      const imageData = await convertFileToDataURL(files[0]);
      const headlessImageData = imageData.replace(IMAGE_META_DATA_REGEX, "");
      const image_base64_data = wasm?.grayscale(headlessImageData);
      console.log({
        image_base64_data
      });
      setImageData(imageData);
    } catch (e) {
      console.log(e);
      console.log(errorsDict.fileParsing);
    }
  };

  const handleFileChange = () => {
    processFiles(inputRef.current?.files);
  };

  const openFileModal = () => {
    inputRef.current?.click();
  };

  return (
    <Box>
      <Button onClick={openFileModal}>
        Upload
      </Button>
      <Input
        inputRef={inputRef}
        type="file"
        inputProps={{
          accept: "image/*",
          multiple: false,
          onChange: handleFileChange
        }}
        sx={inputStyles}
      />
      <Image
        src={imageData}
        alt="Processed image"
        width={500}
        height={500}
      />
    </Box>
  );
};
