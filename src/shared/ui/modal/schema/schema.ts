import * as yup from "yup";

export const schemaPost = yup.object().shape({
  title: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .min(3, "Ввведите не менее 3 символов")
    .required("Ввведите не менее 3 символов"),
  image: yup
    .string()
    .transform((value) => value.trim())
    .url("Допускаются только ссылки")
    .required("Добавьте URL изображения"),
  content: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .required("Обязательное поле"),
  link: yup
    .string()
    .transform((value) => value.trim())
    .url("Допускаются только ссылки")
    .required("Добавьте ссылку на источник"),
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
