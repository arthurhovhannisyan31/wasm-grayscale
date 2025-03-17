import { FC, useRef, useState } from "react";

import { Box, Button, Input } from "@mui/material";

import { errorsDict, IMAGE_META_DATA_REGEX } from "app/components/images-container/constants";
import { imageFileValidation } from "app/components/images-container/helpers";
import { convertFileToDataURL } from "app/utility/helpers/image";

import { inputStyles } from "app/components/images-container/styles";

export const ImagesContainer: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");

  console.log({
    image
  });

  const processFiles = async (files: FileList | null | undefined) => {
    if (!files) {
      return;
    }
    if (!imageFileValidation(files)) {
      return;
    }

    try {
      const imageData = await convertFileToDataURL(files[0]);
      setImage(imageData.replace(IMAGE_META_DATA_REGEX, ""));
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
    </Box>
  );
};
