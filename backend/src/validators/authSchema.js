const z = require("zod");

const signUpSchema = z.object({
  fullname: z.string().min(1),
  email: z.email(),
  password: z.string().min(8).max(20),
});

module.exports = {
  signUpSchema,
};
