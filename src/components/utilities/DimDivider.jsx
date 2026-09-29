export default function DimDivider({ label }) {
  return (
    <div className="dim-divider" role="separator" aria-hidden="true">
      <svg viewBox="0 0 100 12" preserveAspectRatio="none">
        <path d="M0,6 L100,6" />
        <path d="M0,2 L0,10" />
      </svg>
      {label && <span className="dim-tag">{label}</span>}
      <svg viewBox="0 0 100 12" preserveAspectRatio="none">
        <path d="M0,6 L100,6" />
        <path d="M100,2 L100,10" />
      </svg>
    </div>
  )
}
