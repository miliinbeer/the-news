import * as yup from 'yup'

export const schemaPost = yup.object().shape({
  title: yup
    .string()
    .transform((value) => value)
    .min(3, 'Введите не менее 3 символов')
    .max(100, 'Введите не более 100 символов')
    .required('Введите не менее 3 символов'),
  content: yup
    .string()
    .transform((value) => value)
    .required('Введите текст'),
  link: yup
    .string()
    .transform((value) => value.trim())
    .url('Допускаются только ссылки')
    .required('Добавьте ссылку на источник'),
  image: yup
    .string()
    .transform((value) => value.trim())
    .url('Допускаются только ссылки')
    .required('Добавьте URL изображения')
})
