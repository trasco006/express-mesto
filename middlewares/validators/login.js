const {celebrate, Joi} = require('celebrate')
const validator = require('validator')

const login = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Минимальная длина имени 2 символа',
      'string.max': 'Максимальная длина имени 30 символов',
      'any.required': 'Обязательное поле'
    }),
    password: Joi.string().min(6).max(30).required().messages({
      'string.min': 'Минимальная длина имени 2 символа',
      'string.max': 'Максимальная длина имени 30 символов',
      'any.required': 'Обязательное поле'
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value
      }
      return helper.message('Не валидный email')
    })
      .message({
        'any.required': 'Обязательное поле'
      })
  },
})

module.exports = login
