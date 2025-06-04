import { useParams } from "react-router-dom";
import StatisticsComponent from "./StatisticsComponent";

function StatisticsPage() {
    const { exerciseId } = useParams();

    return (
        <div className="p-4">
            <StatisticsComponent selectedExerciseId={exerciseId} />
        </div>
    );
}

export default StatisticsPage;
