import React, { FunctionComponent } from "react";
import { InputProps } from "../../types";
import { CustomInput, Descriptions, ErrorMessage, Description } from "./styles";

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  register,
  descriptions
}) => {
  return (
    <>
      <CustomInput placeholder={placeholder} {...register} />
      {descriptions}
    </>
  );
};
