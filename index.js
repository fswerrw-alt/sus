const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment, DiscordAPIError } = require("discord.js");
const {prefix, token, oskowner} = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
const ms = require('ms')
const client2 = require('nekos.life');
const disbut = require('discord-buttons')(client);
const { url } = require('inspector');
const {nsfw} = new client2();
const neko = new client2();

client.commands = new Discord.Collection();//начало команд ханделера
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);//конец
}
client.on('ready', () => {
  console.log("хз");
  client.user.setActivity(`Локдаун бот.`)
})
 
client.on('message', async (message) => {
  if (message.channel.type != 'text' || message.author.bot) return;
  const content = message.content.split(' ');
  const args = content.slice(0);
  const command = args.shift();

  if (command === prefix + 'lockchannel') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
    
    }
    if (command === prefix + 'unlockchannel') {
      if (!message.member.hasPermission('ADMINISTRATOR'))  return;
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
    }

});
client.login(token);