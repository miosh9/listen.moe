const { Command } = require("discord-akairo");

class StartStream extends Command {
  constructor() {
    super("start-stream", {
      aliases: ["start", "stream", "join"],
      ownerOnly: true,
      args: [{ id: "channelID" }]
    });
  }

  exec(message, args) {
    let channel = message.member.voiceChannel;
    // console.log(channel);
    if (!channel) {
      return message.reply("Please join the channel before starting stream");
    }
    channel
      .join()
      .then(connection => {
        console.log("connected to " + connection.channel.id);
        // message.util.send("▶ Stream loading")
        connection.playStream("https://listen.moe/opus", { bitrate: 128000 });
        message.util.send("▶ Stream started");
        // message.reply("")
      })
      .catch(console.error);
  }
}

module.exports = StartStream;
