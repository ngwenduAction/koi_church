type SeasonDividerProps = {
  title: string;
  range: string;
};

export function SeasonDivider({ title, range }: SeasonDividerProps) {
  return (
    <div className="season-divider">
      <span>{title}</span>
      <span>{range}</span>
    </div>
  );
}