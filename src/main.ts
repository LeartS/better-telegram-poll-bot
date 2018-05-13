import * as dotenv from 'dotenv'
import * as r from 'rethinkdb'
import * as TelegramBot from 'node-telegram-bot-api'

dotenv.config()

const botOptions = {
    webHook: true,
}

const bot = new TelegramBot(process.env.BOT_TOKEN, botOptions)
// At the moment node-telegram-bot-api required the bot token to be parth
// of the webhook URL or it will reply with 401 Unauhtorized
// Note: this isn't a telegram requirement, they only suggest to
// use *any* secret path
bot.setWebHook(`${process.env.BOT_WEBHOOK_ORIGIN}/${process.env.BOT_TOKEN}`)
bot.getWebHookInfo().then((i) => console.log(i))
bot.on('inline_query', async ({id, from, query, offset}) => {
    if (!query) {
        await bot.answerInlineQuery(id, [], {
            is_personal: true,
            switch_pm_text: 'Create a new poll',
            switch_pm_parameter: 'create-new',
        })
        return
    }
    bot.answerInlineQuery(
        id, [
            {
                type: 'article',
                id: 'lol2',
                title: 'Il tuo poll che aveiv creato prima',
                input_message_content: {message_text: 'Ciao!'}
            } as TelegramBot.InlineQueryResultArticle,
            {
                type: 'article',
                id: 'lol',
                title: 'Altro poll',
                input_message_content: {message_text: 'Ciao!'}
            } as TelegramBot.InlineQueryResultArticle,
        ], {
            is_personal: true
        }
    )
})