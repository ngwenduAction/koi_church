type ScriptureBlockProps = {
  reference: string;
  children: string;
};

export function ScriptureBlock({ reference, children }: ScriptureBlockProps) {
  return (
    <blockquote className="scripture-block">
      <p className="scripture-block__eyebrow">{reference}</p>
      <p className="scripture-block__text">{children}</p>
    </blockquote>
  );
}
