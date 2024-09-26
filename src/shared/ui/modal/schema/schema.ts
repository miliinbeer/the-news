import * as yup from "yup";

export const schemaPost = yup.object().shape({
  title: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .min(3, "Введите не менее 3 символов")
    .max(20, "Введите не более 20 символов")
    .required("Обязательное поле"),
  image: yup
    .string()
    .transform((value) => value.trim())
    .url("Допускаются только ссылки")
    .required("Обязательное поле"),
  content: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .min(10, "Введите более 10 символов")
    .max(300, "Введите не более 300 символов")
    .required("Обязательное поле"),
  link: yup
    .string()
    .transform((value) => value.trim())
    .url("Допускаются только ссылки")
    .required("Обязательное поле"),
});

export const schemaRegistration = yup.object().shape({
  login: yup
    .string()
    .matches(/[A-Za-z]/, "Введите на английском")
    .transform((value) => value.trim())
    .min(3, "Введите не менее 3 символов")
    .max(20, "Введите не более 20 символов")
    .required("Обязательное поле"),
  password: yup
    .string()
    .transform((value) => value.trim())
    .min(3, "Введите не менее 3 символов")
    .max(10, "Введите не более 10 символов")
    .required("Обязательное поле"),
  firstname: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .max(15, "Введите не более 15 символов")
    .required("Обязательное поле"),
  lastname: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .max(30, "Введите не более 20 символов")
    .required("Обязательное поле"),
});

export const schemaEntrance = yup.object().shape({
  login: yup
    .string()
    .matches(/[A-Za-z]/, "Введите на английском")
    .transform((value) => value.trim())
    .min(3, "Введите не менее 3 символов")
    .max(20, "Введите не более 20 символов")
    .required("Обязательное поле"),
  password: yup
    .string()
    .transform((value) => value.trim())
    .min(3, "Введите не менее 3 символов")
    .max(10, "Введите не более 10 символов")
    .required("Обязательное поле"),
});
