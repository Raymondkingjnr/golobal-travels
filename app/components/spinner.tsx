export  const Spinner = () => {
    return (
        <div className="flex items-center justify-center py-10">
            <div className="relative w-12 h-12">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>

                {/* Inner pulse */}
                <div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse"></div>
            </div>
        </div>
    );
};

