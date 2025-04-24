const UserRoutinesComponent = ({ goBack }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Rutinas Predefinidas</h2>
            <p>Estas rutinas han sido creadas por entrenadores certificados.</p>
            <button className="btn mt-4" onClick={goBack}>Volver al menú</button>
        </div>
    );

}
export default UserRoutinesComponent;