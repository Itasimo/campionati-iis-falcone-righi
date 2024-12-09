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
                const scontriAggiornati = scontriCalcolati.map(scontroCalcolato => {
                    const scontroEsistente = CurrentScontri.find(s => s.id == scontroCalcolato.id);          
                    return scontroEsistente ? { ...scontroCalcolato, winner: scontroEsistente.winner || null } : scontroCalcolato;
                });

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