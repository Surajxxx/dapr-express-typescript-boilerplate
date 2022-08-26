import joi from 'joi';

export const registerUser = joi.object().keys({
  body: joi.object().keys({
    name: joi.string().required().trim().min(3),
    email: joi.string().required().email().trim()
      .lowercase(),
    password: joi.string().required(), // .pattern(new RegExp(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[#$@!%&?])[A-Za-z\d#$@!%&?]{8,15}$/)),
  }),
});

export const loginUser = joi.object().keys({
  body: joi.object().keys({
    email: joi.string().required().trim().lowercase(),
    password: joi.string().required(),
  }),
});

export const getUser = joi.object().keys({
  params: joi.object().keys({
    id: joi.string().required().hex().length(24),
  }),
});

export const updateUser = joi.object().keys({
  params: joi.object().keys({
    id: joi.string().required().hex().length(24),
  }),
  body: joi.object().keys({
    name: joi.string().required().min(3).trim(),
  }),
});
