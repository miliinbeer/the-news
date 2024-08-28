import React, { FunctionComponent } from "react";
import { InputProps } from "reactstrap";
import { Input, Errors, Error, Description } from "./styles";

export const InputWidget: FunctionComponent<InputProps> = ({
  placeholder,
  register,
  error,
  message,
  description,
}) => {
  return (
    <div>
      <Input placeholder={placeholder} {...register} />
      <Errors>
        {error ? (
          <Error>{message}</Error>
        ) : (
          <Description>{description}</Description>
        )}
      </Errors>
    </div>
  );
};
