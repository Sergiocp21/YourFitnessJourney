export class RoutineDayDTO {
    constructor(order, name, exercises) {
        this.order = order;
        this.name = name;
        this.exercises = exercises.map((ex) => ({
            id: ex.id,
            name: ex.name,
            description: ex.description,
            sets: ex.sets,
            weight: ex.weight,
            reps: ex.reps,
            order: ex.order,
            notes: ex.notes,
        }));
    }
}