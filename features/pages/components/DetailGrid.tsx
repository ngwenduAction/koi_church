type DetailGridProps = {
  items: Array<{ label: string; value: string }>;
};

export function DetailGrid({ items }: DetailGridProps) {
  return (
    <dl className="detail-grid">
      {items.map((item) => (
        <div className="detail-grid__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
