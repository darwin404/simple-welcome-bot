const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const guildInvites = new Map();




client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});

client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
		const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
		
        const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
        	.setTitle(`**WELCOME**`)
        	.setAuthor(member.user.tag, member.user.displayAvatarURL({format: "gif", format: "png", dynamic: true}))
        	.setDescription(`${member} if you want to be ready for our server, Check out the important channels.`)
        	.setThumbnail(member.user.displayAvatarURL({format: "gif", format: "png", dynamic: true, size: 1024}))
        	.setTimestamp()
        	.setFooter("User ID: " + member.user.id)
        	.setImage('https://i.imgur.com/QDCNuem.gif')
        	.addFields(
        	  { name: "**\`User\`**", value: `${member}`, inline: true },
			  { name: "**\`User Joined At\`**", value: `${moment().format("D/M/Y, h:mm")}`, inline: true },
        	)
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === 'welcome channel id');
        if(welcomeChannel) {
			welcomeChannel.send(`
			> • **User:** ${member}
			> • **User Joined By:** <@${usedInvite.inviter.id}>
			> • **You Are The Member:** ${message.guild.memberCount}`)
			welcomeChannel.send(embed).catch(err => console.log(err));
			member.send(`
  ♛▬▬▬▬▬▬▬▬▬▬◈▬▬▬▬▬▬▬▬▬▬♛
  > • *User:* ${member}
  > • *You Joined By:* <@${usedInvite.inviter.id}>

  ≫ ・*Welcome To* **VALORANT** *Maroc Community.*
  ≫ ・*If you want to be ready for our server, check out the important channels.*
  ♛▬▬▬▬▬▬▬▬▬▬◈▬▬▬▬▬▬▬▬▬▬♛`)
        }
    }
    catch(err) {
        console.log(err);
    }
});

//status
client.on("ready", () => {
	  let status = ["Welcome Bot By DARWIN"  
	  client.user.setActivity(status, {type: "STREAMING", url: "https://www.twitch.tv/xdarwinx_"});	
  });
  

client.login('YOUR_TOP_SECRET_TOKEN');
