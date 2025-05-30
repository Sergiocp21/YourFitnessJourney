import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import LandingButton from './LandingButton';

const CallToAction = () => {
    const benefits = [
        "Crea rutinas de entrenamiento ilimitadas",
        "Seguimiento de progreso con análisis detallado",
        "Comparte y descubre nuevas ideas de entrenamiento",
        "Entrena en cualquier lugar con rutinas sobre la marcha"
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-gray-900/50 to-black/30 z-0"></div>

            {/* Refined background elements */}
            <div
                className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/5 rounded-full blur-[100px]"
                style={{ animationDuration: '8s' }}
            ></div>
            <div
                className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-red-800/5 rounded-full blur-[100px]"
                style={{ animationDuration: '10s' }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 shadow-xl shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-300 hover:text-red-500">¿Listo para Transformar tu Viaje Fitness?</h2>
                            <p className="text-gray-300 mb-8">
                                Únete a miles de usuarios que ya han revolucionado su experiencia de entrenamiento con YourFitnessJourney.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center text-gray-300 transform transition-all duration-300 hover:translate-x-2"
                                    >
                                        <CheckCircle size={18} className="text-red-500 mr-3 animate-pulse" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <LandingButton className="group px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/20">
                                Empezar Ahora
                                <ArrowRight
                                    size={18}
                                    className="transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                                />
                            </LandingButton>
                        </div>

                        <div className="hidden md:block relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-xl transition-all duration-300 group-hover:from-red-900/30"></div>
                            <img
                                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Seguimiento Fitness"
                                className="rounded-xl transform transition-all duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;