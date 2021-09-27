client.on('message', async(msg) => {
 
    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(msg.content.length >= 300) {
    msg.delete();
   return msg.channel.send(`${msg.author} , you are not allowed to send unnecessarily long and annoying messages in this server!`)
     
    }
 
if(msg.mentions.users.size > 2 && !msg.member.hasPermission('BYPASS PERMISSION GOES HERE') && !msg.channel.id === 'BYPASS CHANNEL ID GOES HERE') {
 
 
msg.delete()
return msg.reply('you cannot mass mention users in this server!')
 
}
//ANTI LINE SPAM
try {
var lineArray = msg.content.match(/\n/g);
var number = lineArray.length
 
if(number >= 4) {
    msg.delete()
    return msg.reply('you cannot line spam in this server!')
    
}
}catch(err) {
 
 
}
 
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent)) {
          msg.delete();
         return msg.reply('you cannot send links in this server!')
      }
 
      
        if(msg.content.includes('<@!**YOUR USER ID HERE**>')) { // PUT YOUR USER ID WHERE IT SAYS **YOUR USER ID HERE**
            msg.delete()
           return msg.reply('you cannot ping this user')
        }
 
    var array = ['bad' , 'words', 'go' , 'here', 'if you are seeing this, pls sub to my channel :)'];
 
        if(array.some(w =>  ` ${msg.content.toLowerCase()} `.includes(` ${w} `))){
            var emojiGuild = client.guilds.cache.find(guild => guild.name === 'PUT YOUR GUILD NAME HERE') //PUT YOUR GUILD NAME HERE
            var animeBonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'EMOJI NAME HERE') //PUT YOUR EMOJI NAME HERE
 
 
            msg.delete()
            msg.reply(`${animeBonk} this server does not tolerate that kind of language! Continuing will result in a mute!`)
 
            var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            
 
            if(!warnsJSON[msg.author.id]) {
                warnsJSON[msg.author.id] = {
                    warns: 0
                }
 
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }
 
            warnsJSON[msg.author.id].warns += 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
 
 
            setTimeout(function() {
 
                warnsJSON[msg.author.id].warns -= 1
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }, ms('24h'))
 
            var warnEm = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You have been warned in ${msg.guild.name}`)
            .setDescription('You have recieved a warning from the moderation system')
            .addField('Reason' , '[AutoMod] Using filtered words')
            .addField('Expires' , '24h')
 
            try {
                msg.author.send(warnEm)
 
            } catch(err) {
 
            }
 
 
            if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
                var mutedEm = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`**${msg.member.user.username}** has been muted for continuous infractions`)
                msg.channel.send(mutedEm)
 
                const muteRole = msg.guild.roles.cache.find(r => r.name === 'mute')
                const user = msg.member
                user.roles.add(muteRole.id)
 
                var yougotmuted = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${msg.guild.name}`)
                .setDescription('You have been muted after 3 infractions')
                .addField('Reason' , 'Multiple AutoMod Infractions')
                .addField('Expires' , '2h')
 
                try {
 
                    msg.author.send(yougotmuted)
 
                }catch(err) {
 
                }
 
                setTimeout(function () {
                    user.roles.remove(muteRole.id)
                }, ms('2h'));
            
            }
        return;
        }
            
        
        
    
    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;
 
    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
 
    }catch(err) {
        console.warn(err);
    }
 
})
 
client.on('guildMemberAdd' , async(member) => {
 
let warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'));
  warnsJSON[member.id] = {
                warns: 0
            }
            Fs.writeFileSync('./warnInfo.json', JSON.stringify(warnsJSON));
})
 
 
 
 
 
 
    client.on('messageUpdate' , (oldMessage, newMessage) => {
        if(newMessage.content.includes('<@!YOUR USER ID HERE>')) { //YOUR USER ID HERE
            newMessage.delete()
            return newMessage.reply('you cannot ping this user!')
        }
    })
 