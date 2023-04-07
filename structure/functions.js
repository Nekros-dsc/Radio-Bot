const Discord = require('discord.js');
const {DEFAULT_COLOR} = require('../config.json');




const timeoutDelete = (message, time = 10) => {
    if (!message) return
    let t = time*1000
    setTimeout(() => message.delete(), t)
}

const CattoEmbed = (author, desc, channel, title = '', timeout = undefined, thumbnail='') => {
    if (!channel) return;
    let e = new Discord.MessageEmbed()
        .setAuthor(author.tag, author.displayAvatarURL({dynamic : true}))
        .setDescription(desc)
        .setColor(DEFAULT_COLOR)
        .setFooter(`Nova World x WhiteHall`)
        .setThumbnail(author.displayAvatarURL({dynamic:true}))
    return channel.send({embeds : [e]}).then(m => {
        if (timeout !== undefined) {
            timeoutDelete(m, timeout)
        }
    })
}

module.exports = {
    timeoutDelete,
    CattoEmbed
}