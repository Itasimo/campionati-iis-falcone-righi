function AggiungiClasse() {

    const handleInputChange = (event) => {
        localStorage.setItem('classe', event.target.value);
    };

    return (
        <div>
            <h1 className="mb-2">Aggiungi classe</h1>
            <input type="text" onKeyUp={handleInputChange} className="bg-primary rounded-md outline-none p-2" />
        </div>
    )

}

export default AggiungiClasse;