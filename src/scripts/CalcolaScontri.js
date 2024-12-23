function CalcolaScontri(players) {
    
    class Scontro {
        constructor(player1, player2) {
            this.player1 = player1;
            this.player2 = player2;
            this.id = player1.id + "|" + player2.id;
            this.winner = null;
        }
    }

    let scontri = new Map();
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            // Scontri diretti es 1 vs 2 ma non 2 vs 1
            let scontro = new Scontro(players[i], players[j]);
            scontri.set(scontro.id, scontro);
        }
    }

    // Convert scontri to array
    scontri = Array.from(scontri.values());

    return scontri;
}

export default CalcolaScontri;