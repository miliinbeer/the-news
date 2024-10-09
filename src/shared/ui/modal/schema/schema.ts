import * as yup from "yup";

export const schemaPost = yup.object().shape({
  title: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .min(3, "Введите не менее 3 символов")
    .max(100, "Введите не более 100 символов")
    .required("Введите не менее 3 символов"),
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
    .required("Введите текст"),
  link: yup
    .string()
    .transform((value) => value.trim())
    .url("Допускаются только ссылки")
    .required("Добавьте ссылку на источник"),
});

export const schemaRegistration = yup.object().shape({
  login: yup
    .string()
    .matches(/[A-Za-z]/, "Допускаются символы только на латинице")
    .transform((value) => value.trim())
    .min(3, "Введите не менее 3 символов")
    .max(30, "Введите не более 30 символов")
    .required("Введите логин"),
  password: yup
    .string()
    .transform((value) => value.trim())
    .min(3, "Введите не менее 3 символов")
    .max(30, "Введите не более 30 символов")
    .required("Введите пароль"),
  lastname: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .min(3, "Введите не менее 3 символов")
    .max(30, "Введите не более 20 символов")
    .required("Укажите Вашу фамилию"),
  firstname: yup
    .string()
    .transform((value) =>
      (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim()
    )
    .min(3, "Введите не менее 3 символов")
    .max(30, "Введите не более 30 символов")
    .required("Укажите Ваше имя"),
});

export const schemaEntrance = yup.object().shape({
  login: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
});
