const { registerUser } = require("../services/registerService")

const register = async (req, res) => {
    try {
        const regis = await registerUser(req.body.name, req.body.assisstant_code, req.body.password);
        res.status(200).json(
            {
                regis,
            });
      } catch (error) {
        res.status(400).json(
            {
                error: error.message,
            });
      }
}

module.exports = register;