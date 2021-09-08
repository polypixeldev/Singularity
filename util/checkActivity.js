module.exports = async (client) => {
  const inactivityTimeout = 1000 * 60 * 60 * 24 * 14;
  let inactives = await client.userModel.find({
    activity: { $lte: new Date(new Date().getTime() - inactivityTimeout) },
  });

  let finals = inactives.filter(() => Math.random() < 0.6);

  let changed = finals.map((userDoc) => {
    userDoc.protons -= Math.random() * 100;
    userDoc.electrons -= Math.random() * 50;
    return userDoc;
  });

  changed.forEach((userDoc) => {
    client.utils.updateUser(client, userDoc.guildID, userDoc.userID, userDoc);
  });
};
