/**
 * Aggiorna il risultato di uno scontro specificato impostando il vincitore.
 *
 * @param {number} id - L'ID dello scontro da aggiornare.
 * @param {string} player - L'ID del giocatore vincitore.
 */
function AgguingiRisultato(id, player) {
    // Recupera la lista degli scontri dalla sessionStorage
    const scontri = JSON.parse(sessionStorage.getItem('scontri'));

    // Trova lo scontro con l'id specificato
    const scontro = scontri.find(scontro => scontro.id === id);

    // Trova il giocatore con l'id specificato
    const giocatore = scontro.player1.id === player ? scontro.player1 : scontro.player2;
    
    // Imposta il vincitore dello scontro
    scontro.winner = giocatore;

    // Aggiorna la lista degli scontri nella sessionStorage
    sessionStorage.setItem('scontri', JSON.stringify(scontri));
    window.dispatchEvent(new Event('StorageScontriUpdate'));
}

export default AgguingiRisultato;