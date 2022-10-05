import { Telegraf } from "telegraf"
import dotenv from "dotenv"
import { selectAll, update, remove, recount } from "./utilities/db"

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN!)

function startBot(): void {
  void bot.launch()
}

bot.command("start", async(ctx) => {
  void ctx.reply("I'm online")
})

bot.command("echo", async(ctx) => {
  const message = ctx.message.text.split(" ")
  message.shift()
  void ctx.reply(message.join(" "))
})

bot.command("add", async(ctx) => {
  const message = ctx.message.text.split(" ")
  message.shift()
  try {
    if (message[1]) {
      void update(message[0].toLowerCase(), Math.abs(Number(message[1])))
    } else {
      void update(message[0].toLowerCase(), 1)
    }
  } catch (err) {
    void ctx.reply(`error: ${err}`)
  }
})

bot.command("delete", async(ctx) => {
  const message = ctx.message.text.split(" ")
  message.shift()
  try {
    if (message[1]) {
      void update(message[0].toLowerCase(), -1 * Math.abs(Number(message[1])))
    } else {
      void update(message[0].toLowerCase(), -1)
    }
  } catch (err) {
    void ctx.reply(`error: ${err}`)
  }
})

bot.command("remove", async(ctx) => {
  const message = ctx.message.text.split(" ")
  message.shift()
  try {
    void remove(message[0].toLowerCase())
  } catch (err) {
    void ctx.reply(`error: ${err}`)
  }
})

bot.command("inventory", async(ctx) => {
  const message = ctx.message.text.split(" ")
  message.shift()
  try {
    const inventory = await selectAll()
    for (let i = 0; i < inventory.length; i++) {
      const data = String(Object.values(inventory[i])[0]).slice(1, -1).split(",").join(": ")
      void ctx.reply(data)
    }
  } catch (err) {
    void ctx.reply(`error: ${err}`)
  }
})

bot.command("recount", async(ctx) => {
  const message = ctx.message.text.split(" ")
  message.shift()
  try {
    void recount(message[0].toLowerCase(), Math.abs(Number(message[1])))
  } catch (err) {
    void ctx.reply(`error: ${err}`)
  }
})

startBot()