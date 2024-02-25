const TelegramBot = require("node-telegram-bot-api");

const token = "6846604797:AAG0W1r_3mQUxlIxiKiMcXfd-EEUUGyRs6Q";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    {
        command: "/start",
        description: "start bot",
    },
    {
        command: "/game",
        description: "start game",
    },
]);

const btnGroup = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "1",
                    callback_data: "1",
                },
                {
                    text: "2",
                    callback_data: "2",
                },
                {
                    text: "3",
                    callback_data: "3",
                },
            ],
            [
                {
                    text: "4",
                    callback_data: "4",
                },
                {
                    text: "5",
                    callback_data: "5",
                },
                {
                    text: "6",
                    callback_data: "6",
                },
            ],
            [
                {
                    text: "7",
                    callback_data: "7",
                },
                {
                    text: "8",
                    callback_data: "8",
                },
                {
                    text: "9",
                    callback_data: "9",
                },
            ],
            [
                {
                    text: "0",
                    callback_data: "0",
                },
            ],
        ],
    },
};

const optionBtnGroup = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "RESSET",
                    callback_data: "/again",
                },
            ],
        ],
    },
};

const startGame = async (chatId) => {
    await bot.sendMessage(
        chatId,
        `do you want to play Game which is find a number: `,
        btnGroup
    );
};

const data = ["sergili", "yunusobod  - chilonzor", "humo - paxtakor"];

const bordCost = () => {
    bot.on("message", async (msg) => {
        const textChat = msg.text;
        const chatId = msg.chat.id;

        if (textChat === "/game") {
            return startGame(chatId);
        }

        if (textChat === "/start") {
            return bot.sendMessage(chatId, "Received your message");
        } else {
            return bot.sendMessage(chatId, "error eyy");
        }
    });

    bot.on("callback_query", async (msg) => {
        const clickedBtn = msg.data;
        const chatId = msg.message.chat.id;

        const date = msg.message.date;

        const obj = {};
        const randomNumber = Math.floor(Math.random() * 10);
        obj[chatId] = randomNumber;
        console.log(obj[chatId]);
        console.log(clickedBtn);

        if (clickedBtn === "/again") {
            return startGame(chatId);
        }

        if (clickedBtn == obj[chatId]) {
            await bot.sendMessage(
                chatId,
                ` ^^^ YOU WIN ^^^
                Computer chose this number is : ${obj[chatId]}
                your chose is : ${clickedBtn}
                `
            );

            await bot.sendSticker(
                chatId,
                "https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/5d/4c/2c/5d4c2c6b-955e-5279-a124-cf981688f1af/pr_source.jpg/434x0w.webp",
                optionBtnGroup
            );
        } else {
            await bot.sendMessage(
                chatId,
                `            *** YOU LOSE ***
                Computer chose this number is : ${obj[chatId]}
                your chose is : ${clickedBtn}`
            );
            await bot.sendSticker(
                chatId,
                "https://chpic.su/_data/stickers/s/SOUNANDESUKADIGE44/SOUNANDESUKADIGE44_006.webp"
            );

            await bot.sendMessage(
                chatId,
                "what happen Don't worry, Lest's one more time",
                optionBtnGroup
            );
        }
    });
};

bordCost();
