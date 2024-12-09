import React, { useState, useEffect } from 'react';

function Classifica() {

    class PlayerCareer {
        constructor(name, id) {
            this.name = name;
            this.id = id;
            this.wins = 1;
        }
    }

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const handleStorageAddPlayers = () => {

            // Recupero gli scontri dalla session storage
            const scontri = JSON.parse(sessionStorage.getItem('scontri')) || [];

            // Creo un array di oggetti PlayerCareer per tenere traccia delle vittorie di ogni giocatore
            const players = [];

            // Per ogni scontro giocato, controllo chi è il vincitore e aggiorno il numero di vittorie del giocatore
            scontri.filter(scontro => scontro.winner !== null).map(scontro => {

                // Se il giocatore non è presente nell'array, lo aggiungo
                if (players.filter(player => player.id === scontro.winner.id).length === 0) {

                    // Creo un nuovo oggetto PlayerCareer e lo aggiungo all'array
                    players.push(new PlayerCareer(scontro.winner.name, scontro.winner.id));
                } else {

                    // Altrimenti, incremento il numero di vittorie del giocatore
                    players.filter(player => player.id === scontro.winner.id)[0].wins++;
                }
            });

            // Ordino l'array in base al numero di vittorie
            players.sort((a, b) => b.wins - a.wins);

            // Aggiorno lo stato
            setPlayers(players);

        };

        window.addEventListener('StorageScontriUpdate', handleStorageAddPlayers);

        return () => {
            window.removeEventListener('StorageScontriUpdate', handleStorageAddPlayers);
        };
    }, []);

    const leaderboardColors = [ '!bg-yellow-300', '!bg-stone-500', '!bg-amber-800'];

    return (
        <div className='border-2 border-secondary rounded-lg p-5 h-52 lg:h-1/2'>
            <div className='h-full w-full relative'>
                <div className='h-full w-full overflow-y-auto absolute overflow-x-hidden flex flex-col gap-2'>
                    {
                        players.map((player, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className='cursor-pointer flex flex-row justify-between w-full bg-tertiary rounded-lg h-10 items-center p-2'
                                    onMouseEnter={(e) => {
                                        const classes = (leaderboardColors[index] || '!bg-secondary').split(' ');
                                        classes.forEach(cls => e.currentTarget.classList.add(cls));
                                    }}
                                    onMouseLeave={(e) => {
                                        const classes = (leaderboardColors[index] || '!bg-secondary').split(' ');
                                        classes.forEach(cls => e.currentTarget.classList.remove(cls));
                                    }}
                                >
                                    <p className='text-left w-10/12 truncate'>{player.name}</p>
                                    <p className='text-center w-fit'>{player.wins} 🏆</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Classifica;