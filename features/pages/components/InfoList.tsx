type InfoListProps = {
  title: string;
  items: string[];
};

export function InfoList({ title, items }: InfoListProps) {
  return (
    <section className="info-list">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
