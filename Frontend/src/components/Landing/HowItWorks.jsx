import React from 'react';
import { Smartphone, UserCircle, Dumbbell, LineChart } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <UserCircle size={32} className="text-red-500" />,
            title: "Crea Tu Perfil",
            description: "Configura tu perfil con tus objetivos fitness, preferencias y métricas actuales."
        },
        {
            icon: <Dumbbell size={32} className="text-red-500" />,
            title: "Construye Tus Rutinas",
            description: "Crea rutinas personalizadas o elige entre las plantillas de la comunidad."
        },
        {
            icon: <Smartphone size={32} className="text-red-500" />,
            title: "Entrena Con La App",
            description: "Sigue tus rutinas y monitorea tu progreso en tiempo real durante los entrenamientos."
        },
        {
            icon: <LineChart size={32} className="text-red-500" />,
            title: "Monitorea Tu Progreso",
            description: "Analiza tu rendimiento y observa cómo evoluciona tu viaje fitness con el tiempo."
        }
    ];

    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900/50 to-black/30 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Cómo Funciona</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Comienza con YourFitnessJourney en cuatro simples pasos y transforma tu manera de abordar el ejercicio
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent z-0 -translate-x-8"></div>
                            )}
                            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center relative z-10">
                                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-800/50 rounded-full mb-4">
                                    {step.icon}
                                </div>
                                <span className="inline-block px-3 py-1 rounded-full bg-red-900/30 text-red-400 text-xs font-medium mb-3">
                                    Paso {index + 1}
                                </span>
                                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;