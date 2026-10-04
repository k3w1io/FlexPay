import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { ColorValue } from 'react-native';

const paths = {
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  back: 'M19 12H5m6-6-6 6 6 6',
  home: 'M3 10 12 3l9 7v10H3zM9 20v-7h6v7',
  calendar: 'M4 7h16v14H4zM7 3v5M17 3v5M4 11h16M8 15h2M14 15h2',
  wallet: 'M20 7H4V4h14v3M4 7v13h16V7M15 11h6v5h-6z',
  user: 'M5 21v-2a7 7 0 0 1 14 0v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  clock: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M12 7v5l4 2',
  check: 'M5 12l4 4L19 6',
  leaf: 'M5 18C-1 4 9 2 21 3c-1 12-8 19-16 15zM5 18l10-9',
  train:
    'M6 4h12v14H6zM6 11h12M10 4v7M14 4v7M8 21l2-3M16 21l-2-3M9 15h.01M15 15h.01',
  people:
    'M9 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 20v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 4v3',
  pin: 'M12 21s7-8 7-13a7 7 0 0 0-14 0c0 5 7 13 7 13zM12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  shield: 'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zM8 12l3 3 5-6',
  help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01',
  chevron: 'M9 5l7 7-7 7',
  close: 'M6 6l12 12M18 6 6 18',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  refresh:
    'M20 10a8 8 0 0 0-14-5L3 8M3 3v5h5M4 14a8 8 0 0 0 14 5l3-3M21 21v-5h-5',
  bank: 'M3 9 12 3l9 6zM5 10v8M10 10v8M14 10v8M19 10v8M3 21h18',
  bell: 'M5 17h14l-2-4V9a5 5 0 0 0-10 0v4zM10 21h4',
  coffee: 'M4 8h12v10H4zM16 8h3a3 3 0 0 1 0 6h-3M3 21h15M7 2v3M12 2v3',
} as const;
export type IconName = keyof typeof paths;
export function Icon({
  name,
  size = 24,
  color = '#173c31',
}: {
  name: IconName;
  size?: number;
  color?: ColorValue;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={paths[name]}
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Rect width="40" height="40" rx="13" fill="#173c31" />
      <Path
        d="M11 26V14h19M11 20h14"
        stroke="#d9f69d"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Circle cx="28" cy="26" r="3" fill="#d9f69d" />
    </Svg>
  );
}
