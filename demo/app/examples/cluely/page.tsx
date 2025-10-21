"use client";

import { useState } from "react";
import Image from "next/image";
import { HomeIcon, CommandIcon, ReturnIcon, ZapIcon, SendIcon } from "@/app/examples/cluely/icons";
import { examples } from "@/app/examples/examples";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function CluelyBox({ 
  isFocused, 
  setIsFocused 
}: { 
  isFocused: boolean; 
  setIsFocused: (focused: boolean) => void; 
}) {
  const [value, setValue] = useState("");

  return (
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
  );
}

export default function CluelyExample() {
  const [isFocused, setIsFocused] = useState(false);
  const example = examples.cluely;

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={example.logo}
              alt={example.name}
              width={64}
              height={64}
              className="rounded-lg"
            />
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              {example.name}
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            {example.description}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div>
            <h2 className="text-sm font-medium text-neutral-900/60 dark:text-neutral-100/60 mb-2">
              Without tw-border
            </h2>
            <TooltipProvider>
              <div className="mb-4 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Problems (as of 10/21/25):</p>
                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">×</span>
                    <span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <strong className="cursor-help border-b border-dotted border-neutral-400 dark:border-neutral-500">
                            Dash cutoff at corners
                          </strong>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>The seam point at the top-left corner causes visible dash misalignment</p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">×</span>
                    <span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <strong className="cursor-help border-b border-dotted border-neutral-400 dark:border-neutral-500">
                            Uneven scaling
                          </strong>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Border stretches disproportionately when height changes, causing the bottom border to shrink</p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  </li>
                </ul>
              </div>
            </TooltipProvider>
            <div className="w-[556px] rounded-2xl overflow-hidden">
              <video 
                className="w-full h-auto"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/examples/cluely.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-neutral-900/60 dark:text-neutral-100/60 mb-2">
              With tw-border
            </h2>
            <TooltipProvider>
              <div className="mb-4 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">How tw-border solves this:</p>
                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <strong className="cursor-help border-b border-dotted border-neutral-400 dark:border-neutral-500">
                            SVG path rendering
                          </strong>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Dashes are evenly distributed around the entire perimeter</p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <strong className="cursor-help border-b border-dotted border-neutral-400 dark:border-neutral-500">
                            Container query units
                          </strong>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Dynamically recalculates dash spacing on every resize</p>
                        </TooltipContent>
                      </Tooltip>
                      {" "}(<code className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded text-xs">100cqw</code>/<code className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded text-xs">100cqh</code>)
                    </span>
                  </li>
                </ul>
              </div>
            </TooltipProvider>
            <div className={`w-[556px] transition-all duration-50 ease-in-out border-dashed border-2 border-[#525563] dash-8 dash-round rounded-3xl ${isFocused ? 'h-[156px]' : 'h-[120px]'}`}>
              <svg className="border-svg">
                <rect />
              </svg>
              <div className="p-2">
                <CluelyBox isFocused={isFocused} setIsFocused={setIsFocused} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

