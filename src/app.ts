import { Telegraf } from "telegraf"
import dotenv from "dotenv"
import Debug from "debug"
import { selectAll, update, remove, recount } from "./utilities/db"

const debug = Debug("app")
Debug.enable("*")

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN!)

function startBot(): void {
  debug("bot started")
  void bot.launch()
}

bot.command("start", async(ctx) => {
  void ctx.reply("I'm online")
})

bot.command("add", async(ctx) => {
  if (String(ctx.message.chat.id) !== process.env.CHAT_ID) {
    return
  } else {
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
  }
})

bot.command("delete", async(ctx) => {
  if (String(ctx.message.chat.id) !== process.env.CHAT_ID) {
    return
  } else {
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
  }
})

bot.command("remove", async(ctx) => {
  if (String(ctx.message.chat.id) !== process.env.CHAT_ID) {
    return
  } else {
    const message = ctx.message.text.split(" ")
    message.shift()
    try {
      void remove(message[0].toLowerCase())
    } catch (err) {
      void ctx.reply(`error: ${err}`)
    }
  }
})

bot.command("inventory", async(ctx) => {
  if (String(ctx.message.chat.id) !== process.env.CHAT_ID) {
    return
  } else {
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
  }
})

bot.command("recount", async(ctx) => {
  if (String(ctx.message.chat.id) !== process.env.CHAT_ID) {
    return
  } else {
    const message = ctx.message.text.split(" ")
    message.shift()
    try {
      void recount(message[0].toLowerCase(), Math.abs(Number(message[1])))
    } catch (err) {
      void ctx.reply(`error: ${err}`)
    }
  }
})

startBot()