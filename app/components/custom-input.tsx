export const FloatingInput = ({label, placeholder, type = "text", value, onChange, error}: {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    error?: string;
    onChange?: (value: string) => void;
})=> {
    return (
        <div className="relative border border-[#112211]/20 rounded-lg px-3 pt-5 pb-2 focus-within:border-[#8DD3BB] transition-colors">
            <label className="absolute top-1.5 left-3 text-[10px] text-[#112211]/50 font-medium tracking-wide">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                placeholder={placeholder}
                className="w-full text-sm text-[#112211] placeholder-[#112211]/30 bg-transparent outline-none"
            />
            {error && (
                <p className="text-sm text-[#FF8682] mt-1">{error}</p>
            )}
        </div>
    );
}