interface HomeIconProps {
  className?: string;
  size?: number;
}

export function HomeIcon({ className, size = 24 }: HomeIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="20 20 38 42" 
      fill="currentColor"
      className={className}
    >
      <path d="M 38.77,22.21 L 38.13,22.31 L 37.53,22.54 L 36.96,22.86 L 36.41,23.25 L 35.87,23.70 L 35.35,24.17 L 34.82,24.64 L 34.28,25.09 L 33.74,25.53 L 33.20,25.95 L 32.66,26.38 L 32.12,26.80 L 31.59,27.23 L 31.06,27.67 L 30.54,28.12 L 30.03,28.59 L 29.53,29.06 L 29.02,29.54 L 28.52,30.03 L 28.01,30.52 L 27.49,31.00 L 26.95,31.47 L 26.41,31.93 L 25.87,32.40 L 25.33,32.86 L 24.81,33.33 L 24.31,33.81 L 23.84,34.31 L 23.42,34.82 L 23.03,35.37 L 22.70,35.94 L 22.42,36.53 L 22.18,37.15 L 21.99,37.79 L 21.86,38.45 L 21.77,39.14 L 21.73,39.84 L 21.72,40.56 L 21.73,41.29 L 21.76,42.02 L 21.78,42.74 L 21.81,43.46 L 21.82,44.17 L 21.84,44.88 L 21.84,45.58 L 21.84,46.28 L 21.84,46.99 L 21.84,47.69 L 21.82,48.40 L 21.81,49.11 L 21.79,49.82 L 21.77,50.55 L 21.75,51.28 L 21.74,52.01 L 21.74,52.74 L 21.76,53.46 L 21.82,54.17 L 21.90,54.86 L 22.03,55.53 L 22.20,56.17 L 22.43,56.78 L 22.72,57.36 L 23.08,57.90 L 23.52,58.39 L 24.02,58.83 L 24.58,59.22 L 25.19,59.55 L 25.84,59.82 L 26.51,60.02 L 27.20,60.15 L 27.90,60.20 L 28.61,60.20 L 29.31,60.16 L 30.02,60.09 L 30.71,60.01 L 31.40,59.93 L 32.07,59.82 L 32.68,59.61 L 33.23,59.27 L 33.70,58.78 L 34.07,58.21 L 34.34,57.57 L 34.51,56.91 L 34.59,56.24 L 34.62,55.54 L 34.60,54.83 L 34.57,54.12 L 34.55,53.39 L 34.56,52.67 L 34.61,51.96 L 34.73,51.28 L 34.92,50.65 L 35.21,50.08 L 35.62,49.58 L 36.12,49.16 L 36.70,48.82 L 37.35,48.57 L 38.03,48.41 L 38.74,48.33 L 39.46,48.35 L 40.16,48.47 L 40.83,48.67 L 41.45,48.96 L 42.00,49.34 L 42.47,49.79 L 42.83,50.31 L 43.08,50.91 L 43.23,51.55 L 43.32,52.24 L 43.34,52.96 L 43.33,53.69 L 43.31,54.42 L 43.29,55.14 L 43.29,55.85 L 43.34,56.53 L 43.46,57.20 L 43.66,57.83 L 43.97,58.44 L 44.39,58.98 L 44.89,59.43 L 45.47,59.73 L 46.10,59.90 L 46.78,59.98 L 47.47,60.04 L 48.18,60.10 L 48.89,60.16 L 49.60,60.19 L 50.31,60.18 L 51.00,60.11 L 51.68,59.96 L 52.34,59.73 L 52.96,59.44 L 53.55,59.08 L 54.08,58.66 L 54.56,58.19 L 54.97,57.67 L 55.31,57.11 L 55.58,56.52 L 55.79,55.89 L 55.94,55.24 L 56.05,54.56 L 56.12,53.87 L 56.16,53.16 L 56.17,52.44 L 56.16,51.71 L 56.14,50.98 L 56.12,50.25 L 56.09,49.53 L 56.08,48.81 L 56.06,48.10 L 56.06,47.39 L 56.05,46.69 L 56.05,45.99 L 56.06,45.28 L 56.07,44.58 L 56.08,43.87 L 56.10,43.16 L 56.12,42.44 L 56.15,41.72 L 56.17,40.99 L 56.18,40.26 L 56.16,39.54 L 56.11,38.84 L 56.01,38.16 L 55.85,37.51 L 55.63,36.88 L 55.37,36.28 L 55.06,35.70 L 54.70,35.14 L 54.29,34.61 L 53.85,34.10 L 53.37,33.61 L 52.87,33.13 L 52.35,32.66 L 51.81,32.19 L 51.27,31.73 L 50.73,31.27 L 50.20,30.80 L 49.68,30.32 L 49.17,29.83 L 48.67,29.35 L 48.16,28.87 L 47.66,28.39 L 47.15,27.93 L 46.63,27.47 L 46.09,27.04 L 45.55,26.61 L 45.00,26.19 L 44.45,25.77 L 43.91,25.35 L 43.37,24.91 L 42.85,24.46 L 42.35,23.98 L 41.85,23.51 L 41.33,23.07 L 40.75,22.70 L 40.11,22.41 L 39.44,22.25 L 38.77,22.21 Z" fillRule="evenodd"/>
    </svg>
  );
}

interface CommandIconProps {
  className?: string;
  size?: number;
}

export function CommandIcon({ className, size = 24 }: CommandIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
    </svg>
  );
}

interface ReturnIconProps {
  className?: string;
  size?: number;
}

export function ReturnIcon({ className, size = 24 }: ReturnIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 4v7a4 4 0 0 1-4 4H4"/>
      <path d="m9 10-5 5 5 5"/>
    </svg>
  );
}

interface ZapIconProps {
  className?: string;
  size?: number;
}

export function ZapIcon({ className, size = 24 }: ZapIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="2 1 20 22" 
      fill="currentColor"
      className={className}
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  );
}

interface SendIconProps {
  className?: string;
  size?: number;
}

export function SendIcon({ className, size = 24 }: SendIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 30 78 66" 
      fill="currentColor" 
      className={className} 
    > 
      <path d="M308 220 c34 -16 66 -30 72 -30 5 0 18 -4 28 -9 9 -5 55 -28 102 -51 98 -48 114 -60 130 -100 10 -25 9 -34 -6 -61 -16 -27 -39 -43 -114 -80 -8 -4 -70 -35 -138 -68 -143 -71 -187 -78 -221 -35 -16 21 -21 41 -21 88 0 108 -1 106 101 106 80 0 89 2 89 19 0 16 -11 19 -87 25 -49 4 -91 13 -95 19 -4 7 -8 44 -8 84 0 64 3 75 25 98 34 33 69 32 143 -5z" transform="translate(0,66) scale(0.1,-0.1)" /> 
    </svg>
  );
}
