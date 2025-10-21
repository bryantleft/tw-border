"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { Check, Copy, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { codeToHtml } from "shiki";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoExamples, DemoExampleKey, CluelyDemo, DefaultDemo } from "@/components/examples";

enum Example {
  Default = "default",
  Cluely = "cluely",
}

enum Linecap {
  Round = "round",
  Butt = "butt",
  Square = "square",
}

enum AnimationMode {
  Off = "off",
  Always = "always",
  Hover = "hover",
}

enum ResizeHandle {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

type Config = {
  borderWidth: number;
  borderColor: string;
  dashSize: number;
  linecap: Linecap;
  radius: string;
  animationMode: AnimationMode;
};

const borderWidths = [1, 2, 3, 4] as const;

const borderColors = [
  { name: "Black", value: "black" },
  { name: "Gray", value: "gray" },
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
] as const;

const dashSizes = [2, 4, 6, 8, 12] as const;

const radiusOptions = [
  { label: "None", value: "none" },
  { label: "XS", value: "xs" },
  { label: "SM", value: "sm" },
  { label: "MD", value: "md" },
  { label: "LG", value: "lg" },
  { label: "XL", value: "xl" },
  { label: "2XL", value: "2xl" },
  { label: "3XL", value: "3xl" },
  { label: "Full", value: "full" },
] as const;

const classMappers = {
  radius: (radius: string) => {
    const map: Record<string, string> = {
      none: "rounded-none", xs: "rounded-xs", sm: "rounded-sm", md: "rounded-md",
      lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl", "3xl": "rounded-3xl",
      "4xl": "rounded-4xl", full: "rounded-full"
    };
    return map[radius] || "rounded-none";
  },

  linecap: (linecap: Linecap) => {
    const map: Record<Linecap, string> = {
      [Linecap.Round]: "dash-round",
      [Linecap.Square]: "dash-square",
      [Linecap.Butt]: "dash-butt"
    };
    return map[linecap];
  },

  borderColor: (color: string) => {
    const map: Record<string, string> = {
      black: "border-black", gray: "border-neutral-500", red: "border-red-500",
      blue: "border-blue-500", green: "border-green-500"
    };
    return map[color] || "border-black";
  },

  bgColor: (color: string) => {
    const map: Record<string, string> = {
      black: "bg-black", gray: "bg-neutral-500", red: "bg-red-500",
      blue: "bg-blue-500", green: "bg-green-500"
    };
    return map[color] || "bg-black";
  },

  borderWidth: (width: number) => {
    const map: Record<number, string> = {
      1: "border", 2: "border-2", 3: "border-3", 4: "border-4"
    };
    return map[width] || `border-[${width}px]`;
  },

  dashSize: (size: number) => {
    const map: Record<number, string> = {
      2: "dash-2", 3: "dash-3", 4: "dash-4", 6: "dash-6",
      8: "dash-8", 12: "dash-12", 24: "dash-24"
    };
    return map[size] || `dash-[${size}px]`;
  }
};

const buildClassName = (config: Config): string => {
  const classes = [
    "w-full", "h-full", "bg-transparent", "border-dashed",
    classMappers.borderWidth(config.borderWidth),
    classMappers.borderColor(config.borderColor),
    classMappers.dashSize(config.dashSize),
    classMappers.linecap(config.linecap),
    classMappers.radius(config.radius),
  ];

  if (config.animationMode === AnimationMode.Always) classes.push("border-animate");
  else if (config.animationMode === AnimationMode.Hover) classes.push("hover:border-animate");

  return classes.join(" ");
};

type ResizingState = {
  active: boolean;
  handle: ResizeHandle | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

const exampleConfigs: Record<Example, { config: Config; dimensions: { width: number; height: number } }> = {
  [Example.Default]: {
    config: {
      borderWidth: 2,
      borderColor: "blue",
      dashSize: 6,
      linecap: Linecap.Round,
      radius: "full",
      animationMode: AnimationMode.Always,
    },
    dimensions: { width: 320, height: 240 },
  },
  [Example.Cluely]: {
    config: {
      borderWidth: 2,
      borderColor: "gray",
      dashSize: 8,
      linecap: Linecap.Butt,
      radius: "3xl",
      animationMode: AnimationMode.Off,
    },
    dimensions: { width: 588, height: 152 },
  },
};

// Resize button component
const ResizeButton = ({
  handle,
  onStart
}: {
  handle: ResizeHandle;
  onStart: (handle: ResizeHandle, e: React.MouseEvent) => void;
}) => {
  const positions = {
    [ResizeHandle.Top]: "top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize",
    [ResizeHandle.Right]: "right-2 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-ew-resize",
    [ResizeHandle.Bottom]: "bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize",
    [ResizeHandle.Left]: "left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize",
  };

  return (
    <button
      onMouseDown={(e) => onStart(handle, e)}
      className={`absolute ${positions[handle]} w-2 h-2 bg-white dark:bg-neutral-950 border border-neutral-900 dark:border-neutral-100 rounded-full hover:scale-125 transition-all z-10 opacity-0 group-hover:opacity-100`}
      aria-label={`Resize ${handle}`}
    />
  );
};

// Control button component
const ControlButton = <T,>({
  value,
  currentValue,
  onClick,
  children,
  title,
}: {
  value: T;
  currentValue: T;
  onClick: (value: T) => void;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    onClick={() => onClick(value)}
    title={title}
    className={`w-7 h-7 text-xs font-medium rounded border transition-all flex items-center justify-center ${currentValue === value
      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
      : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
      }`}
  >
    {children}
  </button>
);

export default function Home() {
  const [selectedExample, setSelectedExample] = useState<Example>(Example.Default);
  const [config, setConfig] = useState<Config>(exampleConfigs[Example.Default].config);
  const [dimensions, setDimensions] = useState(exampleConfigs[Example.Default].dimensions);
  const [resizing, setResizing] = useState<ResizingState | null>(null);
  const [cluelyFocused, setCluelyFocused] = useState(false);
  const [toolbarExpanded, setToolbarExpanded] = useState(true);

  // Update dimensions and config when switching examples
  useEffect(() => {
    const example = exampleConfigs[selectedExample];
    setDimensions(example.dimensions);
    setConfig(example.config);
  }, [selectedExample]);

  // Handle Cluely focus change - adjust height by 36px
  const handleCluelyFocusChange = useCallback((focused: boolean) => {
    setCluelyFocused(focused);
    setDimensions((prev) => ({
      ...prev,
      height: focused ? prev.height + 36 : prev.height - 36,
    }));
  }, []);

  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  const className = useMemo(() => buildClassName(config), [config]);

  const snippet = useMemo(() => {
    const snippetClassName = className
      .replace('w-full', `w-[${dimensions.width - 32}px]`)
      .replace('h-full', `h-[${dimensions.height - 32}px]`);

    if (selectedExample === Example.Cluely) {
      return `<div className="${snippetClassName}">
  <svg className="border-svg">
    <rect />
  </svg>
  <div className="w-full h-full flex items-center justify-center p-2">
    {/* Cluely chat input component (540px wide) */}
  </div>
</div>`;
    }

    return `<div className="${snippetClassName}">
  <svg className="border-svg">
    <rect />
  </svg>
</div>`;
  }, [className, dimensions, selectedExample]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const html = await codeToHtml(snippet, {
          lang: "tsx",
          theme: "github-dark",
        });
        if (!cancelled) setHighlighted(html);
      } catch {
        if (!cancelled) setHighlighted(`<pre><code>${snippet}</code></pre>`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [snippet]);

  const updateConfig = (updates: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateExample = (direction: 'prev' | 'next') => {
    const examples = Object.values(Example);
    const currentIndex = examples.indexOf(selectedExample);
    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + examples.length) % examples.length
      : (currentIndex + 1) % examples.length;
    setSelectedExample(examples[newIndex]);
  };

  const handleResizeStart = (handle: ResizeHandle, e: React.MouseEvent) => {
    e.preventDefault();
    setResizing({
      active: true,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: dimensions.width,
      startHeight: dimensions.height,
    });
  };

  useEffect(() => {
    if (!resizing?.active) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;

      const deltaX = e.clientX - resizing.startX;
      const deltaY = e.clientY - resizing.startY;

      // Set minimum dimensions based on selected example
      const minWidth = selectedExample === Example.Cluely ? 588 : 200;
      const minHeight = selectedExample === Example.Cluely ? (cluelyFocused ? 188 : 152) : 150;

      if (resizing.handle === ResizeHandle.Top) {
        const newHeight = Math.max(minHeight, Math.min(600, resizing.startHeight - deltaY * 2));
        setDimensions((prev) => ({ ...prev, height: newHeight }));
      } else if (resizing.handle === ResizeHandle.Bottom) {
        const newHeight = Math.max(minHeight, Math.min(600, resizing.startHeight + deltaY * 2));
        setDimensions((prev) => ({ ...prev, height: newHeight }));
      } else if (resizing.handle === ResizeHandle.Left) {
        const newWidth = Math.max(minWidth, Math.min(800, resizing.startWidth - deltaX * 2));
        setDimensions((prev) => ({ ...prev, width: newWidth }));
      } else if (resizing.handle === ResizeHandle.Right) {
        const newWidth = Math.max(minWidth, Math.min(800, resizing.startWidth + deltaX * 2));
        setDimensions((prev) => ({ ...prev, width: newWidth }));
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, selectedExample, cluelyFocused]);

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className={`flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-300 ${toolbarExpanded ? 'min-h-[calc(100vh-3.5rem-5rem)]' : 'min-h-[calc(100vh-3.5rem-2.5rem)]'}`}>
        {selectedExample === Example.Cluely && typeof window !== 'undefined' && window.innerWidth < 1024 ? (
          <div className="text-center px-6">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Desktop recommended
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
              The Cluely demo is best viewed on a larger screen
            </p>
            <button
              onClick={() => setSelectedExample(Example.Default)}
              className="px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              View Default Demo
            </button>
          </div>
        ) : (
          <div className="relative">
            {resizing?.handle && (resizing.handle === ResizeHandle.Left || resizing.handle === ResizeHandle.Right) && (
              <>
                <div className="absolute h-px bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                  style={{ bottom: '-24px', left: '16px', width: `${dimensions.width - 32}px` }} />
                <div className="absolute pointer-events-none"
                  style={{ bottom: '-22px', left: `${dimensions.width / 2}px`, transform: 'translate(-50%, 50%)' }}>
                  <span className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 px-2 py-0.5">
                    {dimensions.width - 32}px
                  </span>
                </div>
                <div className="absolute w-px h-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                  style={{ bottom: '-24px', left: '16px', transform: 'translateY(50%)' }} />
                <div className="absolute w-px h-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                  style={{ bottom: '-24px', left: `${dimensions.width - 16}px`, transform: 'translateY(50%)' }} />
              </>
            )}

            {resizing?.handle && (resizing.handle === ResizeHandle.Top || resizing.handle === ResizeHandle.Bottom) && (
              <>
                <div className="absolute w-px bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                  style={{ right: '-25px', top: '16px', height: `${dimensions.height - 32}px` }} />
                <div className="absolute pointer-events-none"
                  style={{ right: '-23px', top: `${dimensions.height / 2}px`, transform: 'translate(50%, -50%)' }}>
                  <div className="-rotate-90">
                    <span className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 px-2 py-0.5 whitespace-nowrap inline-block">
                      {dimensions.height - 32}px
                    </span>
                  </div>
                </div>
                <div className="absolute h-px w-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                  style={{ right: '-24px', top: '16px', transform: 'translateX(50%)' }} />
                <div className="absolute h-px w-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                  style={{ right: '-24px', top: `${dimensions.height - 16}px`, transform: 'translateX(50%)' }} />
              </>
            )}

            <div
              className="group relative border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-4"
              style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
            >
              {Object.values(ResizeHandle).map((handle) => (
                <ResizeButton key={handle} handle={handle} onStart={handleResizeStart} />
              ))}
              <div className="w-full h-full">
                {selectedExample === Example.Cluely ? (
                  <CluelyDemo className={className} onFocusChange={handleCluelyFocusChange} />
                ) : (
                  <DefaultDemo className={className} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`fixed left-0 right-0 flex justify-center pb-4 px-4 transition-all duration-300 ${toolbarExpanded ? 'bottom-[16rem] sm:bottom-[12rem] lg:bottom-[8rem]' : 'bottom-16'}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateExample('prev')}
            className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Previous example"
          >
            <ChevronLeft size={16} className="text-neutral-600 dark:text-neutral-400" />
          </button>

          <div className="flex flex-col items-center gap-1">
            <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {demoExamples[selectedExample as DemoExampleKey].name}
            </span>
            <button
              onClick={() => setShowCode(true)}
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-4"
            >
              View Code
            </button>
          </div>

          <button
            onClick={() => navigateExample('next')}
            className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Next example"
          >
            <ChevronRight size={16} className="text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>

      {showCode && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowCode(false)}>
          <div className="bg-white dark:bg-neutral-950 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-neutral-200 dark:border-neutral-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Code</h3>
              <button
                onClick={copyCode}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(80vh-4rem)]">
              <div className="bg-neutral-900">
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                      .shiki { counter-reset: line; padding: 1.5rem; margin: 0; }
                      .shiki code { display: flex; flex-direction: column; }
                      .shiki .line { 
                        line-height: 1.6; 
                        font-size: 0.8125rem;
                      }
                      .shiki .line::before { 
                        counter-increment: line; 
                        content: counter(line); 
                        display: inline-block; 
                        width: 2rem; 
                        margin-right: 1rem; 
                        color: rgba(255,255,255,0.3); 
                        text-align: right; 
                        user-select: none;
                      }
                      .shiki span { white-space: pre-wrap; word-break: break-word; }
                      @media (min-width: 640px) {
                        .shiki .line { font-size: 0.875rem; }
                      }
                    `,
                  }}
                />
                <div
                  className="[&_pre]:m-0 [&_pre]:p-0 [&_code]:font-mono"
                  dangerouslySetInnerHTML={{ __html: highlighted || `<pre><code>${snippet}</code></pre>` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed left-0 right-0 flex justify-center transition-transform duration-300 ease-in-out bottom-0 ${!toolbarExpanded && 'translate-y-[calc(100%)]'}`}>
        <div className="relative w-full lg:w-auto bg-white dark:bg-neutral-950 border-t lg:border-x border-neutral-200 dark:border-neutral-800 shadow-lg lg:rounded-t-xl">
          <button
            onClick={() => setToolbarExpanded(!toolbarExpanded)}
            className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-full px-4 py-2 bg-white dark:bg-neutral-950 border-t border-x border-neutral-200 dark:border-neutral-800 rounded-t-lg shadow-md flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors z-10"
            aria-label="Toggle toolbar"
          >
            {toolbarExpanded ? <ChevronDown size={16} className="text-neutral-600 dark:text-neutral-400" /> : <ChevronUp size={16} className="text-neutral-600 dark:text-neutral-400" />}
          </button>
          <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 lg:gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                  Width
                </label>
                <div className="flex gap-1">
                  {borderWidths.map((width) => (
                    <ControlButton
                      key={width}
                      value={width}
                      currentValue={config.borderWidth}
                      onClick={(w) => updateConfig({ borderWidth: w })}
                    >
                      {width}
                    </ControlButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                  Color
                </label>
                <div className="flex gap-1">
                  {borderColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateConfig({ borderColor: color.value })}
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      title={color.name}
                    >
                      <div className={`w-6 h-6 rounded-full ${classMappers.bgColor(color.value)} border-2 transition-all ${config.borderColor === color.value
                        ? "border-neutral-900 dark:border-neutral-100"
                        : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                        }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                  Dash
                </label>
                <div className="flex gap-1">
                  {Object.values(Linecap).map((cap) => (
                    <button
                      key={cap}
                      onClick={() => updateConfig({ linecap: cap as Linecap })}
                      className={`h-7 px-2 text-xs font-medium rounded border capitalize transition-all ${config.linecap === cap
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                        }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                  Size
                </label>
                <div className="flex gap-1">
                  {dashSizes.map((size) => (
                    <ControlButton
                      key={size}
                      value={size}
                      currentValue={config.dashSize}
                      onClick={(s) => updateConfig({ dashSize: s })}
                    >
                      {size}
                    </ControlButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                  Radius
                </label>
                <Select value={config.radius} onValueChange={(value) => updateConfig({ radius: value })}>
                  <SelectTrigger size="sm" className="w-20 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="item-aligned" side="top" align="center" sideOffset={8} avoidCollisions={false}>
                    {radiusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                  Animate
                </label>
                <div className="flex gap-1">
                  {Object.values(AnimationMode).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateConfig({ animationMode: mode as AnimationMode })}
                      className={`h-7 px-2 text-xs font-medium rounded border capitalize transition-all ${config.animationMode === mode
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                        }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
