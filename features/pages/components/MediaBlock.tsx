import Image from "next/image";

type MediaBlockProps = {
  aspectRatio: "16:9" | "3:2" | "4:5";
  description: string;
  label?: string;
  className?: string;
  imageUrl?: string;
};

const ratioClassNames: Record<MediaBlockProps["aspectRatio"], string> = {
  "16:9": "media-block--16-9",
  "3:2": "media-block--3-2",
  "4:5": "media-block--4-5",
};

export function MediaBlock({ aspectRatio, description, label = "Media placeholder", className = "", imageUrl }: MediaBlockProps) {
  const classes = ["media-block", ratioClassNames[aspectRatio], className].filter(Boolean).join(" ");

  return (
    <figure className={classes}>
      <div aria-label={description} className={`media-block__frame${imageUrl ? " media-block__frame--image" : ""}`} role="img">
        {imageUrl ? <Image alt="" className="media-block__image" fill sizes="(max-width: 1024px) 100vw, 960px" src={imageUrl} /> : <div className="media-block__placeholder" />}
        <span className="media-block__label">{label}</span>
      </div>
      <figcaption>{description}</figcaption>
    </figure>
  );
}
