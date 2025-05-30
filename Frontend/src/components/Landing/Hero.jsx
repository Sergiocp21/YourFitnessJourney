import { useEffect, useState } from 'react';
import { ArrowRight, Dumbbell } from 'lucide-react';
import LandingButton from './LandingButton';
import { getUserCount } from '../../api';



const Hero = () => {

    const [userCount, setUserCount] = useState(0);

    const fetchUserCount = async () => {
        try {
            const count = await getUserCount();
            if (typeof count === 'number') {
                setUserCount(count);
            }
        } catch (error) {
            console.error('Error al obtener número de usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUserCount();
        const interval = setInterval(fetchUserCount, 60000); // Each minute
        return () => clearInterval(interval); // Cleanup
    }, []);

    return (
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                        <Dumbbell size={16} className="text-red-500" />
                        <span className="text-white/90 text-sm font-medium">Tu viaje fitness comienza aquí</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Transforma Tu Viaje <span className="text-red-500">Fitness</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
                        Crea, monitorea y comparte tus rutinas de entrenamiento. Mantén la motivación con seguimiento en tiempo real y conéctate con una comunidad de entusiastas del fitness.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <LandingButton className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                            Empezar Ahora
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </LandingButton>
                    </div>

                    <div className="mt-12 flex items-center justify-center">
                        {/* Para poner las imagenes de los usuarios
                        <div className="flex -space-x-2">

                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-red-800 overflow-hidden">
                                    <img
                                        src={`https://images.pexels.com/photos/13941${i + 95}/pexels-photo-13941${i + 95}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1`}
                                        alt={`Usuario ${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}

                        </div>
                    */}
                        <div className="ml-4 text-sm text-gray-400">
                            <span className="font-semibold text-white">+{userCount}</span> deportistas han empezado su camino en YourFitnessJourney
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;