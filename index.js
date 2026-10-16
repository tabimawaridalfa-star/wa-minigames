// ========================================
// 🎮 WA MINI GAMES BOT
// WhatsApp Group Mini Games Bot
// ========================================

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Import Game Modules
const TebakAngka = require('./games/tebakAngka');
const Suit = require('./games/suit');
const Kuis = require('./games/kuis');
const TebakKata = require('./games/tebakKata');
const MathChallenge = require('./games/mathChallenge');

// Initialize Games
const tebakAngka = new TebakAngka();
const suit = new Suit();
const kuis = new Kuis();
const tebakKata = new TebakKata();
const mathChallenge = new MathChallenge();

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// ========== QR CODE ==========
client.on('qr', (qr) => {
    console.log('\n📱 Scan QR Code ini dengan WhatsApp kamu:\n');
    qrcode.generate(qr, { small: true });
    console.log('\nBuka WhatsApp > Menu > Linked Devices > Link a Device\n');
});

// ========== READY ==========
client.on('ready', () => {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║   🎮 WA MINI GAMES BOT - ONLINE! 🎮  ║');
    console.log('╠═══════════════════════════════════════╣');
    console.log('║  Bot siap digunakan di grup WhatsApp  ║');
    console.log('║  Ketik !menu di grup untuk memulai    ║');
    console.log('╚═══════════════════════════════════════╝');
});

// ========== ERROR HANDLING ==========
client.on('auth_failure', (msg) => {
    console.error('❌ Autentikasi gagal:', msg);
});

client.on('disconnected', (reason) => {
    console.log('🔌 Bot terputus:', reason);
    client.initialize();
});

// ========== MENU ==========
function getMenu() {
    return `🎮 *WA MINI GAMES BOT* 🎮
━━━━━━━━━━━━━━━━━━━━━━━━

📋 *DAFTAR GAME:*

🎯 *Tebak Angka*
   └ !tebakangka - Mulai game
   └ !tebak [angka] - Tebak
   └ !stoptebak - Hentikan

✂️ *Suit (Batu Gunting Kertas)*
   └ !suit - Buat tantangan
   └ !lawan - Terima tantangan
   └ !pilih [batu/gunting/kertas]
   └ !stopsuit - Hentikan

🧠 *Kuis Trivia*
   └ !kuis - Mulai kuis
   └ !jawab [A/B/C/D] - Jawab
   └ !stopkuis - Hentikan

📝 *Tebak Kata (Hangman)*
   └ !tebakkata - Mulai game
   └ !huruf [huruf] - Tebak huruf
   └ !kata [kata] - Tebak kata
   └ !stopkata - Hentikan

➕ *Math Challenge*
   └ !math - Mulai game
   └ !hitung [jawaban] - Jawab
   └ !stopmath - Hentikan

━━━━━━━━━━━━━━━━━━━━━━━━
💡 Ketik *!menu* kapan saja
🤖 Made with ❤️ for WA Groups`;
}

// ========== MESSAGE HANDLER ==========
client.on('message_create', async (msg) => {
    try {
        const body = (msg.body || '').trim();

        // Skip if not a command
        if (!body.startsWith('!')) return;

        // When sending from own account (fromMe), msg.to is the group/chat. When from others, msg.from is the group/chat.
        const targetChatId = msg.fromMe ? msg.to : msg.from;
        const playerId = msg.author || msg.from;
        const playerName = msg._data?.notifyName || msg._data?.pushname || (msg.fromMe ? 'Admin' : 'Pemain');

        console.log(`📩 Perintah diterima: "${body}" dari ${playerName} di chat ${targetChatId}`);

        const args = body.split(' ');
        const command = args[0].toLowerCase();
        const param = args.slice(1).join(' ');

        let response = '';

        switch (command) {
            // ===== MENU =====
            case '!menu':
            case '!help':
            case '!game':
            case '!games':
                response = getMenu();
                break;

            // ===== TEBAK ANGKA =====
            case '!tebakangka':
                response = tebakAngka.startGame(targetChatId, playerName);
                break;
            case '!tebak':
                if (!param) {
                    response = '⚠️ Masukkan angka! Contoh: *!tebak 50*';
                } else {
                    response = tebakAngka.guess(targetChatId, playerName, param);
                }
                break;
            case '!stoptebak':
                response = tebakAngka.endGame(targetChatId);
                break;

            // ===== SUIT =====
            case '!suit':
                response = suit.startGame(targetChatId, playerName, playerId);
                break;
            case '!lawan':
                response = suit.acceptChallenge(targetChatId, playerName, playerId);
                break;
            case '!pilih':
                if (!param) {
                    response = '⚠️ Pilih: *!pilih batu* / *!pilih gunting* / *!pilih kertas*';
                } else {
                    response = suit.makeChoice(targetChatId, playerId, playerName, param);
                }
                break;
            case '!stopsuit':
                response = suit.endGame(targetChatId);
                break;

            // ===== KUIS =====
            case '!kuis':
            case '!trivia':
                response = kuis.startGame(targetChatId, playerName);
                break;
            case '!jawab':
                if (!param) {
                    response = '⚠️ Jawab dengan: *!jawab A* / *!jawab B* / *!jawab C* / *!jawab D*';
                } else {
                    response = kuis.answer(targetChatId, playerName, param);
                }
                break;
            case '!stopkuis':
                response = kuis.endGame(targetChatId);
                break;

            // ===== TEBAK KATA =====
            case '!tebakkata':
            case '!hangman':
                response = tebakKata.startGame(targetChatId, playerName);
                break;
            case '!huruf':
                if (!param) {
                    response = '⚠️ Masukkan huruf! Contoh: *!huruf A*';
                } else {
                    response = tebakKata.guessLetter(targetChatId, playerName, param);
                }
                break;
            case '!kata':
                if (!param) {
                    response = '⚠️ Masukkan kata! Contoh: *!kata KOMPUTER*';
                } else {
                    response = tebakKata.guessWord(targetChatId, playerName, param);
                }
                break;
            case '!stopkata':
                response = tebakKata.endGame(targetChatId);
                break;

            // ===== MATH CHALLENGE =====
            case '!math':
            case '!matematika':
                response = mathChallenge.startGame(targetChatId, playerName);
                break;
            case '!hitung':
                if (!param && param !== '0') {
                    response = '⚠️ Masukkan jawaban! Contoh: *!hitung 42*';
                } else {
                    response = mathChallenge.answer(targetChatId, playerName, param);
                }
                break;
            case '!stopmath':
                response = mathChallenge.endGame(targetChatId);
                break;

            default:
                break;
        }

        // Send response
        if (response) {
            console.log(`📤 Mengirim balasan ke ${targetChatId}...`);
            await client.sendMessage(targetChatId, response);
            console.log(`✅ Berhasil terkirim!`);
        }

    } catch (error) {
        console.error('❌ Error handling message:', error);
    }
});

// ========== START BOT ==========
console.log('🚀 Memulai WA Mini Games Bot...');
console.log('⏳ Mohon tunggu, sedang memuat...\n');
client.initialize();

