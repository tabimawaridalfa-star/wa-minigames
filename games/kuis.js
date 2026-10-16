// ========================================
// 🧠 GAME: KUIS / TRIVIA
// ========================================

class Kuis {
    constructor() {
        this.sessions = new Map();
        this.questions = [
            { q: 'Apa ibukota Indonesia?', a: 'nusantara', options: 'A. Jakarta\nB. Nusantara\nC. Bandung\nD. Surabaya', correct: 'B' },
            { q: 'Planet terbesar di tata surya?', a: 'jupiter', options: 'A. Mars\nB. Saturnus\nC. Jupiter\nD. Neptunus', correct: 'C' },
            { q: 'Siapa penemu lampu pijar?', a: 'thomas edison', options: 'A. Nikola Tesla\nB. Thomas Edison\nC. Albert Einstein\nD. Isaac Newton', correct: 'B' },
            { q: 'Berapa jumlah provinsi di Indonesia (2024)?', a: '38', options: 'A. 34\nB. 36\nC. 38\nD. 40', correct: 'C' },
            { q: 'Apa bahasa pemrograman yang dibuat oleh Guido van Rossum?', a: 'python', options: 'A. Java\nB. C++\nC. JavaScript\nD. Python', correct: 'D' },
            { q: 'Negara mana yang dijuluki "Negeri Matahari Terbit"?', a: 'jepang', options: 'A. China\nB. Korea Selatan\nC. Jepang\nD. Thailand', correct: 'C' },
            { q: 'Siapa presiden pertama Indonesia?', a: 'soekarno', options: 'A. Soeharto\nB. Soekarno\nC. Habibie\nD. Megawati', correct: 'B' },
            { q: 'Apa rumus luas lingkaran?', a: 'πr²', options: 'A. 2πr\nB. πr²\nC. πd\nD. 2πr²', correct: 'B' },
            { q: 'Hewan apa yang menjadi lambang negara Indonesia?', a: 'garuda', options: 'A. Elang\nB. Rajawali\nC. Garuda\nD. Merak', correct: 'C' },
            { q: 'Berapa hasil dari 15 x 15?', a: '225', options: 'A. 215\nB. 225\nC. 235\nD. 250', correct: 'B' },
            { q: 'Apa nama gunung tertinggi di dunia?', a: 'everest', options: 'A. Kilimanjaro\nB. Fuji\nC. Everest\nD. K2', correct: 'C' },
            { q: 'Organ manusia yang berfungsi memompa darah?', a: 'jantung', options: 'A. Paru-paru\nB. Hati\nC. Ginjal\nD. Jantung', correct: 'D' },
            { q: 'Apa kepanjangan HTML?', a: 'hypertext markup language', options: 'A. Hyper Tool Markup Language\nB. HyperText Markup Language\nC. Home Tool Markup Language\nD. HyperText Making Language', correct: 'B' },
            { q: 'Benua terluas di dunia?', a: 'asia', options: 'A. Afrika\nB. Amerika\nC. Eropa\nD. Asia', correct: 'D' },
            { q: 'Sungai terpanjang di dunia?', a: 'nil', options: 'A. Amazon\nB. Nil\nC. Mississippi\nD. Yangtze', correct: 'B' },
            { q: 'Apa simbol kimia untuk air?', a: 'h2o', options: 'A. O2\nB. CO2\nC. H2O\nD. NaCl', correct: 'C' },
            { q: 'Siapa penulis novel "Laskar Pelangi"?', a: 'andrea hirata', options: 'A. Tere Liye\nB. Andrea Hirata\nC. Pramoedya\nD. Dee Lestari', correct: 'B' },
            { q: 'Apa warna bendera Indonesia?', a: 'merah putih', options: 'A. Merah Biru\nB. Merah Kuning\nC. Merah Putih\nD. Putih Biru', correct: 'C' },
            { q: 'Tahun berapa Indonesia merdeka?', a: '1945', options: 'A. 1942\nB. 1944\nC. 1945\nD. 1946', correct: 'C' },
            { q: 'Apa nama mata uang Jepang?', a: 'yen', options: 'A. Won\nB. Yuan\nC. Yen\nD. Ringgit', correct: 'C' },
        ];
    }

    startGame(groupId, playerName) {
        if (this.sessions.has(groupId)) {
            return '⚠️ Kuis sudah berjalan! Jawab dulu pertanyaannya.';
        }

        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5);

        this.sessions.set(groupId, {
            questions: selected,
            currentIndex: 0,
            scores: {},
            startedBy: playerName,
            answered: false
        });

        return this._showQuestion(groupId);
    }

    _showQuestion(groupId) {
        const session = this.sessions.get(groupId);
        const q = session.questions[session.currentIndex];
        session.answered = false;

        return `🧠 *KUIS - Pertanyaan ${session.currentIndex + 1}/5* 🧠\n\n` +
            `❓ ${q.q}\n\n` +
            `${q.options}\n\n` +
            `Ketik: *!jawab [A/B/C/D]*`;
    }

    answer(groupId, playerName, answer) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Belum ada kuis!\nKetik *!kuis* untuk mulai.';
        }

        if (session.answered) {
            return '⚠️ Pertanyaan ini sudah dijawab! Tunggu pertanyaan berikutnya...';
        }

        const normalizedAnswer = answer.toUpperCase().trim();
        if (!['A', 'B', 'C', 'D'].includes(normalizedAnswer)) {
            return '⚠️ Jawab dengan *A*, *B*, *C*, atau *D*!';
        }

        const q = session.questions[session.currentIndex];
        session.answered = true;

        if (!session.scores[playerName]) {
            session.scores[playerName] = 0;
        }

        let response = '';
        if (normalizedAnswer === q.correct) {
            session.scores[playerName] += 10;
            response = `✅ *BENAR!* ${playerName} dapat *+10 poin*! 🎉\n`;
        } else {
            response = `❌ *SALAH!* Jawaban yang benar: *${q.correct}*\n` +
                `${playerName} tidak dapat poin 😢\n`;
        }

        session.currentIndex++;

        if (session.currentIndex >= session.questions.length) {
            // Game over - show final scores
            response += `\n🏁 *KUIS SELESAI!* 🏁\n\n`;
            response += `📊 *SKOR AKHIR:*\n`;

            const sorted = Object.entries(session.scores)
                .sort(([, a], [, b]) => b - a);

            if (sorted.length === 0) {
                response += 'Tidak ada yang menjawab benar 😅';
            } else {
                const medals = ['🥇', '🥈', '🥉'];
                sorted.forEach(([name, score], i) => {
                    const medal = medals[i] || '▫️';
                    response += `${medal} ${name}: *${score} poin*\n`;
                });
                response += `\n🏆 Pemenang: *${sorted[0][0]}*! Selamat! 🏆`;
            }

            response += `\n\nKetik *!kuis* untuk main lagi!`;
            this.sessions.delete(groupId);
            return response;
        }

        // Show next question
        response += `\n` + this._showQuestion(groupId);
        return response;
    }

    endGame(groupId) {
        if (this.sessions.has(groupId)) {
            this.sessions.delete(groupId);
            return '🛑 Kuis dihentikan!';
        }
        return '❌ Tidak ada kuis yang berjalan.';
    }
}

module.exports = Kuis;
