const Discord = require("discord.js");
const { channel } = require("node:diagnostics_channel");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});

const prefix = "j!";

Client.on("ready", () => {
    console.log("bot operationnel");
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;
//j!ping
    if(message.content === prefix + "ping"){
        message.channel.send("Le ping est de \n" + Client.ws.ping + " ms")
    }

});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    //j!help
    if(message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setTitle("Liste des commandes")
            .setAuthor("Author du bot", "https://cdn.discordapp.com/avatars/853010915829481516/603d805b080166f42d19409b99e00d9a.png?size=4096", "https://discord.js.org/")
            .setDescription("Vous y trouvez la liste des commandes du bot")
            .setThumbnail("https://cdn.discordapp.com/avatars/853010915829481516/603d805b080166f42d19409b99e00d9a.png?size=4096")
            .addField("**j!help**", "Affiche la liste des commandes.")
            .addField("**j!ping**", "Pour voir les résultats du ping.")
            .addField("**j!clear**", "Supprime des messages dans un salon particulier.")
            .addField("**j!ban**", "Bannir un membre.")
            .addField("**j!kick**", "Expulser un membre.")
            .addField("**j!mute**", "Réduire au silence un membre.")
            .addField("**j!unmute**", "Retirer la réduction au silence d'un membre.")
        
        message.channel.send({ embeds: [embed]});
    }
});

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "865604979586367488").send(member.displayName + " est arrivé !\nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur")
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre nous a quitté");
    member.guild.channels.cache.find(channel => channel.id === "865604981457420318").send(member.displayName + " nous a quitté :sob:");
});

Client.on("message", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de message non ou mal défini.");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal défini.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + message.size + " message réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }    
    }
});

Client.on("message", message => {
    if(message.author.bot) return;

    if(message.member.permissions.has("ADMINISTRATOR")){
        if (message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(message == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else {
                if(mention.bannable){
                    mention.ban(reason);
                    message.channel.send(mention.displayName + " a été banni avec succès.");
                }
                else {
                    message.reply("Imposible de bannir ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    const reason = args.slice(1).join(' ')
                    mention.kick(reason);
                    message.channel.send(mention.displayName + " a été kick avec succès.");
                }
                else {
                    message.reply("Imposible de expulser ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                mention.roles.add("866026529862582273");
                message.reply(mention.displayName + " à été réduit au silence avec succès.")
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                mention.roles.remove("866026529862582273");
                message.reply(mention.displayName + " à retrouvé sa voix avec succès.")
            }
        }
    }   
});

Client.login("ODUzMDEwOTE1ODI5NDgxNTE2.YMPKUg.igl-Q5pRbFC9ZrUNpKo4-LCNvzg");