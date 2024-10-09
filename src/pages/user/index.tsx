import React from "react";
import { HeaderWidget } from "../../widgets/header-widget";
import { Link } from "react-router-dom";

export const User = () => {
  return (
    <>
      <HeaderWidget />
      <Link to="/">
        <h1>Назад</h1>
      </Link>
    </>
  );
};
