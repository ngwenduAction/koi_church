type MediaBlockProps = {
  aspectRatio: "16:9" | "3:2" | "4:5";
  description: string;
  label?: string;
  className?: string;
};

const ratioClassNames: Record<MediaBlockProps["aspectRatio"], string> = {
  "16:9": "media-block--16-9",
  "3:2": "media-block--3-2",
  "4:5": "media-block--4-5",
};

export function MediaBlock({ aspectRatio, description, label = "Media placeholder", className = "" }: MediaBlockProps) {
  const classes = ["media-block", ratioClassNames[aspectRatio], className].filter(Boolean).join(" ");

  return (
    <figure className={classes}>
      <div aria-label={description} className="media-block__frame" role="img">
        <div className="media-block__placeholder" />
        <span className="media-block__label">{label}</span>
      </div>
      <figcaption>{description}</figcaption>
    </figure>
  );
}
