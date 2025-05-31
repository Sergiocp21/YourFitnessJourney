package com.your_fitness_journey.backend.Service;

import com.your_fitness_journey.backend.Model.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.Exercises.ExerciseDayDTO;
import com.your_fitness_journey.backend.Model.Exercises.ExerciseInfoDTO;
import com.your_fitness_journey.backend.Model.Exercises.UserExercise;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import com.your_fitness_journey.backend.Model.Routines.*;
import com.your_fitness_journey.backend.Model.Users.User;
import com.your_fitness_journey.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoutineService {

    private final ExerciseService exerciseService;
    private final IRoutineRepository routineRepository;
    private final IRoutineDayRepository routineDayRepository;
    private final IUserRoutineDayExerciseRepository userRoutineDayExerciseRepository;
    private final IUserRoutineProgressRepository userRoutineProgressRepository;

    @Autowired
    public RoutineService(IRoutineDayRepository routineDayRepository, IUserRoutineDayExerciseRepository userRoutineExerciseRepository, IRoutineRepository routineRepository, ExerciseService exerciseService, IUserRoutineProgressRepository userRoutineProgressRepository) {
        this.routineDayRepository = routineDayRepository;
        this.userRoutineDayExerciseRepository = userRoutineExerciseRepository;
        this.routineRepository = routineRepository;
        this.exerciseService = exerciseService;
        this.userRoutineProgressRepository = userRoutineProgressRepository;
    }

    @Transactional
    public Set<UserRoutineDayExercise> createRoutine(FullRoutineInfoDTO routineInfo, User user) { //Routine table
        Routine routine = new Routine(user, routineInfo.getName(), routineInfo.getDescription(), routineInfo.isIsPublic());

        Set<UserRoutineDayExercise> exercisesPerDay = new HashSet<>();

        for(ExerciseDayDTO exerciseDayDTO : routineInfo.getExerciseDays()) { //Day by day
            RoutineDay routineDay = new RoutineDay(routine, exerciseDayDTO.getOrder(), exerciseDayDTO.getName());
            for(ExerciseInfoDTO exerciseInfoDTO : exerciseDayDTO.getExercises()) { //Exercise by exercise
                Optional<Exercise> optionalExercise = exerciseService.getExerciseById(exerciseInfoDTO.getExerciseId());
                if(optionalExercise.isPresent()) {
                    UserRoutineDayExercise exerciseDay = new UserRoutineDayExercise(user, routineDay, optionalExercise.get(), exerciseInfoDTO.getNumSets(), exerciseInfoDTO.getOrder());
                    routineRepository.save(routine);
                    routineDayRepository.save(routineDay);
                    userRoutineDayExerciseRepository.save(exerciseDay);
                    exercisesPerDay.add(exerciseDay);

                }
                else{
                    return new HashSet<>();
                }
            }

        }

        return exercisesPerDay;
    }

    public List<ExerciseDayDTO> getActiveRoutine(User user) {
        UserRoutineProgress progress = userRoutineProgressRepository.findById(user.getGoogleId())
                .orElseThrow(() -> new RuntimeException("No hay rutina activa para el usuario"));

        List<RoutineDay> days = routineDayRepository.getRoutineDayByRoutine_Id(progress.getRoutine().getId());

        return days.stream()
                .map(day -> {
                    ExerciseDayDTO dto = new ExerciseDayDTO();
                    dto.setOrder(day.getDayOrder());
                    dto.setName(day.getDayName());
                    return dto;
                })
                .sorted(Comparator.comparing(ExerciseDayDTO::getOrder))
                .collect(Collectors.toList());
    }

    public ExerciseDayDTO getTodayExercises(User user) {
        UserRoutineProgress activeRoutine = getUserActiveRoutine(user) //User active routine
                .orElseThrow(() -> new RuntimeException("No hay rutina activa"));

        RoutineDay routineDay = routineDayRepository
                .findByRoutineAndDayOrder(activeRoutine.getRoutine(), activeRoutine.getCurrentDayOrder())
                .orElseThrow(() -> new RuntimeException("No se encontró el día actual de la rutina"));

        List<UserRoutineDayExercise> exercisesToday = userRoutineDayExerciseRepository.findUserRoutineDayExercisesByRoutineDayOrderByExerciseOrder(routineDay); //Today of active routine

        if (exercisesToday.isEmpty()) {
            throw new RuntimeException("No hay ejercicios asignados para el día actual");
        }

        ExerciseDayDTO exerciseDayDTO = new ExerciseDayDTO();
        exerciseDayDTO.setName(routineDay.getDayName());
        exerciseDayDTO.setOrder(routineDay.getDayOrder());

        List<ExerciseInfoDTO> exerciseInfoList = new ArrayList<>();

        for (UserRoutineDayExercise entry : exercisesToday) {
            Exercise exercise = entry.getExercise();

            Optional<UserExercise> optionalUserExercise = exerciseService.getUserExercise(user, exercise);

            UserExercise userEx = optionalUserExercise.orElseGet(() -> { //Inserts in the database the relationship between user and exercise
                UserExercise newUserExercise = new UserExercise(user, exercise, null, 0);
                return exerciseService.saveUserExercise(newUserExercise);
            });

            ExerciseInfoDTO dto = new ExerciseInfoDTO();
            dto.setExerciseId(exercise.getId());
            dto.setName(exercise.getName());
            dto.setNumSets(entry.getSets());
            dto.setOrder(entry.getExerciseOrder());
            dto.setReps(userEx.getLastReps());
            dto.setWeight(userEx.getLastWeight());
            dto.setNotes(userEx.getExerciseNote());

            exerciseInfoList.add(dto);
        }

        exerciseDayDTO.setExercises(exerciseInfoList);
        return exerciseDayDTO;
    }

    private Optional<UserRoutineProgress> getUserActiveRoutine(User user) {
        return userRoutineProgressRepository.findById(user.getGoogleId());
    }

    public List<FullRoutineInfoDTO> getRoutinesForFrontend(List<Routine> routines) {
        if(!routines.isEmpty()){
            List<FullRoutineInfoDTO> routinesDTO = new ArrayList<>();
            for(Routine routine : routines) {
                List<ExerciseDayDTO> exerciseDayDTOList = new ArrayList<>();
                FullRoutineInfoDTO routineInfo = new FullRoutineInfoDTO();
                routineInfo.setRoutineId(routine.getId());
                routineInfo.setName(routine.getName());
                routineInfo.setDescription(routine.getDescription());
                routineInfo.setPublic(true);

                List<RoutineDay> routineDayList = routineDayRepository.getRoutineDayByRoutine_Id(routine.getId());

                for(RoutineDay routineDay : routineDayList) {
                    ExerciseDayDTO exerciseDayDTO = new ExerciseDayDTO();
                    exerciseDayDTO.setOrder(routineDay.getDayOrder());
                    exerciseDayDTO.setName(routineDay.getDayName());

                    List<UserRoutineDayExercise> userRoutineDayExercises = userRoutineDayExerciseRepository.getUserRoutineDayExercisesByRoutineDay_IdOrderByExerciseOrderAsc(routineDay.getId());
                    List<ExerciseInfoDTO> infoExercisesList = new ArrayList<>();
                    for(UserRoutineDayExercise userRoutineDayExercise : userRoutineDayExercises ) {
                        ExerciseInfoDTO exerciseInfoDTO = new ExerciseInfoDTO();
                        exerciseInfoDTO.setExerciseId(userRoutineDayExercise.getExercise().getId());
                        exerciseInfoDTO.setName(userRoutineDayExercise.getExercise().getName());
                        exerciseInfoDTO.setNumSets(userRoutineDayExercise.getSets());

                        infoExercisesList.add(exerciseInfoDTO);
                    }
                    exerciseDayDTO.setExercises(infoExercisesList);
                    exerciseDayDTOList.add(exerciseDayDTO);
                }

                routineInfo.setExerciseDays(exerciseDayDTOList);
                routinesDTO.add(routineInfo);
            }

            return routinesDTO;
        }
        else{
            return null;
        }
    }

    @Transactional
    public List<FullRoutineInfoDTO> getPublicRoutines(User user) {
        List <Routine> routines = routineRepository.getRoutinesByIsPublicIsTrueAndUserIsNot(user);
        return getRoutinesForFrontend(routines);
    }

    @Transactional
    public List<FullRoutineInfoDTO> getUserRoutines(User user) {
        List <Routine> routines = routineRepository.getRoutinesByUser(user);
        return getRoutinesForFrontend(routines);
    }


    @Transactional
    public Routine updateRoutine(FullRoutineInfoDTO routineInfo, User user) {
        Routine routine = routineRepository.findById(routineInfo.getRoutineId())
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));

        if (!routine.getUser().equals(user)) {
            throw new RuntimeException("Acceso denegado");
        }

        routine.setName(routineInfo.getName());
        routine.setDescription(routineInfo.getDescription());
        routine.setIsPublic(routineInfo.isIsPublic());
        routineRepository.save(routine);

        List<RoutineDay> existingDays = routineDayRepository.getRoutineDayByRoutine_Id(routine.getId());
        Map<Integer, RoutineDay> dayOrderMap = existingDays.stream()
                .collect(Collectors.toMap(RoutineDay::getDayOrder, d -> d));

        Set<Long> updatedDayIds = new HashSet<>();

        for (ExerciseDayDTO dayDTO : routineInfo.getExerciseDays()) {
            RoutineDay day = dayOrderMap.get(dayDTO.getOrder());

            if (day == null) {
                day = new RoutineDay(routine, dayDTO.getOrder(), dayDTO.getName());
                routineDayRepository.save(day);
            } else {
                day.setDayName(dayDTO.getName());
                routineDayRepository.save(day);
            }

            updatedDayIds.add(day.getId());

            //Update exercises
            List<UserRoutineDayExercise> existingExercises = userRoutineDayExerciseRepository.getUserRoutineDayExercisesByRoutineDay_IdOrderByExerciseOrderAsc(day.getId());

            Map<Long, UserRoutineDayExercise> existingExerciseMap = existingExercises.stream()
                    .collect(Collectors.toMap(e -> e.getExercise().getId(), e -> e));

            Set<Long> updatedExerciseIds = new HashSet<>();

            for (ExerciseInfoDTO exDTO : dayDTO.getExercises()) {
                Long exId = exDTO.getExerciseId();
                Exercise exercise = exerciseService.getExerciseById(exId)
                        .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

                if (existingExerciseMap.containsKey(exId)) {
                    UserRoutineDayExercise ex = existingExerciseMap.get(exId);
                    ex.setSets(exDTO.getNumSets());
                    userRoutineDayExerciseRepository.save(ex);
                } else {
                    UserRoutineDayExercise newEx = new UserRoutineDayExercise(user, day, exercise, exDTO.getNumSets());
                    userRoutineDayExerciseRepository.save(newEx);
                }

                updatedExerciseIds.add(exId);
            }

            //Delete exercises
            for (UserRoutineDayExercise oldEx : existingExercises) {
                if (!updatedExerciseIds.contains(oldEx.getExercise().getId())) {
                    userRoutineDayExerciseRepository.delete(oldEx);
                }
            }
        }

        //Delete days
        for (RoutineDay oldDay : existingDays) {
            if (!updatedDayIds.contains(oldDay.getId())) {
                userRoutineDayExerciseRepository.deleteUserRoutineDayExerciseByRoutineDay(oldDay);
                routineDayRepository.delete(oldDay);
            }
        }
        return routine;
    }

    @Transactional
    public UserRoutineProgress setRoutineAsActive(long routineId, User user) {
        Optional<Routine> routine = routineRepository.findById(routineId);

        if(routine.isPresent()) {
            if(routine.get().getUser().equals(user)) {
                Optional<UserRoutineProgress> optionalActiveRoutine = userRoutineProgressRepository.findById(user.getGoogleId());
                UserRoutineProgress activeRoutine;
                if(optionalActiveRoutine.isPresent()) {
                    activeRoutine = optionalActiveRoutine.get();

                }
                else{
                    activeRoutine = new UserRoutineProgress();
                    activeRoutine.setUsers(user);
                    activeRoutine.setGoogleId(user.getGoogleId());
                }
                activeRoutine.setRoutine(routine.get());
                activeRoutine.setCurrentDayOrder(1);
                activeRoutine.setLastCompleted(null);

                userRoutineProgressRepository.save(activeRoutine);
                return activeRoutine;
            }
            else{
                throw new RuntimeException("Acceso denegado");
            }
        }
        else{
            throw new RuntimeException("Acceso denegado");
        }
    }

    @Transactional
    public Set<UserRoutineDayExercise> copyRoutine(FullRoutineInfoDTO routineInfoDTO, User user) {
        Optional<Routine> routine = routineRepository.findById(routineInfoDTO.getRoutineId());
        if(routine.isPresent()) {
            routineInfoDTO.setRoutineId(0);
            routineInfoDTO.setPublic(false);
            return this.createRoutine(routineInfoDTO, user);
        }
        else{
            throw new RuntimeException("Rutina no encontrada");
        }
    }


    @Transactional
    public Routine deleteRoutine(long routineId, User user) {
        Optional<Routine> routine = routineRepository.findById(routineId);
        if(routine.isPresent()) {
            Optional<UserRoutineProgress> userActiveRoutine = userRoutineProgressRepository.findById(user.getGoogleId());
            if(userActiveRoutine.isEmpty() || userActiveRoutine.get().getRoutine().getId() != routineId){ //Checks if the routine that is going to be deleted is active or not
                userRoutineDayExerciseRepository.deleteById(routineId);
                routineDayRepository.deleteById(routineId);
                routineRepository.deleteById(routineId);
                return routine.get();
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    @Transactional
    public void changeActiveDay(User user, int newDayOrder) {
        UserRoutineProgress progress = userRoutineProgressRepository.findById(user.getGoogleId())
                .orElseThrow(() -> new RuntimeException("No hay rutina activa para el usuario"));

        Routine routine = progress.getRoutine();
        List<RoutineDay> days = routineDayRepository.getRoutineDayByRoutine_Id(routine.getId());

        boolean dayExists = days.stream().anyMatch(d -> d.getDayOrder() == newDayOrder);
        if (!dayExists) {
            throw new IllegalArgumentException("Día no válido para esta rutina");
        }

        progress.setCurrentDayOrder(newDayOrder);
        userRoutineProgressRepository.save(progress);
    }

    public boolean updateTodayWorkout(User user, ExerciseDayDTO exerciseDayDTO) {
        UserRoutineProgress userRoutineProgress = userRoutineProgressRepository.findById(user.getGoogleId()).get();
        int maxRoutineDays = routineDayRepository.findMaxDayByRoutine(userRoutineProgress.getRoutine());
        int currentDay = userRoutineProgress.getCurrentDayOrder();

        //Next training day
        if( currentDay + 1 > maxRoutineDays){
            userRoutineProgress.setCurrentDayOrder(1);
        }
        else{
            userRoutineProgress.setCurrentDayOrder(currentDay + 1);
        }
        userRoutineProgress.setLastCompleted(LocalDate.now());
        userRoutineProgressRepository.save(userRoutineProgress);

        //Update user exercises
        RoutineDay routineDay = routineDayRepository.findByRoutineAndDayOrder(userRoutineProgress.getRoutine(), currentDay)
                .orElseThrow(() -> new RuntimeException("Dia de rutina no encontrado"));
        List <ExerciseInfoDTO> exerciseInfoDTOList = exerciseDayDTO.getExercises();
        for(ExerciseInfoDTO exerciseInfoDTO : exerciseInfoDTOList){
            Optional <Exercise> exercise = exerciseService.getExerciseById(exerciseInfoDTO.getExerciseId());
            if(exercise.isPresent()){
                if(exerciseInfoDTO.getWeight() != null && !Objects.equals(exerciseInfoDTO.getWeight(), BigDecimal.ZERO) && exerciseInfoDTO.getReps() != 0){ //If there is data, modifies UserExercise
                    if(!exerciseService.updateUserExercise(user, exercise.get(), exerciseInfoDTO.getWeight(), exerciseInfoDTO.getReps(), exerciseInfoDTO.getNotes())){
                        return false;
                    }
                }

            }

        }
        return true;
    }
}
