import React, { useEffect, useState } from 'react';
import AggiungiRisultato from '../scripts/AggiungiRisultato.js';

function ElencoScontriDaGiocare() {

    const [scontri, setScontri] = useState([]); // Stato per memorizzare gli scontri

    // Effetto per gestire gli eventi di storage
    useEffect(() => {
        const handleStorageAddPlayers = () => {
            setScontri(JSON.parse(sessionStorage.getItem('scontri')));
        };

        window.addEventListener('StorageScontriUpdate', handleStorageAddPlayers);
        window.addEventListener('TabSwitch', handleStorageAddPlayers);

        return () => {
            window.removeEventListener('StorageScontriUpdate', handleStorageAddPlayers);
            window.removeEventListener('TabSwitch', handleStorageAddPlayers);
        };
    }, []);

    // Gestisce il click sul pulsante di vittoria
    const handleWin = (player) => (e) => {
        // Recupera l'id dello scontro
        const scontroId = e.target.closest('div').id;

        // Aggiunge il risultato dello scontro
        AggiungiRisultato(scontroId, player);
    }

    // Ritorna il JSX per il rendering del componente
    return (
        <div className='h-60 lg:h-full w-full relative'>
            <div className='h-full w-full overflow-y-auto absolute overflow-x-hidden flex flex-col gap-2'>
                {
                    scontri && scontri.filter(scontro => scontro.winner === null).map((scontro, index) => {
                        return (
                            <div key={index} id={scontro.id} className='flex flex-row justify-between max-w-full bg-tertiary rounded-lg h-10 items-center p-2'>
                                <p className='mr-1 w-full text-center truncate'>{scontro.player1.name}</p>
                                <button onClick={handleWin(scontro.player1.id)} className='w-40 text-center hover:bg-secondary rounded-lg'>🏆</button>
                                <p className='mr-2 font-bold w-40 text-center'>VS</p>
                                <p className='mr-1 w-full text-center truncate'>{scontro.player2.name}</p>
                                <button onClick={handleWin(scontro.player2.id)} className='w-40 text-center hover:bg-secondary rounded-lg'>🏆</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ElencoScontriDaGiocare;