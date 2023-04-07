const { MessageEmbed } = require("discord.js")
const {DEFAULT_COLOR} = require('../../config.json')


const {DEFAULT_PREFIX} = require('../../config.json')

module.exports.run = async (client, message, args) => {
    

   let prefix = DEFAULT_PREFIX
    const i = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(` **Informations** :\n\`help\`\n\n:radio: **Radio** :\n\`radio\``)
    .setColor(DEFAULT_COLOR)
    .setFooter(`Nova World x WhiteHall`)
    await message.reply({embeds: [i]})
}

module.exports.help = {
    name: "help",
    aliases: ["h"],
    description: "Page d'aide du bot"
}