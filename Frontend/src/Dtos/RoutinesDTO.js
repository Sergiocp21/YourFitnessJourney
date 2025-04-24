export class RoutineDTO {
    constructor(name, description, isPublic, days) {
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.days = days.map((day, index) => ({
            order: index + 1,
            name: day.name,
            exercises: day.exercises.map((ex) => ({
                id: ex.id,
                sets: ex.sets,
            })),
        }));
    }
}
