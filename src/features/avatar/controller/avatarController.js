const { getAssistantCode } = require("../services/avatarService")

const profileController = async (req, res) => {
    const user = req.user;
    console.log('User data:', user);
    const assistantCode = await getAssistantCode(user.name);
  
    res.json({ name: user.name, assistantCode });
};

module.exports = profileController;


  