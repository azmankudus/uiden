interface StatusBadgeProps {
  text: string;
  color: string;
}

export default function StatusBadge(props: StatusBadgeProps) {
  return (
    <span
      class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium w-fit"
      style={{
        "background-color": props.color + "18",
        color: props.color,
      }}
    >
      {props.text}
    </span>
  );
}
