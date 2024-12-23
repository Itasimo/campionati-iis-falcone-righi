import { useEffect } from "react";
import CalcolaScontri from "./CalcolaScontri";

function ScontriManager() {

    // Sincronizza la lista dei giocatori con la sessionStorage
    useEffect(() => {
        const handleStorageAddPlayers = () => {

            // Recupera la lista dei giocatori dalla sessionStorage
            const players = JSON.parse(sessionStorage.getItem('players')) || [];

            if (players.length > 0) {
                // Recupera la lista dei giocatori dalla sessionStorage
                const CurrentScontri = JSON.parse(sessionStorage.getItem('scontri')) || [];   

                // Calcola gli scontri;
                const scontriCalcolati = CalcolaScontri(players);

                // Aggiorna gli scontri esistenti mantenendo il parametro winner
                let scontriAggiornati = scontriCalcolati.map(scontroCalcolato => {
                    // Cerca lo scontro corrente nella lista degli scontri esistenti
                    const scontroEsistente = CurrentScontri.find(s => s.id == scontroCalcolato.id); 
                    // Se lo scontro esiste, mantiene il vincitore altrimenti lo imposta a null        
                    return scontroEsistente ? { ...scontroCalcolato, winner: scontroEsistente.winner || null } : scontroCalcolato;
                });

                // Rimuovi gli scontri eliminati dall'utente

                // Ottieni gli ID dei giocatori correnti dalla lista degli scontri attuali
                const OldPlayersIDs = [...new Set(CurrentScontri.map(s => s.player1.id.toString()).concat(CurrentScontri.map(s => s.player2.id.toString())))];
                // Crea una lista contenente solo gli scontri con i giocatori vecchi (Vecchi in caso vengano aggiunti nuovi giocatori)
                const OldScontri = scontriAggiornati.filter(s => OldPlayersIDs.includes(s.player1.id.toString()) && OldPlayersIDs.includes(s.player2.id.toString()));
                // Crea una lista con gli elementi di CurrentScontri convertiti in stringa (JS non confronta oggetti... quindi li converto in stringa... che merda)
                const CurrentScontriString = CurrentScontri.map(s => JSON.stringify(s));
                // Trova la differenza tra OldScontri e CurrentScontriString, ovvero gli scontri eliminati dall'utente
                const diff = OldScontri.filter(x => !CurrentScontriString.includes(JSON.stringify(x)));
                // Rimuovi gli elementi di diff dalla lista scontriAggiornati
                scontriAggiornati = scontriAggiornati.filter(s => !diff.includes(s));

                // Aggiorna la lista degli scontri nella sessionStorage e lancia l'evento di aggiornamento
                sessionStorage.setItem('scontri', JSON.stringify(scontriAggiornati));
                window.dispatchEvent(new Event('StorageScontriUpdate'));
            }
        };

        window.addEventListener('StorageAddPlayers', handleStorageAddPlayers);
        window.addEventListener('StoragePlayerEdit', handleStorageAddPlayers);

        return () => {
            window.removeEventListener('StorageAddPlayers', handleStorageAddPlayers);
            window.removeEventListener('StoragePlayerEdit', handleStorageAddPlayers);
        };
    }, []);

    return null; // Or return some JSX if needed
}

export default ScontriManager;