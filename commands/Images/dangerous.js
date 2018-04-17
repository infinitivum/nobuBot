const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class DangerousCommand extends Command {
  constructor(main) {
    super(main, {
      name: "dangerous",
      category: "Image Generation",
      help: "This is dangerous stuff",
      args: [
        {
          name: "Text",
          desc: "The text to put in the image"
        }
      ],
      caseSensitive: true
    });

  }
  run(message, args, prefix) {
    if (!args) message.channel.send(`Error: No argument found. Please consult \`${prefix}help dangerous\` for more information.`);
    else {
      snek.get('https://i.imgur.com/7uFWhYn.png').then(r => {
        args = args.join(' ');
        const canvas = new Canvas(483, 366);
        const ctx = canvas.getContext('2d');
        const img_bg = new Canvas.Image();
        img_bg.onload = function () {
          ctx.drawImage(img_bg, 0, 0, 483, 366);
          ctx.font = "bold 25px Arial";

          const x = 170;
          let y = 250;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI/36);
          ctx.fillText(args.trim(), x, y);
          ctx.restore();
          
          message.channel.send("", {file: {attachment:canvas.toBuffer()}});
        };
        img_bg.src = r.body;
      });
    }
  }
}
