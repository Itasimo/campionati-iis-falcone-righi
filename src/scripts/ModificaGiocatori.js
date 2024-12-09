/**
 * ModificaGiocatore gestisce le operazioni di modifica sui giocatori memorizzati in sessionStorage.
 *
 * @param {number} id - L'ID del giocatore da modificare o eliminare.
 * @param {string} action - L'azione da eseguire. Può essere 'delete_all', 'delete' o 'edit'.
 * @param {string} [name] - Il nuovo nome del giocatore, richiesto solo se l'azione è 'edit'.
 *
 * Le azioni possibili sono:
 * - 'delete_all': Elimina tutti i giocatori.
 * - 'delete': Elimina il giocatore con l'ID specificato.
 * - 'edit': Modifica il nome del giocatore con l'ID specificato.
 *
 * Dopo aver eseguito l'azione, aggiorna sessionStorage e invia un evento 'StoragePlayerEdit'.
 */
function ModificaGiocatore(id, action, name) {
    // Recupera i giocatori memorizzati in sessionStorage, oppure un array vuoto se non esistono
    let players = JSON.parse(sessionStorage.getItem('players')) || [];

    // Se l'azione è 'delete_all', elimina tutti i giocatori
    if (action === 'delete_all') {
        players = [];
    } 
    // Se l'azione è 'delete', elimina il giocatore con l'ID specificato
    else if (action === 'delete') {
        players = players.filter(player => player.id !== id);
    } 
    // Se l'azione è 'edit', modifica il nome del giocatore con l'ID specificato
    else if (action === 'edit') {
        players = players.map(player => {
            if (player.id === id) {
                player.name = name;
            }
            return player;
        });
    }

    // Aggiorna sessionStorage con i giocatori modificati
    sessionStorage.setItem('players', JSON.stringify(players));
    sessionStorage.setItem('scontri', JSON.stringify([]));
    // Invia un evento 'StoragePlayerEdit' per notificare che i giocatori sono stati modificati
    window.dispatchEvent(new Event('StoragePlayerEdit'));
    window.dispatchEvent(new Event('TabSwitch'));
    window.dispatchEvent(new Event('StorageScontriUpdate'));
}

// Esporta la funzione ModificaGiocatore come modulo predefinito
export default ModificaGiocatore