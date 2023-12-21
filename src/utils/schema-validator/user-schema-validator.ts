import Ajv from 'ajv';

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const signupSchema = {
  type: "object",
  required: ["firstName", "lastName","username","email","password","age"],
  properties: {
    firstName: {type: "string"},
    lastName: {type: "string"},
    username: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    age: {type: "integer"}
  },
  additionalProperties: false,
}

const loginSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: {type: "string"},
        password: {type: "string"}
    },
    additionalProperties: false,

}


export const checkSignupSchema = async(payload: Record<string, any>) => {
    try {
        const validate = ajv.compile(signupSchema);
        const valid = validate(payload)
        if (!valid){
            return false;
        }
        return true;
    } catch (err) {
        return err;
    }
}

export const checkLoginSchema = async(payload: Record<string, any>) => {
    try {
        const validate = ajv.compile(loginSchema);
        const valid = validate(payload)
        if (!valid){
            return false;
        }
        return true;
    } catch (err) {
        return err;
    }
}