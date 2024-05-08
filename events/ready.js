const client = require("../index");
const Discord = require(`discord.js`);
const chalk = require('chalk');
const simplydjs = require("simply-djs");

let statuses = [
                ",help | @The Extremez Coder™ ",
                ]
let e = statuses.length

function status()
  {
i = Math.floor(Math.random() * (e))
client.user.setActivity(statuses[i]
  ,
  {
    type: "STREAMING",url:"https://www.youtube.com/watch?v=s4e2qZPIrIs"
  });
    
  }


client.on("ready", async () => {

simplydjs.connect(process.env.MONGO)

setInterval(status,3000)

console.clear()
console.log(chalk.bgBlack(chalk.greenBright(`═════════════════════════════════════════════`)));
console.log(chalk.magenta(`
The Extremez Coder™ | The Extremez Coder™ Forever
`))
    console.log(chalk.bgBlack(chalk.magentaBright(`═════════════════════════════════════════════`)));
    console.log(chalk.yellowBright("The Extremez Coder™ | Online And Fully Functional"))
    console.log(chalk.bgBlack(chalk.yellowBright(`═════════════════════════════════════════════`)))

    console.log(chalk.cyanBright(`The Extremez Coder™ | Node: ${process.version}
The Extremez Coder™ | Discord.js: ${Discord.version}
The Extremez Coder™ | Connected as: ${client.user.username}
The Extremez Coder™ | ID: ${client.user.id}
The Extremez Coder™ | Owner: ⍟ ・🜲 The Extremez Coder™`));
    console.log(chalk.bgBlack(chalk.cyanBright(`═════════════════════════════════════════════`)))
    console.log(chalk.red(`The Extremez Coder™ | Currently watching ${client.guilds.cache.size} Servers`));
    console.log(chalk.bgBlack(chalk.red(`═════════════════════════════════════════════`)));
    })


  

  
  // loading database
  require('../handlers/Database')(client)

  client.guilds.cache.forEach(async (guild) => {
    await client.updateembed(client, guild)
  })
