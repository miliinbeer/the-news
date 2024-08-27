import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Введите минимум 3 символа")
    .required("Обязательное поле"),
  image: yup
    .string()
    .url("Допускаются только ссылки")
    .required("Обязательное поле"),
  content: yup
    .string()
    .min(10, "Введите минимум 10 символов")
    .required("Обязательное поле"),
  link: yup
    .string()
    .url("Допускаются только ссылки")
    .required("Обязательное поле"),
});
