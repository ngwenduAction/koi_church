import {useTranslations} from "next-intl";

type ScriptureBlockProps = {
  reference?: string;
  children?: string;
  scriptureKey?: string;
};

export function ScriptureBlock({ reference, children, scriptureKey }: ScriptureBlockProps) {
  const t = useTranslations("scriptures");
  const resolvedReference = scriptureKey ? t(`${scriptureKey}.reference`) : reference;
  const resolvedText = scriptureKey ? t(`${scriptureKey}.text`) : children;

  return (
    <blockquote className="scripture-block">
      <p className="scripture-block__eyebrow">{resolvedReference}</p>
      <p className="scripture-block__text">{resolvedText}</p>
    </blockquote>
  );
}
