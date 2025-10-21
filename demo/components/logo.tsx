interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 304 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 304 304"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="152"
        cy="152"
        r="148"
        className="stroke-black dark:stroke-white"
        strokeWidth="8"
        strokeDasharray="64 64"
      />
    </svg>
  );
}