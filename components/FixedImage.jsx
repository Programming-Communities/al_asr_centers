// components/FixedImage.jsx
export default function FixedImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill = false,
  className = "",
  priority = false 
}) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        position: fill ? 'relative' : 'static',
        width: fill ? '100%' : width,
        height: fill ? '100%' : height
      }}
    >
      <Image
        src={src}
        alt={alt || 'Image'}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        style={{
          objectFit: 'cover',
          width: fill ? '100%' : 'auto',
          height: fill ? '100%' : 'auto'
        }}
        sizes={fill ? "(max-width: 768px) 100vw, 50vw" : undefined}
      />
    </div>
  );
}