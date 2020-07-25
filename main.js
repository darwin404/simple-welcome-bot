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
        	.setTitle(`<a:8584_pin:725798073753927761> **WELCOME** <a:8584_pin:725798073753927761>`)
        	.setAuthor(member.user.tag, member.user.displayAvatarURL({format: "gif", format: "png", dynamic: true}))
        	.setDescription(`${member} Welcome to **VALORANT MAROC** community, Also if you want to be ready for our server, Check out the important channels.`)
        	.setThumbnail(member.user.displayAvatarURL({format: "gif", format: "png", dynamic: true, size: 1024}))
        	.setTimestamp()
        	.setFooter("User ID: " + member.user.id)
        	.setImage('https://i.imgur.com/rEBVonh.gif')
        	.addFields(
        	  { name: "**\`User\`**", value: `${member}`, inline: true },
			  { name: "**\`User Joined At\`**", value: `${moment().format("D/M/Y, h:mm")}`, inline: true },
        	)
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '736600432561881129');
        if(welcomeChannel) {
			welcomeChannel.send(`
			> • **User:** ${member}
			> • **User Joined By:** <@${usedInvite.inviter.id}>
			> • **Number Of Uses:** ${usedInvite.uses}

		≫ ・*If you want to be ready for our server.*
		≫ ・**CHECK OUT**
		♛▬▬▬▬▬▬▬▬▬▬◈▬▬▬▬▬▬▬▬▬▬♛
		<a:6795_rainbowleft:729671060664090634>    <#718272251182710851>
		<a:6795_rainbowleft:729671060664090634>    <#718265652376240169>
		<a:6795_rainbowleft:729671060664090634>    <#718275663530033162>
		♛▬▬▬▬▬▬▬▬▬▬◈▬▬▬▬▬▬▬▬▬▬♛
			`)
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
	function randomStatus() {
	  let status = ["MAROC", "VALORANT", "WELCOME BOT"]
	  let rstatus = Math.floor(Math.random() * status.length);
  
	  client.user.setActivity(status[rstatus], {type: "STREAMING", url: "https://www.twitch.tv/xdarwinx_"});
	}; setInterval(randomStatus, 5000)
	
  });
  

client.login('NzM2MjEwMDg0OTQxNTI5MTky.XxrfEg.IUypv5U3NNwa0gIs-AC71H7kT-w');
