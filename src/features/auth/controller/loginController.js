const { loginUser } = require("../services/loginService");

const login = async (req, res) => {
    try {
      const token = await loginUser(req.body.assisstant_code, req.body.password);
      res.status(200).json(
        { 
            token,
        });
    } catch (error) {
      res.status(400).json(
        {
            error: error.message,
        });
    }
  };

module.exports = login;