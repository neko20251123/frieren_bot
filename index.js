const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const GREET_CHANNEL_ID = (process.env.GREET_CHANNEL_ID ?? "").trim();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // ← これ必須
  ],
});

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 🌿 フリーレン挨拶集（ヒンメル・ハイター・アイゼン混合）
const GREETINGS = [
  "おはよう。…急がなくていいよ。時間はたくさんあるから。",
  "来たんだ。じゃあ、少しだけ一緒にいよう。",
  "挨拶は大事。ヒンメルがそう言ってた。",
  "おかえり。…別に待ってたわけじゃないけど。",
  "こんにちは。静かでいいね。落ち着く。",
  "君、元気そう。なら大丈夫。",
  "遅くてもいいよ。人間はそういうものだって、知ってる。",
  "はじめまして。…じゃない気もする。不思議だね。",
  "無理しないで。疲れは顔に出る。",
  "ようこそ。まずは深呼吸。焦る必要はないよ。",

  "困ってる人がいたら、助けよう。ヒンメルならそうした。",
  "見栄でもいい。優しさは、結果として残るってヒンメルが言ってた。",
  "今日はちゃんと笑って。ヒンメルが喜ぶ。",

  "ハイター、また人間が増えたよ。",
  "ハイターなら、きっと歓迎するんだろうね。",
  "ねえハイター、今日もちゃんと挨拶したよ。",
  "ハイター、私、少しは優しくなれてるかな。",
  "ハイターなら、きっとこういう時間を大切にする。",
  "ほら見て、ハイター。ちゃんと来てくれたよ。",
  "ハイター、あなたの言う通りだったみたい。",
  "また一人来たよ。ハイター、賑やかになるね。",
  "ハイター、私、ちゃんと見守れてる？",
  "ねえハイター、あなたなら何て言う？",

  "アイゼンなら、黙って頷くだけだろうね。",
  "強さは続けた者に宿る。アイゼンがそうだった。",
  "アイゼン、今日もちゃんと見てる？",
  "無理をするなって、アイゼンはいつも言ってた。",
  "静かな人だね。アイゼンみたい。",
  "壊れそうなら休め。アイゼンならそう言う。",
  "焦っても強くはなれない。アイゼンが証明してた。",
  "…うん、大丈夫。アイゼンなら認めると思う。",
  "強くなりたい？ それなら、続けること。",
  "アイゼンは多くを語らなかった。でも、背中は大きかった。",
];

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`💬 GREET_CHANNEL_ID: ${GREET_CHANNEL_ID}`);

  if (!GREET_CHANNEL_ID) {
    console.log("❌ GREET_CHANNEL_ID が未設定");
  }
});

// 🎉 新規参加時
client.on("guildMemberAdd", async (member) => {
  try {
    if (!GREET_CHANNEL_ID) return;

    const channel = await client.channels.fetch(GREET_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) return;

    const line = pick(GREETINGS);

    await channel.send(
      `🌿 <@${member.id}>（${member.displayName}） ${line}`
    );

  } catch (e) {
    console.error("guildMemberAdd error:", e);
  }
});

client.login(process.env.DISCORD_TOKEN);