const { Collection } = require('discord.js')

const {DEFAULT_PREFIX} = require('./../config.json')
const {timeoutDelete} = require('./../structure/functions.js')


module.exports = async (client, message) => {

    if (!message) return
    if (!message.guild) return
    if (message.author.bot) return

    let prefix = DEFAULT_PREFIX


    if ((client.user.id) == (message.mentions.members.first())) return message.channel.send(`» Mon préfix est : \`${prefix}\``)
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (commandName.length <= 0) return;

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName))
    if (!command) return message.channel.send(`Cette commande n'existe pas ! Veuillez vérifier l'aide ou l'orthographier correctement.`).then(m => timeoutDelete(m, 7))
    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection())
    }

    const timeNow = Date.now()
    const tStamps = client.cooldowns.get(command.help.name)
    const cdAmount = (command.help.cooldown) * 1000
    let unit = 'secondes'

    if (tStamps.has(message.author.id)) {
        const cooldownExp = tStamps.get(message.author.id) + cdAmount
        if (timeNow < cooldownExp) {
            let timeLeft = (cooldownExp - timeNow) / 1000;
            if (timeLeft >= 3600) {
                timeLeft = timeLeft/3600
                if (timeLeft >= 60) {
                    timeLeft = timeLeft/60
                }
                unit = 'heures'
            } else if (timeLeft < 3600 && timeLeft >= 60) {
                timeLeft = timeLeft/60
                unit = 'minutes'
            }
            return message.reply(`» Vous devez attendre **${timeLeft.toFixed(0)} ${unit}** avant de réutiliser la commande  : **${commandName}**.`).then(m => timeoutDelete(m, 10))
        }
    }
    tStamps.set(message.author.id, timeNow)
    setTimeout(() => tStamps.delete(message.author.id), cdAmount)
    console.log(`Exécution de la commande : \`${command.help.name}\``)
    command.run(client, message, args)
}