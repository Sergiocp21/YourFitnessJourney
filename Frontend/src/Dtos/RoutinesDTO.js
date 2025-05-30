export class RoutineDTO {
    constructor(routineId, name, description, isPublic, days) {
        this.routineId = routineId;
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.days = days.map((day, index) => ({
            order: index + 1,
            name: day.name,
            exercises: day.exercises.map((ex, exIndex) => ({
                id: ex.id,
                name: ex.name,
                sets: ex.sets,
                order: exIndex + 1,
                notes: ex.notes,
            })),
        }));
    }
}
