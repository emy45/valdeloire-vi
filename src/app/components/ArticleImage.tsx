interface ArticleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ArticleImage({ src, alt, className = "" }: ArticleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
}