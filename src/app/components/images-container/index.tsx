import { FC, useRef, useState } from "react";

import { Box, Button, Input } from "@mui/material";

import { errorsDict } from "app/components/images-container/constants";
import { getImageDataURL, imageFileValidation } from "app/components/images-container/helpers";
import { useDnDEvent } from "app/utility/hooks/useDnDEvent";

import { inputStyles } from "app/components/images-container/styles";

export interface ImagesContainerProps {
  some?: boolean;
}

export const ImagesContainer: FC<ImagesContainerProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOver, ref } = useDnDEvent();
  const [image, setImage] = useState("");

  const processFiles = async (files: FileList | null | undefined) => {
    if (!files) {
      return;
    }
    if (!imageFileValidation(files, setSnackbarProps)) {
      return;
    }

    try {
      setImage(await getImageDataURL(files[0]));
    } catch {
      setSnackbarProps(
        errorsDict.fileParsing,
        "error",
      );
    }
  };

  const handleFileChange = () => {
    processFiles(inputRef.current?.files);
  };

  return (
    <Box>
      <Button>
        Upload
      </Button>
      <Input
        inputRef={inputRef}
        type="file"
        inputProps={{
          accept: "image/*",
          multiple: false,
        }}
        sx={inputStyles}
        onChange={handleFileChange}
      />
    </Box>
  );
};
