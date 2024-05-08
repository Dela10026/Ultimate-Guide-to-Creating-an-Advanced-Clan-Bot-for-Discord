const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "ping",
  aliases: ["latancy"],
  edesc:"ping",
  description: `get ping of bot`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 5,



  run: async (client, message, args, prefix) => {
    // Code

    message.delete()

    let emb = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(":ping_pong:    Pong!  ")

      .addFields(
        {
          name: "💠 API Latency:",
          value: `╰-𒆕 ${Math.round(client.ws.ping)}ms`,
        }
      )


      .setThumbnail("https://cdn.discordapp.com/emojis/1218489412032397312.webp?size=128&quality=lossless")

      .setFooter(client.getFooter(message.author));


    message.channel.send({ embeds: [emb] })
  },
};


