export function Spinner(props) {
  let { value, minValue = 0, maxValue = 100 } = props;

  let center = 16;
  let strokeWidth = 4;
  let r = 16 - strokeWidth;
  let c = 2 * r * Math.PI;
  let percentage = 0.25;
  let offset = c - percentage * c;

  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={strokeWidth}
    >
      <circle role="presentation" cx={center} cy={center} r={r} stroke="#eee" />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="#000"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        transform="rotate(-90 16 16)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="1s"
          from="0 16 16"
          to="360 16 16"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
