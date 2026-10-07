import './Brand.css'

// The logo + name. Used on every page, so it's its own component.
// `className` lets the parent add extra classes (e.g. to hide it on desktop).
export default function Brand({ className = '' }) {
  return (
    <a className={`brand ${className}`} href="#">
      <span className="brand__mark">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M2 5V3.5A1.5 1.5 0 0 1 3.5 2H5M11 2h1.5A1.5 1.5 0 0 1 14 3.5V5M14 11v1.5a1.5 1.5 0 0 1-1.5 1.5H11M5 14H3.5A1.5 1.5 0 0 1 2 12.5V11M4.5 8h7" />
        </svg>
      </span>
      Universal Scraper
    </a>
  )
}
