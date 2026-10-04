import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

// Bundled vector art keeps the demo sharp and available without a network.
export function JourneyArt({ large = false }: { large?: boolean }) {
  return (
    <Svg
      width="100%"
      height={large ? 235 : 175}
      viewBox="0 0 360 210"
      accessibilityLabel="Illustration of homes, green space and a tram on a quieter commute"
    >
      <Rect width="360" height="210" rx="24" fill="#e5efd6" />
      <Circle cx="287" cy="47" r="27" fill="#f7cd73" />
      <Path d="M0 141Q60 78 143 119T360 102V210H0" fill="#c5d9b5" />
      <Path
        d="M0 191Q111 104 230 159T380 125"
        stroke="#f8faf1"
        strokeWidth="45"
        fill="none"
      />
      <Path
        d="M0 191Q111 104 230 159T380 125"
        stroke="#91a390"
        strokeWidth="2"
        strokeDasharray="7 10"
        fill="none"
      />
      <G transform="translate(34 51)">
        <Rect x="3" y="26" width="54" height="57" rx="2" fill="#faf9ec" />
        <Path d="M-3 28 30 0l33 28" fill="#477564" />
        <Rect x="22" y="50" width="15" height="33" fill="#739d7e" />
        <Rect x="11" y="36" width="12" height="11" rx="2" fill="#badfd7" />
        <Rect x="36" y="36" width="12" height="11" rx="2" fill="#badfd7" />
      </G>
      <G transform="translate(252 77)">
        <Rect width="52" height="61" rx="4" fill="#ebe5d2" />
        <Rect x="-4" y="-9" width="60" height="12" rx="3" fill="#315d50" />
        {[9, 28].map((x) =>
          [11, 30].map((y) => (
            <Rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="12"
              height="12"
              rx="2"
              fill="#87af9d"
            />
          )),
        )}
        <Rect x="20" y="47" width="14" height="14" fill="#315d50" />
      </G>
      <G transform="translate(139 113) rotate(7)">
        <Rect width="81" height="32" rx="10" fill="#244b3d" />
        <Rect x="7" y="5" width="21" height="13" rx="3" fill="#c2dec6" />
        <Rect x="32" y="5" width="17" height="13" rx="2" fill="#c2dec6" />
        <Rect x="53" y="5" width="17" height="13" rx="2" fill="#c2dec6" />
        <Path d="M9 25h60" stroke="#d9f69d" strokeWidth="2" />
        <Circle cx="18" cy="32" r="5" fill="#173c31" />
        <Circle cx="64" cy="32" r="5" fill="#173c31" />
      </G>
      {[
        { x: 110, y: 78 },
        { x: 315, y: 145 },
        { x: 30, y: 177 },
      ].map(({ x, y }) => (
        <G key={x}>
          <Path d={`M${x} ${y}v23`} stroke="#446f51" strokeWidth="4" />
          <Circle cx={x} cy={y - 4} r="15" fill="#719964" />
          <Circle cx={x - 5} cy={y - 10} r="11" fill="#85aa71" />
        </G>
      ))}
      <Path
        d="M178 62c16-12 30-12 44-5"
        fill="none"
        stroke="#507265"
        strokeWidth="2"
        strokeDasharray="4 5"
      />
      <Circle cx="170" cy="68" r="11" fill="#fffdf3" />
      <Path d="m165 68 4 4 6-8" stroke="#477564" strokeWidth="2" fill="none" />
    </Svg>
  );
}
