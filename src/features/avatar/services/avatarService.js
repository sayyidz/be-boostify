const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAssistantCode = async (userName) => {
  const assistantData = await prisma.assisstant.findFirst({
    where: { name: userName },
  });

  return assistantData ? assistantData.assisstant_code : null;
};

module.exports = { getAssistantCode };
