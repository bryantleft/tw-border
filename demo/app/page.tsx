"use client";

import { useMemo, useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { codeToHtml } from "shiki";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const toRadiusClass = (radius: string): string => {
  if (radius === "none") return "rounded-none";
  if (radius === "xs") return "rounded-xs";
  if (radius === "sm") return "rounded-sm";
  if (radius === "md") return "rounded-md";
  if (radius === "lg") return "rounded-lg";
  if (radius === "xl") return "rounded-xl";
  if (radius === "2xl") return "rounded-2xl";
  if (radius === "3xl") return "rounded-3xl";
  if (radius === "4xl") return "rounded-4xl";
  if (radius === "full") return "rounded-full";
  return "rounded-none";
};

const toLinecapClass = (linecap: Linecap): string => {
  if (linecap === "round") return "dash-round";
  if (linecap === "square") return "dash-square";
  return "dash-butt";
};

const toBorderColorClass = (color: string): string => {
  if (color === "black") return "border-black";
  if (color === "gray") return "border-neutral-500";
  if (color === "red") return "border-red-500";
  if (color === "blue") return "border-blue-500";
  if (color === "green") return "border-green-500";
  return "border-black";
};

const toBgColorClass = (color: string): string => {
  if (color === "black") return "bg-black";
  if (color === "gray") return "bg-neutral-500";
  if (color === "red") return "bg-red-500";
  if (color === "blue") return "bg-blue-500";
  if (color === "green") return "bg-green-500";
  return "bg-black";
};

const toBorderWidthClass = (width: number): string => {
  if (width === 1) return "border";
  if (width === 2) return "border-2";
  if (width === 3) return "border-3";
  if (width === 4) return "border-4";
  return `border-[${width}px]`;
};

const toDashSizeClass = (size: number): string => {
  if (size === 2) return "dash-2";
  if (size === 3) return "dash-3";
  if (size === 4) return "dash-4";
  if (size === 6) return "dash-6";
  if (size === 8) return "dash-8";
  if (size === 12) return "dash-12";
  if (size === 24) return "dash-24";
  return `dash-[${size}px]`;
};

const buildClassName = (config: Config): string => {
  const borderWidthClass = toBorderWidthClass(config.borderWidth);
  const borderColorClass = toBorderColorClass(config.borderColor);
  const dashClass = toDashSizeClass(config.dashSize);
  const linecapClass = toLinecapClass(config.linecap);
  const radiusClass = toRadiusClass(config.radius);

  const classes = [
    "w-full",
    "h-full",
    "bg-transparent",
    "border-dashed",
    borderWidthClass,
    borderColorClass,
    dashClass,
    linecapClass,
    radiusClass,
  ];

  if (config.animationMode === AnimationMode.Always) {
    classes.push("border-animate");
  } else if (config.animationMode === AnimationMode.Hover) {
    classes.push("hover:border-animate");
  }

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

export default function Home() {
  const [config, setConfig] = useState<Config>({
    borderWidth: 2,
    borderColor: "blue",
    dashSize: 6,
    linecap: Linecap.Round,
    radius: "full",
    animationMode: AnimationMode.Always,
  });

  const [dimensions, setDimensions] = useState({ width: 400, height: 280 });
  const [resizing, setResizing] = useState<ResizingState | null>(null);

  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  const className = useMemo(() => buildClassName(config), [config]);

  const snippet = useMemo(() => {
    const snippetClassName = className
      .replace('w-full', `w-[${dimensions.width - 32}px]`)
      .replace('h-full', `h-[${dimensions.height - 32}px]`);
    
    return `<div className="${snippetClassName}">
  <svg className="border-svg">
    <rect />
  </svg>
</div>`;
  }, [className, dimensions]);

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

      if (resizing.handle === ResizeHandle.Top) {
        const newHeight = Math.max(150, Math.min(600, resizing.startHeight - deltaY * 2));
        setDimensions((prev) => ({ ...prev, height: newHeight }));
      } else if (resizing.handle === ResizeHandle.Bottom) {
        const newHeight = Math.max(150, Math.min(600, resizing.startHeight + deltaY * 2));
        setDimensions((prev) => ({ ...prev, height: newHeight }));
      } else if (resizing.handle === ResizeHandle.Left) {
        const newWidth = Math.max(200, Math.min(800, resizing.startWidth - deltaX * 2));
        setDimensions((prev) => ({ ...prev, width: newWidth }));
      } else if (resizing.handle === ResizeHandle.Right) {
        const newWidth = Math.max(200, Math.min(800, resizing.startWidth + deltaX * 2));
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
  }, [resizing]);

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem-5rem)] px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {resizing?.handle && (resizing.handle === ResizeHandle.Left || resizing.handle === ResizeHandle.Right) && (
            <>
              <div 
                className="absolute h-px bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                style={{ 
                  bottom: '-24px',
                  left: '16px',
                  width: `${dimensions.width - 32}px`
                }}
              />
              <div 
                className="absolute pointer-events-none"
                style={{
                  bottom: '-22px',
                  left: `${dimensions.width / 2}px`,
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <span className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 px-2 py-0.5">
                  {dimensions.width - 32}px
                </span>
              </div>
              <div className="absolute w-px h-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none" style={{ bottom: '-24px', left: '16px', transform: 'translateY(50%)' }} />
              <div className="absolute w-px h-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none" style={{ bottom: '-24px', left: `${dimensions.width - 16}px`, transform: 'translateY(50%)' }} />
            </>
          )}
          
          {resizing?.handle && (resizing.handle === ResizeHandle.Top || resizing.handle === ResizeHandle.Bottom) && (
            <>
              <div 
                className="absolute w-px bg-neutral-900 dark:bg-neutral-100 pointer-events-none"
                style={{ 
                  right: '-25px',
                  top: '16px',
                  height: `${dimensions.height - 32}px`
                }}
              />
              <div 
                className="absolute pointer-events-none"
                style={{
                  right: '-23px',
                  top: `${dimensions.height / 2}px`,
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="-rotate-90">
                  <span className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 px-2 py-0.5 whitespace-nowrap inline-block">
                    {dimensions.height - 32}px
                  </span>
                </div>
              </div>
              <div className="absolute h-px w-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none" style={{ right: '-24px', top: '16px', transform: 'translateX(50%)' }} />
              <div className="absolute h-px w-3 bg-neutral-900 dark:bg-neutral-100 pointer-events-none" style={{ right: '-24px', top: `${dimensions.height - 16}px`, transform: 'translateX(50%)' }} />
            </>
          )}

          <div
            className="group relative border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-4"
            style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
          >

          <button
            onMouseDown={(e) => handleResizeStart(ResizeHandle.Top, e)}
            className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-neutral-950 border border-neutral-900 dark:border-neutral-100 rounded-full cursor-ns-resize hover:scale-125 transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Resize height"
          />
          <button
            onMouseDown={(e) => handleResizeStart(ResizeHandle.Right, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white dark:bg-neutral-950 border border-neutral-900 dark:border-neutral-100 rounded-full cursor-ew-resize hover:scale-125 transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Resize width"
          />
          <button
            onMouseDown={(e) => handleResizeStart(ResizeHandle.Bottom, e)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white dark:bg-neutral-950 border border-neutral-900 dark:border-neutral-100 rounded-full cursor-ns-resize hover:scale-125 transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Resize height"
          />
          <button
            onMouseDown={(e) => handleResizeStart(ResizeHandle.Left, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-neutral-950 border border-neutral-900 dark:border-neutral-100 rounded-full cursor-ew-resize hover:scale-125 transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Resize width"
          />
          
          <div className="w-full h-full">
            <div className={className}>
              <svg className="border-svg">
                <rect />
              </svg>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="fixed bottom-[8rem] left-0 right-0 flex justify-center pb-4">
        <button
          onClick={() => setShowCode(true)}
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-4"
        >
          View Code
        </button>
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

      <div className="fixed bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full lg:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white dark:bg-neutral-950 border-t lg:border-x border-neutral-200 dark:border-neutral-800 shadow-lg lg:rounded-t-xl">
          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-900/60 dark:text-neutral-100/60 whitespace-nowrap">
                Width
              </label>
              <div className="flex gap-1">
                {borderWidths.map((width) => (
                  <button
                    key={width}
                    onClick={() => updateConfig({ borderWidth: width })}
                    className={`w-7 h-7 text-xs font-medium rounded border transition-all flex items-center justify-center ${
                      config.borderWidth === width
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                    }`}
                  >
                    {width}
                  </button>
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
                    <div
                      className={`w-6 h-6 rounded-full ${toBgColorClass(color.value)} border-2 transition-all ${
                        config.borderColor === color.value
                          ? "border-neutral-900 dark:border-neutral-100"
                          : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                      }`}
                    />
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
                    className={`h-7 px-2 text-xs font-medium rounded border capitalize transition-all ${
                      config.linecap === cap
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
                  <button
                    key={size}
                    onClick={() => updateConfig({ dashSize: size })}
                    className={`w-7 h-7 text-xs font-medium rounded border transition-all flex items-center justify-center ${
                      config.dashSize === size
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                    }`}
                  >
                    {size}
                  </button>
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
                    className={`h-7 px-2 text-xs font-medium rounded border capitalize transition-all ${
                      config.animationMode === mode
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
  );
}
