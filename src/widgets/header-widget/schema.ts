import * as yup from 'yup'

export const schemaPost = yup.object().shape({
  title: yup
    .string()
    .transform((value) => (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim())
    .min(3, 'Введите не менее 3 символов')
    .max(100, 'Введите не более 100 символов')
    .required('Введите не менее 3 символов'),
  image: yup
    .string()
    .transform((value) => value.trim())
    .url('Допускаются только ссылки')
    .required('Добавьте URL изображения'),
  content: yup
    .string()
    .transform((value) => (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).trim())
    .required('Введите текст'),
  link: yup
    .string()
    .transform((value) => value.trim())
    .url('Допускаются только ссылки')
    .required('Добавьте ссылку на источник')
})
