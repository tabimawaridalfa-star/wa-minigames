// ========================================
// ➕ GAME: MATH CHALLENGE
// ========================================

class MathChallenge {
    constructor() {
        this.sessions = new Map();
    }

    startGame(groupId, playerName) {
        if (this.sessions.has(groupId)) {
            return '⚠️ Math Challenge sudah berjalan!';
        }

        const questions = [];
        for (let i = 0; i < 5; i++) {
            questions.push(this._generateQuestion(i));
        }

        this.sessions.set(groupId, {
            questions,
            currentIndex: 0,
            scores: {},
            startedBy: playerName,
            answered: false,
            startTime: Date.now()
        });

        return this._showQuestion(groupId);
    }

    _generateQuestion(difficulty) {
        const ops = ['+', '-', '×'];
        let a, b, op, answer;

        if (difficulty < 2) {
            // Easy: simple addition/subtraction
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * 50) + 1;
            op = ops[Math.floor(Math.random() * 2)];
        } else if (difficulty < 4) {
            // Medium: larger numbers, multiplication
            a = Math.floor(Math.random() * 100) + 10;
            b = Math.floor(Math.random() * 20) + 1;
            op = ops[Math.floor(Math.random() * 3)];
        } else {
            // Hard: larger multiplication
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            op = ops[Math.floor(Math.random() * 3)];
        }

        switch (op) {
            case '+': answer = a + b; break;
            case '-': answer = a - b; break;
            case '×': answer = a * b; break;
        }

        return { question: `${a} ${op} ${b}`, answer };
    }

    _showQuestion(groupId) {
        const session = this.sessions.get(groupId);
        const q = session.questions[session.currentIndex];
        session.answered = false;
        session.questionTime = Date.now();

        const difficulty = session.currentIndex < 2 ? '🟢 Mudah' :
            session.currentIndex < 4 ? '🟡 Sedang' : '🔴 Sulit';

        return `➕ *MATH CHALLENGE - Soal ${session.currentIndex + 1}/5* ➕\n\n` +
            `Tingkat: ${difficulty}\n\n` +
            `🔢 *${q.question} = ?*\n\n` +
            `Ketik: *!hitung [jawaban]*\n` +
            `Yang paling cepat dan benar menang! ⚡`;
    }

    answer(groupId, playerName, answer) {
        const session = this.sessions.get(groupId);
        if (!session) {
            return '❌ Belum ada Math Challenge!\nKetik *!math* untuk mulai.';
        }

        if (session.answered) {
            return '⚠️ Soal ini sudah dijawab! Tunggu soal berikutnya...';
        }

        const num = parseInt(answer);
        if (isNaN(num)) {
            return '⚠️ Masukkan angka!';
        }

        const q = session.questions[session.currentIndex];

        if (!session.scores[playerName]) {
            session.scores[playerName] = 0;
        }

        let response = '';
        if (num === q.answer) {
            session.answered = true;
            const speed = ((Date.now() - session.questionTime) / 1000).toFixed(1);
            const bonus = speed < 5 ? 5 : speed < 10 ? 3 : 0;
            const points = 10 + bonus;
            session.scores[playerName] += points;

            response = `✅ *BENAR!* ${playerName} menjawab *${num}* ⚡\n` +
                `Waktu: ${speed} detik\n` +
                `Poin: +${points} ${bonus > 0 ? '(termasuk bonus kecepatan!)' : ''}\n`;
        } else {
            session.scores[playerName] -= 2;
            return `❌ *SALAH!* ${playerName} menjawab *${num}*\n` +
                `Poin: -2 😢 Coba lagi!`;
        }

        session.currentIndex++;

        if (session.currentIndex >= session.questions.length) {
            response += `\n🏁 *MATH CHALLENGE SELESAI!* 🏁\n\n`;
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
                response += `\n🏆 Juara: *${sorted[0][0]}*! 🧮`;
            }

            response += `\n\nKetik *!math* untuk main lagi!`;
            this.sessions.delete(groupId);
            return response;
        }

        response += `\n` + this._showQuestion(groupId);
        return response;
    }

    endGame(groupId) {
        if (this.sessions.has(groupId)) {
            this.sessions.delete(groupId);
            return '🛑 Math Challenge dihentikan!';
        }
        return '❌ Tidak ada Math Challenge yang berjalan.';
    }
}

module.exports = MathChallenge;
