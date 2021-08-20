module.exports = (guild, tag) => {
  let member = guild.members.cache.find((member) => member.user.tag === tag);
  if (member) {
    return member.user;
  } else {
    return;
  }
};
