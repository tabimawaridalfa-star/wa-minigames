// ========================================
// 🎯 GAME: TEBAK ANGKA (Guess The Number)
// ========================================

class TebakAngka {
    constructor() {
        this.sessions = new Map(); // groupId -> game session
    }

    startGame(groupId, playerName) {
        if (this.sessions.has(groupId)) {
            return '⚠️ Game Tebak Angka sudah berjalan di grup ini!\nKetik *!tebak [angka]* untuk menebak.';
        }

        const target = Math.floor(Math.random() * 100) + 1;
        this.sessions.set(groupId, {
            target,
            attempts: 0,
            maxAttempts: 10,
            startedBy: playerName,
            startTime: Date.now(),
            guesses: []
        });

        return `🎯 *TEBAK ANGKA* 🎯\n\n` +
            `${playerName} memulai game!\n` +
            `Aku sudah memilih angka antara *1 - 100*\n` +
            `Kalian punya *10 kesempatan* untuk menebak!\n\n` +
            `Ketik: *!tebak [angka]*\n` +
            `Contoh: *!tebak 50*`;
    }

    guess(groupId, playerName, number) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Belum ada game Tebak Angka!\nKetik *!tebakangka* untuk mulai.';
        }

        const num = parseInt(number);
        if (isNaN(num) || num < 1 || num > 100) {
            return '⚠️ Masukkan angka antara 1 - 100!';
        }

        session.attempts++;
        session.guesses.push({ player: playerName, guess: num });

        if (num === session.target) {
            const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
            this.sessions.delete(groupId);
            return `🎉🎉🎉 *BENAR!* 🎉🎉🎉\n\n` +
                `${playerName} berhasil menebak angka *${num}*!\n` +
                `Percobaan ke-${session.attempts}\n` +
                `⏱️ Waktu: ${elapsed} detik\n\n` +
                `🏆 Selamat ${playerName}! Kamu juaranya! 🏆`;
        }

        if (session.attempts >= session.maxAttempts) {
            const answer = session.target;
            this.sessions.delete(groupId);
            return `💀 *GAME OVER!* 💀\n\n` +
                `Kesempatan habis! Jawabannya adalah *${answer}*\n` +
                `Ketik *!tebakangka* untuk main lagi!`;
        }

        const hint = num < session.target ? '⬆️ Lebih TINGGI!' : '⬇️ Lebih RENDAH!';
        const remaining = session.maxAttempts - session.attempts;
        
        let proximity = '';
        const diff = Math.abs(num - session.target);
        if (diff <= 5) proximity = '🔥 PANAS BANGET!';
        else if (diff <= 15) proximity = '♨️ Hangat...';
        else if (diff <= 30) proximity = '❄️ Dingin...';
        else proximity = '🧊 Beku!';

        return `${hint} ${proximity}\n` +
            `Tebakan ${playerName}: *${num}*\n` +
            `Sisa kesempatan: *${remaining}*`;
    }

    endGame(groupId) {
        if (this.sessions.has(groupId)) {
            const session = this.sessions.get(groupId);
            this.sessions.delete(groupId);
            return `🛑 Game Tebak Angka dihentikan!\nJawabannya adalah *${session.target}*`;
        }
        return '❌ Tidak ada game Tebak Angka yang berjalan.';
    }
}

module.exports = TebakAngka;
