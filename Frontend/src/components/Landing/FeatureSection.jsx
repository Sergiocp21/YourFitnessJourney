import React from 'react';
import { Activity, Calendar, Share2, Clock, BarChart2 } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeatureSection = () => {
    const features = [
        {
            icon: <Calendar className="text-red-500" size={24} />,
            title: "Crea Rutinas Personalizadas",
            description: "Diseña rutinas de entrenamiento personalizadas adaptadas a tus objetivos específicos y nivel de condición física."
        },
        {
            icon: <Activity className="text-red-500\" size={24} />,
            title: "Seguimiento de Progreso",
            description: "Monitorea tu rendimiento con métricas detalladas y visualizaciones de tu viaje fitness."
        },
        {
            icon: <Share2 className="text-red-500" size={24} />,
            title: "Comparte y Descubre",
            description: "Comparte tus rutinas con amigos y descubre nuevos entrenamientos de la comunidad."
        },
        {
            icon: <Clock className="text-red-500\" size={24} />,
            title: "Entrena Donde Sea",
            description: "Crea y modifica rutinas de entrenamiento en cualquier momento y lugar con nuestra app móvil."
        },
        {
            icon: <BarChart2 className="text-red-500" size={24} />,
            title: "Análisis Avanzado",
            description: "Obtén información precisa de tu rendimiento con estadísticas detalladas e informes de progreso."
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-10"></div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Eleva Tu Experiencia Fitness</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        YourFitnessJourney te proporciona todo lo que necesitas para monitorear, optimizar y compartir tu viaje fitness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;