import React, { useState } from 'react';

const RoutineList = ({ routines, type, onAdd, onDelete, onUse, onEdit }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className="space-y-4">
            {routines.length === 0 ? (
                <p className="text-center text-gray-500 italic">No hay rutinas disponibles.</p>
            ) : (
                routines.map((routine, index) => (
                    <div
                        key={index}
                        className="border rounded p-4 shadow animate-fade-in-down cursor-pointer bg-gray-700"
                        onClick={() => toggleExpand(index)}
                    >
                        {/* Encabezado y botones - vista de escritorio */}
                        <div className="hidden md:flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{routine.name}</h2>
                                <p className="text-gray-400">{routine.description}</p>
                                <p className="text-sm text-gray-500">
                                    {routine.days.length} {routine.days.length === 1 ? 'día' : 'días'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {type === 'public' && (
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAdd(routine);
                                        }}
                                    >
                                        Añadir a mis rutinas
                                    </button>
                                )}
                                {type === 'user' && (
                                    <>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onUse(routine);
                                            }}
                                        >
                                            Usar rutina
                                        </button>
                                        <button
                                            className="bg-gray-600 text-white px-3 py-1 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(routine);
                                            }}
                                        >
                                            Editar rutina
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(routine);
                                            }}
                                        >
                                            Borrar rutina
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Vista móvil */}
                        <div className="md:hidden">
                            <h2 className="text-xl font-semibold">{routine.name}</h2>
                            <p className="text-gray-400">{routine.description}</p>
                            <p className="text-sm text-gray-500 mb-2">
                                {routine.days.length} {routine.days.length === 1 ? 'día' : 'días'}
                            </p>

                            {/* Botones solo si NO está expandido */}
                            {type === 'user' && expandedIndex !== index && (
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onUse(routine);
                                        }}
                                    >
                                        Usar rutina
                                    </button>
                                    <button
                                        className="bg-gray-600 text-white px-3 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(routine);
                                        }}
                                    >
                                        Editar rutina
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(routine);
                                        }}
                                    >
                                        Borrar rutina
                                    </button>
                                </div>
                            )}

                            {type === 'public' && (
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAdd(routine);
                                    }}
                                >
                                    Añadir a mis rutinas
                                </button>
                            )}
                        </div>

                        {/* Contenido expandido */}
                        {expandedIndex === index && (
                            <>
                                <div className="mt-4 space-y-2">
                                    {routine.days.map((day, dayIndex) => (
                                        <div key={dayIndex} className="bg-gray-500 p-3 rounded border">
                                            <h3 className="font-medium">
                                                Día {day.order}: {day.name}
                                            </h3>
                                            <ul className="list-disc pl-5">
                                                {day.exercises.map((exercise, exIndex) => (
                                                    <li key={exIndex}>
                                                        {exercise.name} - {exercise.sets} series
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Botones al final si está expandido (solo móviles) */}
                                {type === 'user' && (
                                    <div className="flex flex-col gap-2 mt-4 md:hidden">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onUse(routine);
                                            }}
                                        >
                                            Usar rutina
                                        </button>
                                        <button
                                            className="bg-gray-600 text-white px-3 py-1 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(routine);
                                            }}
                                        >
                                            Editar rutina
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(routine);
                                            }}
                                        >
                                            Borrar rutina
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default RoutineList;
