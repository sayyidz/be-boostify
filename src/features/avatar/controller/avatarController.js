const { getAssistantCode } = require("../services/avatarService")

const profileController = async (req, res) => {
    const user = req.user; // Asumsikan user sudah ada di req setelah autentikasi
    console.log('User data:', user);
    const assistantCode = await getAssistantCode(user.name);
  
    res.json({ user: user.name, assistantCode });
};

module.exports = profileController;


  