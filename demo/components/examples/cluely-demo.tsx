"use client";

import { useState, useEffect, useRef } from "react";
import { HomeIcon, CommandIcon, ReturnIcon, ZapIcon, SendIcon } from "@/app/examples/cluely/icons";

export function CluelyDemo({
  className,
  onFocusChange
}: {
  className?: string;
  onFocusChange?: (focused: boolean) => void;
} = {}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const prevFocusedRef = useRef(isFocused);

  useEffect(() => {
    if (prevFocusedRef.current !== isFocused) {
      prevFocusedRef.current = isFocused;
      onFocusChange?.(isFocused);
    }
  }, [isFocused, onFocusChange]);

  return (
    <div className={className}>
      <svg className="border-svg">
        <rect />
      </svg>
      <div className="w-full h-full p-2">
        <div className={`w-[540px] p-4 border-[0.5px] border-[#AAAAAA]/80 rounded-2xl bg-[#1E1E24]/67 transition-all duration-150 ease-out ${isFocused ? 'h-[140px]' : 'h-[104px]'}`}>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
              <HomeIcon className="text-[#B3B3B6] hover:text-white" size={20} />
            </div>

            <div className={`relative border-[0.5px] border-[#AAAAAA]/80 rounded-lg transition-all duration-150 ease-out overflow-hidden ${isFocused ? 'h-[80px]' : 'h-[40px]'}`}>
              <div className="relative h-[40px] flex items-center px-2">
                {!value && !isFocused && (
                  <div className="absolute left-2 flex items-center pointer-events-none animate-in fade-in duration-50">
                    <div className="flex items-center gap-x-1 text-[#AAAAAE] text-sm">
                      <span>Click to type, or</span>
                      <div className="w-4 h-4 border border-[#AAAAAA]/80 rounded flex items-center justify-center">
                        <CommandIcon size={10} />
                      </div>
                      <div className="w-4 h-4 border border-[#AAAAAA]/80 rounded flex items-center justify-center">
                        <ReturnIcon size={10} />
                      </div>
                      <span className="text-[#B3B3B6]">for assist</span>
                    </div>
                  </div>
                )}
                {!value && isFocused && (
                  <div className="absolute left-2 flex items-center pointer-events-none animate-in fade-in duration-50">
                    <div className="flex items-center gap-x-1 text-[#AAAAAE] text-sm">
                      <span>Ask about your screen or conversation, or</span>
                      <div className="w-4 h-4 border border-[#AAAAAA]/80 rounded flex items-center justify-center">
                        <ReturnIcon size={10} />
                      </div>
                      <span>for Assist</span>
                    </div>
                  </div>
                )}
                <input
                  className="w-full h-full bg-transparent focus:outline-none text-sm text-neutral-100"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>

              <button
                className={`absolute right-2 w-6 h-6 bg-[#0247A6] rounded-full flex items-center justify-center transition-all duration-150 ease-out ${isFocused ? 'top-[calc(50%+7px)]' : 'top-[7px]'}`}
              >
                <SendIcon size={16} className="text-white" />
              </button>

              <div className={`px-2 text-sm flex items-center border-t-[0.5px] border-[#AAAAAA]/80 bg-[#1E1E24]/50 transition-all duration-150 ease-out overflow-hidden ${isFocused ? 'h-[40px]' : 'h-0'}`}>
                <div className="group flex items-center px-1.5 py-0.5 gap-x-1 text-[#AAAAAE] bg-[#1E1E24]/50 rounded-full">
                  <ZapIcon className="group-hover:text-white transition-colors" size={12} />
                  <span className="text-xs font-semibold group-hover:text-white transition-colors">Smart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

