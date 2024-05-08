const { MessageEmbed } = require(`discord.js`);
const db = require("quick.db")

module.exports = {
  name: "lremove",
  aliases: [],
  edesc:"lremove",
  description: `check level of an user`,
  userPermissions: ["MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_SERVER"],
  botPermissions: ["MANAGE_CHANNELS", "MANAGE_ROLES"],
  category: "Level",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    //code

    message.delete()

  let ch = db.get(`levelCh_${message.guild.id}`)
  let status = db.get(`levelStatus_${message.guild.id}`)
  let channel = client.channels.cache.get(ch);
    

    if(status == "active")
    {
      if(channel)
      {
        channel.delete()

        db.set(`levelStatus_${message.guild.id}`, "inactive")
    
        let emb = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("✅ Operation Successful !  ")
            .addFields(
              {
                name: "➡️ Requested By :",
                value: `ㅤㅤ╰-𒆕 ${message.member.user}`
              },
              {
                name: "➡️ Level log system Successfully deleted",
                value: `ㅤㅤ╰-𒆕 Channel : ${ch}  `
              })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()

          message.channel.send({ embeds: [emb] })
      }
      else{

        db.set(`levelStatus_${message.guild.id}`, "inactive")
    
        let emb = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("✅ Operation Successful !  ")
            .addFields(
              {
                name: "➡️ Requested By :",
                value: `ㅤㅤ╰-𒆕 ${message.member.user}`
              },
              {
                name: "➡️ Level log system Successfully deleted",
                value: `ㅤㅤ╰-𒆕 Channel : N/A (Pre-deleted)  `
              })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()

          message.channel.send({ embeds: [emb] })
      } 
    }else{
    
        let emb = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("✅ Operation Unsuccessful !  ")
            .addFields(
              {
                name: "➡️ Requested By :",
                value: `ㅤㅤ╰-𒆕 ${message.member.user}`
              },
              {
                name: "➡️ Level log system cannot be deleted",
                value: `ㅤㅤ╰-𒆕 Reason : System is not set up in this guild `
              })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()

          message.channel.send({ embeds: [emb] })      
    }

    
  }
}