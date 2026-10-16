// ========================================
// 📝 GAME: TEBAK KATA (Hangman)
// ========================================

class TebakKata {
    constructor() {
        this.sessions = new Map();
        this.words = [
            { word: 'JAVASCRIPT', hint: 'Bahasa pemrograman web' },
            { word: 'INDONESIA', hint: 'Negara kepulauan terbesar' },
            { word: 'KUCING', hint: 'Hewan peliharaan yang suka tidur' },
            { word: 'SEPAKBOLA', hint: 'Olahraga paling populer di dunia' },
            { word: 'UNIVERSITAS', hint: 'Tempat kuliah' },
            { word: 'MANGGA', hint: 'Buah tropis yang manis' },
            { word: 'GITAR', hint: 'Alat musik berdawai' },
            { word: 'KOMPUTER', hint: 'Mesin pengolah data' },
            { word: 'PANCASILA', hint: 'Dasar negara Indonesia' },
            { word: 'WHATSAPP', hint: 'Aplikasi chat yang kamu pakai sekarang' },
            { word: 'HANDPHONE', hint: 'Benda yang selalu kamu pegang' },
            { word: 'AYAM GORENG', hint: 'Makanan favorit banyak orang' },
            { word: 'MATEMATIKA', hint: 'Pelajaran dengan banyak rumus' },
            { word: 'BANDUNG', hint: 'Kota kembang di Jawa Barat' },
            { word: 'GOJEK', hint: 'Aplikasi ojek online Indonesia' },
        ];
    }

    startGame(groupId, playerName) {
        if (this.sessions.has(groupId)) {
            return '⚠️ Game Tebak Kata sudah berjalan!';
        }

        const wordData = this.words[Math.floor(Math.random() * this.words.length)];
        const word = wordData.word.toUpperCase();
        const display = word.split('').map(c => c === ' ' ? '  ' : '_ ').join('');

        this.sessions.set(groupId, {
            word: word,
            hint: wordData.hint,
            guessedLetters: new Set(),
            wrongGuesses: 0,
            maxWrong: 6,
            startedBy: playerName,
            display: word.split('').map(c => c === ' ' ? ' ' : '_')
        });

        const hangman = this._drawHangman(0);

        return `📝 *TEBAK KATA* 📝\n\n` +
            `${playerName} memulai game!\n\n` +
            `💡 Hint: *${wordData.hint}*\n\n` +
            `${hangman}\n\n` +
            `Kata: ${display}\n\n` +
            `Tebak huruf: *!huruf [huruf]*\n` +
            `Tebak kata: *!kata [kata]*\n` +
            `Contoh: *!huruf A* atau *!kata KOMPUTER*`;
    }

    guessLetter(groupId, playerName, letter) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Belum ada game Tebak Kata!\nKetik *!tebakkata* untuk mulai.';
        }

        const l = letter.toUpperCase();
        if (l.length !== 1 || !/[A-Z]/.test(l)) {
            return '⚠️ Masukkan satu huruf saja! (A-Z)';
        }

        if (session.guessedLetters.has(l)) {
            return `⚠️ Huruf *${l}* sudah pernah ditebak!`;
        }

        session.guessedLetters.add(l);

        if (session.word.includes(l)) {
            // Correct letter
            session.word.split('').forEach((c, i) => {
                if (c === l) session.display[i] = l;
            });

            // Check win
            if (!session.display.includes('_')) {
                this.sessions.delete(groupId);
                return `🎉🎉🎉 *KATA DITEMUKAN!* 🎉🎉🎉\n\n` +
                    `${playerName} menebak huruf *${l}* dan melengkapi kata!\n` +
                    `Kata: *${session.word}*\n\n` +
                    `🏆 Selamat! 🏆\n` +
                    `Ketik *!tebakkata* untuk main lagi!`;
            }

            const display = session.display.join(' ');
            return `✅ Huruf *${l}* ada! (oleh ${playerName})\n\n` +
                `Kata: ${display}\n` +
                `Salah: ${session.wrongGuesses}/${session.maxWrong}\n` +
                `Huruf dicoba: ${[...session.guessedLetters].join(', ')}`;
        } else {
            // Wrong letter
            session.wrongGuesses++;

            if (session.wrongGuesses >= session.maxWrong) {
                const word = session.word;
                this.sessions.delete(groupId);
                return `${this._drawHangman(session.maxWrong)}\n\n` +
                    `💀 *GAME OVER!* 💀\n\n` +
                    `Kata yang benar: *${word}*\n` +
                    `Ketik *!tebakkata* untuk main lagi!`;
            }

            const display = session.display.join(' ');
            const hangman = this._drawHangman(session.wrongGuesses);

            return `❌ Huruf *${l}* tidak ada! (oleh ${playerName})\n\n` +
                `${hangman}\n\n` +
                `Kata: ${display}\n` +
                `Salah: ${session.wrongGuesses}/${session.maxWrong}\n` +
                `Huruf dicoba: ${[...session.guessedLetters].join(', ')}`;
        }
    }

    guessWord(groupId, playerName, word) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Belum ada game Tebak Kata!\nKetik *!tebakkata* untuk mulai.';
        }

        if (word.toUpperCase() === session.word) {
            this.sessions.delete(groupId);
            return `🎉🎉🎉 *BENAR!* 🎉🎉🎉\n\n` +
                `${playerName} menebak kata *${session.word}*!\n\n` +
                `🏆 Kamu jenius! 🏆\n` +
                `Ketik *!tebakkata* untuk main lagi!`;
        } else {
            session.wrongGuesses++;
            if (session.wrongGuesses >= session.maxWrong) {
                const correctWord = session.word;
                this.sessions.delete(groupId);
                return `${this._drawHangman(session.maxWrong)}\n\n` +
                    `💀 *GAME OVER!* 💀\n\n` +
                    `*${word.toUpperCase()}* bukan jawabannya!\n` +
                    `Kata yang benar: *${correctWord}*\n` +
                    `Ketik *!tebakkata* untuk main lagi!`;
            }

            return `❌ *${word.toUpperCase()}* bukan kata yang dicari!\n` +
                `Salah: ${session.wrongGuesses}/${session.maxWrong}\n` +
                `Coba lagi!`;
        }
    }

    _drawHangman(wrong) {
        const stages = [
            '```\n  ┌───┐\n  │   │\n      │\n      │\n      │\n ─────┘\n```',
            '```\n  ┌───┐\n  │   │\n  😵  │\n      │\n      │\n ─────┘\n```',
            '```\n  ┌───┐\n  │   │\n  😵  │\n  │   │\n      │\n ─────┘\n```',
            '```\n  ┌───┐\n  │   │\n  😵  │\n ╱│   │\n      │\n ─────┘\n```',
            '```\n  ┌───┐\n  │   │\n  😵  │\n ╱│╲  │\n      │\n ─────┘\n```',
            '```\n  ┌───┐\n  │   │\n  😵  │\n ╱│╲  │\n ╱   │\n ─────┘\n```',
            '```\n  ┌───┐\n  │   │\n  😵  │\n ╱│╲  │\n ╱ ╲ │\n ─────┘\n```',
        ];
        return stages[Math.min(wrong, stages.length - 1)];
    }

    endGame(groupId) {
        if (this.sessions.has(groupId)) {
            const session = this.sessions.get(groupId);
            this.sessions.delete(groupId);
            return `🛑 Game Tebak Kata dihentikan!\nKata: *${session.word}*`;
        }
        return '❌ Tidak ada game Tebak Kata yang berjalan.';
    }
}

module.exports = TebakKata;
