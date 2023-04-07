const { 
    joinVoiceChannel, createAudioResource, createAudioPlayer, getVoiceConnection
} = require('@discordjs/voice');
const { 
    MessageEmbed, MessageActionRow, MessageSelectMenu
} = require('discord.js');
const {DEFAULT_COLOR} = require('../../config.json')


const {CattoEmbed, timeoutDelete} = require('../../structure/functions');


module.exports.run = async (client, message, args) => {
        

     
        let isVoc = message.guild.channels.cache.find((channel) => channel.type == 'GUILD_VOICE' && !channel.members.has(message.author.id) && channel.members.has(client.user.id))
        const member = message.guild.members.cache.get(message.author.id).voice
        try {
            if(!member.channel) return CattoEmbed(message.author, `Vous devez être dans un salon vocal pour écouter de la radio.`, message.channel, '')
        } catch (error) {
            console.log("Une erreur est survenue" + error)
        }
        try {
            if (isVoc) return CattoEmbed(message.author, `Quelqu'un d'autre utilise déjà le bot dans le serveur.`, message.channel, '')
        } catch (error) {
            console.log("Une erreur est survenue" + error)
        }
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("📻 Choisissez Votre Radio")
            .addOptions([
                {
                    label: "NRJ",
                    description: "Permet d'écouter la Radio NRJ.",
                    value: "un",       
                    emoji: "<:NRJBelgique:1093266540314492959>"       
                },
                {
                    label: "NOSTALGIE",
                    description: "Permet d'écouter la radio NOSTALGIE.",
                    value: "deux",
                    emoji: "<:NostalgieBelgique:1093266537793736744>"
                },
                {
                    label: "CHERIE",
                    description: "Permet d'écouter la radio CHERIE.",
                    value: "trois",
                    emoji: "<:CherieFM001:1093266509624791040>"
                },
                {
                    label: "Rire & Chansons",
                    description: "Permet d'écouter la radio Rire & Chansons.",
                    value: "quatre",
                    emoji: "<:LOGOrirechansonspremium:1093266532177559642> "
                },
                {
                    label: "RTL",
                    description: "Permet d'écouter la radio RTL.",
                    value: "cinq",
                    emoji: "<:RTLRadioLetzebuerg001:1093268969714106420>"
                },
                {
                    label: "RTL 2",
                    description: "Permet d'écouter la radio RTL 2.",
                    value: "six",
                    emoji: "<:RTL2001:1093266554487046164>"
                },
                {
                    label: "Fun Radio France",
                    description: "Permet d'écouter la radio Fun Radio France.",
                    value: "sept",
                    emoji: "<:FunRadioBelgique:1093266526322299030>"
                },
                {
                    label: "Europe 1",
                    description: "Permet d'écouter la radio Europe 1.",
                    value: "huit",
                    emoji: "<:Europe1001:1093266512359460957>"
                },
                {
                    label: "Europe 2",
                    description: "Permet d'écouter la radio Europe 2",
                    value: "neuf",
                    emoji: "<:BlogEurope2001202301:1093266506751692885>"
                },
                {
                    label: "RFM",
                    description: "Permet d'écouter la radio RFM",
                    value: "dix",
                    emoji: "<:RFM001:1093587411344310403>"
                },
                {
                    label: "RMC",
                    description: "Permet d'écouter la radio RMC",
                    value: "onze",
                    emoji: "<:RMC001:1093266551748169758>"
                },
                {
                    label: "BFM Business",
                    description: "Permet d'écouter la radio BFM Business",
                    value: "douze",
                    emoji: "<:BFMBusiness001:1093266505262714961>"
                },
                {
                    label: "Skyrock",
                    description: "Permet d'écouter la radio Skyrock",
                    value: "treize",
                    emoji: "<:Skyrock001:1093587428247339049>"
                },
                {
                    label: "Radio Classique",
                    description: "Permet d'écouter la radio Radio Classique",
                    value: "quatorze",
                    emoji: "<:RadioClassique001:1093266547147018313>"
                },
                {
                    label: "France Info",
                    description: "Permet d'écouter la radio France Info",
                    value: "quinze",
                    emoji: "<:FranceInfo001:1093266518764171297>"
                },
                {
                    label: "France Inter",
                    description: "Permet d'écouter la radio France Inter",
                    value: "seize",
                    emoji: "<:FranceInter001:1093266522111225907>"
                },
                {
                    label: "France Culture",
                    description: "Permet d'écouter la radio France Culture",
                    value: "dixsept",
                    emoji: "<:FranceCulture001:1093266517669449890>"
                },
                {
                    label: "France Musique",
                    description: "Permet d'écouter la radio France Musique",
                    value: "dixhuit",
                    emoji: "<:FranceMusique001:1093266523734425661>"
                },
                {
                    label: "France Bleu",
                    description: "Permet d'écouter la radio France Bleu",
                    value: "dixneuf",
                    emoji: "<:FranceBleu107:1093266516201439392>"
                },
                {
                    label: "Fip - Nationale",
                    description: "Permet d'écouter la radio Fip - Nationale",
                    value: "vingt",
                    emoji: "<:Fip001:1093266513823281233>"
                },
                {
                    label: "Mouv'",
                    description: "Permet d'écouter la radio Mouv'",
                    value: "vingtun",
                    emoji: "<:Mouv001:1093588238440071190>"
                },
                {
                    label: "Ouï FM",
                    description: "Permet d'écouter la radio Ouï FM",
                    value: "vingtdeux",
                    emoji: "<:OuiFM001:1093592914988380272>"
                },
                {
                    label: "Jazz Radio",
                    description: "Permet d'écouter la radio Jazz Radio",
                    value: "vingttrois",
                    emoji: "<:JazzRadio001:1093266528130039920>"
                },
                {
                    label: "M Radio",
                    description: "Permet d'écouter la radio M Radio",
                    value: "vingtquatre",
                    emoji: "<:MFMRadio001:1093266535142928384>"
                },
                {
                    label: "Arrêter la radio",
                    description: "Permet d'arrêter la radio",
                    value: "off",
                    emoji: "<a:xpPRO:1093850419316404275>"
                }   
            ])
        )
 
        const embed = new MessageEmbed()
        .setColor(DEFAULT_COLOR)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Utilisez le menu ci-dessous pour choisir votre radio.\nVous avez un choix de **24** radios.`)
        .setThumbnail(message.author.displayAvatarURL({dynamic:true}))

  
            message.reply({ embeds: [embed], components: [row] })
        
        const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU"
        })

        collector.on("collect", async (c) => {
            
            try {
                if(c.user.id !== message.author.id) return c.reply({ content: `Vous ne pouvez pas modifier la radio de quelqu'un d'autre.`, ephemeral: true })
            } catch (error) {
                console.log("Une erreur est survenue" + error);
            }
            if(c.values[0] == 'off') {
                try {
                    
                getVoiceConnection(`${message.guild.id}`).disconnect();
                message.reply('J\'ai bien arrêté la radio')
                return;
                } catch (error) {
                    message.reply('Je ne suis pas dans une vocale !')
                }
            } 
            
            let links = { un: "https://scdn.nrjaudio.fm/adwz2/fr/30001/mp3_128.mp3?origine=fluxradios", deux: "https://scdn.nrjaudio.fm/adwz2/fr/30601/mp3_128.mp3?origine=fluxradios", trois: "https://scdn.nrjaudio.fm/adwz2/fr/30201/mp3_128.mp3?origine=fluxradios", quatre: "https://scdn.nrjaudio.fm/adwz2/fr/30401/mp3_128.mp3?origine=fluxradios", cinq: "http://icecast.rtl.fr/rtl-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg", six: "http://icecast.rtl2.fr/rtl2-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg", sept: "http://icecast.funradio.fr/fun-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg", huit: "http://stream.europe1.fr/europe1.mp3", neuf: "http://europe2.lmn.fm/europe2.mp3", dix: "http://stream.rfm.fr/rfm.mp3", onze: "http://audio.bfmtv.com/rmcradio_128.mp3", douze: "http://audio.bfmtv.com/bfmbusiness_128.mp3", treize: "http://icecast.skyrock.net/s/natio_aac_128k", quatorze: "http://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3", quinze: "http://icecast.radiofrance.fr/franceinfo-hifi.aac", seize: "http://icecast.radiofrance.fr/franceinter-hifi.aac", dixsept: "http://icecast.radiofrance.fr/franceculture-hifi.aac", dixhuit: "http://icecast.radiofrance.fr/francemusique-hifi.aac", dixneuf: "http://direct.francebleu.fr/live/fbnord-midfi.mp3", vingt: "http://icecast.radiofrance.fr/fip-hifi.aac", vingtun: "http://icecast.radiofrance.fr/mouv-hifi.aac", vingtdeux: "http://ouifm.ice.infomaniak.ch/ouifm-high.mp3", vingttrois: "http://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3", vingtquatre: "http://mfm.ice.infomaniak.ch/mfm-128.mp3" }
            let thislive = links[c.values[0]]
        
            const VoiceConnection = joinVoiceChannel({
                channelId: member.channelId,
                guildId: member.channel.guild.id,
                adapterCreator: member.channel.guild.voiceAdapterCreator
            });
            const live = createAudioResource(`${thislive}`, {
                inlineVolume: true
            }); 
            try {
                live.volume.setVolume(0.2)
                const player = createAudioPlayer()
                VoiceConnection.subscribe(player)
                player.play(live)
                await c.reply({content: `Lancement de la radio.`, ephemeral: true})
            } catch (error) {
                console.log("Une erreur est survenue" + error);
            }
          
        })                
}
 
module.exports.help = {
    name: "radio",
    aliases: ["r"],
    description: "Radio complète pour Nova World"
}