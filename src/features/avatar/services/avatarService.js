const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAssistantCode = async (userName) => {
  console.log('Searching for assistant code for user:', userName);

  const assistantData = await prisma.attendancedevice.findFirst({
    where: { name: userName },
  });

  console.log('Found assistant data:', assistantData);

  return assistantData ? assistantData.assisstant_code : null;
};

module.exports = { getAssistantCode };
