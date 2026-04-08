"use client";

import {ClipboardEvent, KeyboardEvent, useEffect, useRef, useState} from "react";

type TokenInputProps = {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
};

const TokenInput = ({length = 4, value = "", onChange, disabled = false}: TokenInputProps) => {
    const [digits, setDigits] = useState<string[]>(() => Array.from({length}, (_, index) => value[index] ?? ""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        const nextDigits = Array.from({length}, (_, index) => value[index] ?? "");
        setDigits((currentDigits) => {
            if (currentDigits.join("") === nextDigits.join("")) {
                return currentDigits;
            }

            return nextDigits;
        });
    }, [length, value]);

    const updateDigits = (nextDigits: string[]) => {
        setDigits(nextDigits);
        onChange?.(nextDigits.join(""));
    };

    const focusInput = (index: number) => {
        inputRefs.current[index]?.focus();
        inputRefs.current[index]?.select();
    };

    const handleChange = (index: number, nextValue: string) => {
        const sanitized = nextValue.replace(/\s/g, "");

        if (!sanitized) {
            const nextDigits = [...digits];
            nextDigits[index] = "";
            updateDigits(nextDigits);
            return;
        }

        const nextDigits = [...digits];
        const incomingChars = sanitized.slice(0, length - index).split("");

        incomingChars.forEach((char, offset) => {
            nextDigits[index + offset] = char;
        });

        updateDigits(nextDigits);

        const nextIndex = Math.min(index + incomingChars.length, length - 1);
        focusInput(nextIndex);
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !digits[index] && index > 0) {
            event.preventDefault();
            focusInput(index - 1);
            return;
        }

        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            focusInput(index - 1);
            return;
        }

        if (event.key === "ArrowRight" && index < length - 1) {
            event.preventDefault();
            focusInput(index + 1);
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedValue = event.clipboardData.getData("text").replace(/\s/g, "").slice(0, length);

        if (!pastedValue) {
            return;
        }

        const nextDigits = Array.from({length}, (_, index) => pastedValue[index] ?? "");
        updateDigits(nextDigits);
        focusInput(Math.min(pastedValue.length - 1, length - 1));
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(node) => {
                            inputRefs.current[index] = node;
                        }}
                        type="text"
                        inputMode="text"
                        autoComplete="one-time-code"
                        maxLength={length}
                        value={digit}
                        disabled={disabled}
                        onChange={(event) => handleChange(index, event.target.value)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        onPaste={handlePaste}
                        className="h-13 w-full rounded-lg border border-[#112211]/20 bg-white text-center text-lg font-semibold text-[#112211] outline-none transition-colors focus:border-[#8DD3BB] disabled:cursor-not-allowed disabled:bg-[#112211]/5"
                    />
                ))}
            </div>
        </div>
    );
};
export default TokenInput
