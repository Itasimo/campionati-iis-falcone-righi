import AggiungiRisultato from './AggiungiRisultato.js';

function ModificaRisultato(scontroId) {

    const scontri = JSON.parse(sessionStorage.getItem('scontri'));
    const scontro = scontri.find(scontro => scontro.id === scontroId);

    // Trova l'ID del giocatore perdente ricavanandolo dall'ID dello scontro
    const giocatoreID = Number(scontroId.split(String(scontro.winner.id)).filter(part => part !== '')[0].replace('|', ''));
    

    AggiungiRisultato(scontroId, giocatoreID);

}

export default ModificaRisultato;