function CalcolaScontri(players) {

    // const classe = sessionStorage.getItem('classe');
    // const settings = JSON.parse(localStorage.getItem(classe)).settings;
    
    class Scontro {
        constructor(player1, player2) {
            this.player1 = player1;
            this.player2 = player2;
            this.id = player1.id + "|" + player2.id;
            this.winner = null;
        }
    }

    const settings = JSON.parse(sessionStorage.getItem('settings'));

    let scontri = new Map();
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            if (!settings.returnMatches) {
                // Scontri diretti abilitati -> singolo scontro (solo player1 vs player2)
                let scontro = new Scontro(players[i], players[j]);
                scontri.set(scontro.id, scontro);
            } else {
                // Scontri diretti disabilitati -> doppio scontro (player1 vs player2 e player2 vs player1)
                let scontro1 = new Scontro(players[i], players[j]);
                let scontro2 = new Scontro(players[j], players[i]);
                scontri.set(scontro1.id, scontro1);
                scontri.set(scontro2.id, scontro2);
            }
        }
    }

    // Convert scontri to array
    scontri = Array.from(scontri.values());

    return scontri;
}

export default CalcolaScontri;