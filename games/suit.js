// ========================================
// ✂️ GAME: SUIT (Rock Paper Scissors)
// ========================================

class Suit {
    constructor() {
        this.sessions = new Map(); // groupId -> game session
        this.choices = {
            'batu': '🪨',
            'gunting': '✂️',
            'kertas': '📄'
        };
        this.winMap = {
            'batu': 'gunting',
            'gunting': 'kertas',
            'kertas': 'batu'
        };
    }

    startGame(groupId, playerName, playerId) {
        if (this.sessions.has(groupId)) {
            return '⚠️ Game Suit sudah berjalan!\nTantangan belum selesai.';
        }

        this.sessions.set(groupId, {
            challenger: { name: playerName, id: playerId, choice: null },
            opponent: null,
            startTime: Date.now()
        });

        return `✂️🪨📄 *SUIT CHALLENGE!* ✂️🪨📄\n\n` +
            `${playerName} menantang siapa pun!\n\n` +
            `Mau lawan? Ketik: *!lawan*\n` +
            `Lalu pilih: *!pilih batu/gunting/kertas*`;
    }

    acceptChallenge(groupId, playerName, playerId) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Tidak ada tantangan Suit!\nKetik *!suit* untuk membuat tantangan.';
        }

        if (session.opponent) {
            return '⚠️ Sudah ada lawan! Tunggu game selesai.';
        }

        if (session.challenger.id === playerId) {
            return '😂 Gak bisa lawan diri sendiri dong!';
        }

        session.opponent = { name: playerName, id: playerId, choice: null };

        return `⚔️ ${playerName} menerima tantangan ${session.challenger.name}!\n\n` +
            `Kedua pemain silahkan pilih (DM/chat pribadi bot juga bisa):\n` +
            `Ketik: *!pilih batu* / *!pilih gunting* / *!pilih kertas*`;
    }

    makeChoice(groupId, playerId, playerName, choice) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Tidak ada game Suit yang berjalan!';
        }

        if (!session.opponent) {
            return '⚠️ Belum ada lawan! Tunggu seseorang ketik *!lawan*';
        }

        const normalizedChoice = choice.toLowerCase();
        if (!this.choices[normalizedChoice]) {
            return '⚠️ Pilihan tidak valid! Pilih: *batu*, *gunting*, atau *kertas*';
        }

        // Determine which player
        let player = null;
        if (session.challenger.id === playerId) {
            player = session.challenger;
        } else if (session.opponent.id === playerId) {
            player = session.opponent;
        } else {
            return '⚠️ Kamu bukan pemain dalam game ini!';
        }

        if (player.choice) {
            return '⚠️ Kamu sudah memilih! Tunggu lawan memilih.';
        }

        player.choice = normalizedChoice;

        // Check if both have chosen
        if (session.challenger.choice && session.opponent.choice) {
            return this._resolveGame(groupId);
        }

        return `✅ ${playerName} sudah memilih! Menunggu lawan... 🕐`;
    }

    _resolveGame(groupId) {
        const session = this.sessions.get(groupId);
        const c = session.challenger;
        const o = session.opponent;

        this.sessions.delete(groupId);

        let result = '';
        if (c.choice === o.choice) {
            result = `🤝 *SERI!* 🤝`;
        } else if (this.winMap[c.choice] === o.choice) {
            result = `🏆 *${c.name} MENANG!* 🏆`;
        } else {
            result = `🏆 *${o.name} MENANG!* 🏆`;
        }

        return `✂️🪨📄 *HASIL SUIT* ✂️🪨📄\n\n` +
            `${c.name}: ${this.choices[c.choice]} ${c.choice.toUpperCase()}\n` +
            `${o.name}: ${this.choices[o.choice]} ${o.choice.toUpperCase()}\n\n` +
            `${result}\n\n` +
            `Ketik *!suit* untuk main lagi!`;
    }

    endGame(groupId) {
        if (this.sessions.has(groupId)) {
            this.sessions.delete(groupId);
            return '🛑 Game Suit dihentikan!';
        }
        return '❌ Tidak ada game Suit yang berjalan.';
    }
}

module.exports = Suit;
