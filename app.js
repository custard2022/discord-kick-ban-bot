const Discord = require('discord.js');

const client = new Discord.Client();

// Replace 'TOKEN' with your bot's token
client.login('TOKEN');

client.on('ready', () => {
  console.log('Bot is ready.');
});

// Replace 'GUILD_ID' with your guild's ID
const guild = client.guilds.cache.get('GUILD_ID');

// Replace 'BAN_ROLE' with the name of the role that has permission to ban users
const banRole = guild.roles.cache.find(role => role.name === 'BAN_ROLE');

// Replace 'KICK_ROLE' with the name of the role that has permission to kick users
const kickRole = guild.roles.cache.find(role => role.name === 'KICK_ROLE');

client.on('message', message => {
  if (message.content === '!kick') {
    // Check if the user has the kick role
    if (!message.member.roles.cache.has(kickRole.id)) {
      return message.reply("You don't have permission to use this command.");
    }

    // Check if the bot has the ban role
    if (!guild.me.roles.cache.has(banRole.id)) {
      return message.reply("I don't have permission to use this command.");
    }

    // Check if the message mentions a user to kick
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("You must mention a user to kick.");
    }

    // Kick the user
    const member = guild.members.cache.get(user.id);
    if (!member) {
      return message.reply("That user is not in this guild.");
    }
    member
      .kick()
      .then(() => message.reply(`Successfully kicked ${user.tag}.`))
      .catch(error => message.reply(`Unable to kick user: ${error}`));
  } else if (message.content === '!ban') {
    // Check if the user has the ban role
    if (!message.member.roles.cache.has(banRole.id)) {
      return message.reply("You don't have permission to use this command.");
    }

    // Check if the bot has the ban role
    if (!guild.me.roles.cache.has(banRole.id)) {
      return message.reply("I don't have permission to use this command.");
    }

    // Check if the message mentions a user to ban
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("You must mention a user to ban.");
    }

    // Ban the user
    const member = guild.members.cache.get(user.id);
    if (!member) {
      return message.reply("That user is not in this guild.");
    }
    member
      .ban()
      .then(() => message.reply(`Successfully banned ${user.tag}.`))
      .catch(error => message.reply(`Unable to ban user: ${error}.`));
    }
});