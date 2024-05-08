const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmds", "commands"],
  edesc:"help",
  description: `need help ? see my all commands`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 5,


  run: async (client, message, args, prefix) => {
    // Code

    message.delete({ timeout: 1000 })

    const emoji = {
      Channel: "#️⃣",
      Fun: "💫",
      Games: "🎮",
      Information: "ℹ️",
      Level: "📊",
      Moderation: "⛑️",
      Music: "🎵",
      Settings: "⚙️",
      Utility: "🌙",
    };

    const desc = {
      Channel:"View commands related to channels",
      Fun:"View commands that are fun related",
      Games:"View commands that can be used to play games",
      Information:"View commands to get info about bot",
      Level:"View commands that can be used for level system",
      Moderation:"View commands that can be used for moderation",
      Music:"View music related commands",
      Settings:"View setup and settings related commands",
      Utility:"View utility related commands",
    };



    let raw = new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder(`Skylight Help Menu . . .`)
        .addOptions([
          {
            label: `Home`,
            value: "home",
            emoji: `🏠`,
            description: `Click to go to Homepage`,
          },
          client.mcategories.map((cat) => {
            return {
              label: `${cat.toLocaleUpperCase()}`,
              value: cat,
              emoji: emoji[cat],
              description: desc[cat],
            };
          }),
        ]),
    ]);

    let help_embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({
        name: client.user.username + ` Help Menu`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setFooter("This Command Will Be Deactivated After 60sec.")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("** • Prefix for this server is `.`\n• Total commands: 78\n• [Invite](https://discord.com/api/oauth2/authorize?client_id=1224715897613324400&permissions=8&scope=applications.commands%20bot) | [Join](https://discord.gg/The Extremez Coder)\n > 💿 __My Categories__ :\n\n >>>   🏠  Home\n#️⃣  Channel\n💫 Fun\n🎮   Games\nℹ️   Information\n📊    Level\n⛑️  Moderation\n🎵  Music\n⚙️  Settings\n🌙  Utility**")
      .addField("💫 **__STATS:__**",
        `>>> 🏓 on **${client.guilds.cache.size} Servers**\n🏓  **\`${Math.floor(client.ws.ping)}ms\` Ping**`)
    .setImage("https://media.discordapp.net/attachments/1162795987014787162/1205424655679234088/gg.png?ex=66222631&is=660fb131&hm=dd3fee2fd55042fafe497d974714c23e53d0c09b49ed0913f673d8209c028b0d&=&format=webp&quality=lossless&width=618&height=174")
      

    let main_msg = await message.channel.send({
      embeds: [help_embed],
      components: [raw],
    });

    let filter = (i) => i.user.id === message.author.id;
    let colector = await main_msg.createMessageComponentCollector({
      filter: filter,
      time: 60000,
    });
    colector.on("collect", async (i) => {
      if (i.isSelectMenu()) {
        await i.deferUpdate().catch((e) => { });
        if (i.customId === "help-menu") {
          let [directory] = i.values;
          if (directory == "home") {
            main_msg.edit({ embeds: [help_embed] }).catch((e) => { });
          } else {
            main_msg
              .edit({
                embeds: [
                  new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(
                      `${emoji[directory]} ${directory} Commands ${emoji[directory]}`
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setDescription(
                      `>>> ${client.mcommands
                        .filter((cmd) => cmd.category === directory)
                        .map((cmd) => {
                          return `💠 ** ${cmd.name}** → ${cmd.description} \n`;
                        })
                        .join("")}`
                    )
                  .setFooter(client.getFooter(message.author)),
                ],
              })
              .catch((e) => null);
          }
        }
      }
    });

    colector.on("end", async (c, i) => {
      raw.components.forEach((c) => c.setDisabled(true));
      main_msg.edit({ components: [raw] }).catch((e) => { }).then(msg => {
        setTimeout(() => msg.delete(), 1000)
      })
    });
  },
};
