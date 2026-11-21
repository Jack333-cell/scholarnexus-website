// Shows a watermarked, partly blurred preview. A transparent layer sits over the image so
// right-click and drag act on the layer, not the picture. The full document is never on the site.
export default function ProtectedPreview({ src, alt, className = '' }) {
  return (
    <div className={`relative select-none overflow-hidden rounded-lg border border-slate-200 shadow-sm bg-white ${className}`}>
      <img src={src} alt={alt} draggable="false" className="w-full h-auto pointer-events-none" />
      <div className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
