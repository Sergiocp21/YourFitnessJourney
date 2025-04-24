export default function GlobalRoutinesComponent({ goBack }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Rutinas de otros usuarios</h2>
            <p>Estas rutinas han sido creadas por otros usuarios.</p>
            <button className="btn mt-4" onClick={goBack}>Volver al menú</button>
        </div>
    );
}