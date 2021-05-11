const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json') 
const fivem = require('discord-fivem-api')
const server = new fivem.DiscordFivemApi("145.239.150.71:30120")


exports.run = async (client, message, args) => {
    var prefix = ayarlar.prefix;

server.getPlayers().then((data) => {
let result = []
let index = 1;
var trys = ""
for(let player of data) {
     trys = `${trys} | ${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping \n`

}

  
const arr = trys.match(/.{1,2048}/g);

server.getMaxPlayers().then((res) => {
  var chunks = [];

  for (var i = 0, charsLength = trys.length; i < charsLength; i += 2048) {
      chunks.push(trys.substring(i, i + 2048));
  }
 for(let chunck of chunks ) {
    let em = new Discord.MessageEmbed()
     .setColor("YELLOW")
    .setDescription(chunck)
    message.channel.send(em)
 }
    
const embed = new Discord.MessageEmbed()

.setColor("YELLOW")
.setAuthor("Sunucu Açık.")
.setTitle(`Players (${data.length}/ ${res})`)
.setDescription(data.length > 0 ? result : "Sunucuda Aktif oyuncu bulunmamakta.")
.setTimestamp()
message.channel.send(embed)
}).catch((err) => {
    console.log(err)
const ErrorEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setAuthor("!Sunucu Kapalı!")
.setTimestamp()
message.channel.send(ErrorEmbed)

})


})

  
}
    


  exports.conf = {
    aliases: ['s', 'serverinfo', 'infoserver','fivem'], 
    permLevel: 0, 
    kategori: "Genel" 

  };

  exports.help = {
    name: 'fivem',  
    description: 'Komutlar hakkında bilgi verir.', 
    usage: 'yardım', 
  };