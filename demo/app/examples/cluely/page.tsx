"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { examples } from "@/app/examples/examples";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CluelyDemo } from "@/components/examples/cluely-demo";

export default function CluelyExample() {
  const [isFocused, setIsFocused] = useState(false);
  const example = examples.cluely;
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1280;
  const isDark = mounted && (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark'));
  const videoSrc = isDark ? '/examples/cluely-dark.mp4' : '/examples/cluely-light.mp4';

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isMobile ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Desktop recommended
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                The Cluely example is best viewed on a larger screen
              </p>
              <Link
                href="/"
                className="inline-block px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Try Default Demo
              </Link>
            </div>
          </div>
        ) : (
          <>
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
                    key={videoSrc}
                    className="w-full h-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={videoSrc} type="video/mp4" />
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
                <CluelyDemo
                  className={`w-[556px] transition-all duration-50 ease-in-out border-dashed border-2 border-[#525563] dash-8 dash-butt rounded-3xl ${isFocused ? 'h-[156px]' : 'h-[120px]'}`}
                  onFocusChange={setIsFocused}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

