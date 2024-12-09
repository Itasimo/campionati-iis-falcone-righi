function EliminaClassePopUp() {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-lg font-bold">
                Sei sicuro/a di voler eliminare questa classe? 
            </h1>
            <p>
                Questa azione è irreversibile.
            </p>
        </div>
    )
}

export default EliminaClassePopUp;