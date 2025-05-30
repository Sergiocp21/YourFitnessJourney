const FeatureCard = ({ icon, title, description, delay = 0 }) => {
    return (
        <div
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300 group"
            style={{
                animationDelay: `${delay}s`,
            }}
        >
            <div className="p-3 bg-gray-800/50 rounded-lg inline-flex mb-4 group-hover:bg-red-900/20 transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
};

export default FeatureCard;