import Brand from '../../components/Brand.jsx'
import './AuthVisual.css'

// The animated "scraping" panel on the left. Purely decorative — no logic needed.

const PRODUCTS = [
  { title: 'Linen Shirt', price: '49.00' },
  { title: 'Canvas Tote', price: '24.50' },
  { title: 'Wool Beanie', price: '19.99' },
  { title: 'Leather Belt', price: '35.00' },
]

// Longest title, so the JSON lines line up nicely
const TITLE_WIDTH = Math.max(...PRODUCTS.map((p) => p.title.length))

export default function AuthVisual() {
  return (
    <section className="auth__visual" aria-hidden="true">
      <Brand />

      <div className="scene">
        <div className="browser">
          <div className="browser__bar">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="browser__url">https://shop.example.com/products</span>
          </div>
          <div className="browser__body">
            <div className="scanline" />
            <div className="card-grid">
              {PRODUCTS.map((product, i) => (
                // first row gets scanned at 0.6s, second row at 2s
                <div className="p-card" key={product.title} style={{ '--d': i < 2 ? '.6s' : '2s' }}>
                  <div className="p-card__img" />
                  <div className="line line--title" />
                  <div className="line line--short" />
                  <div className="p-card__price" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="output">
          <div className="output__head">
            <span className="pulse" />
            extracting · {PRODUCTS.length} items
          </div>
          <div className="output__code">
            <div className="ln" style={{ '--i': 0 }}>
              <span className="p">[</span>
            </div>
            {PRODUCTS.map((product, i) => {
              const isLast = i === PRODUCTS.length - 1
              const padding = ' '.repeat(TITLE_WIDTH - product.title.length)
              return (
                <div className="ln" key={product.title} style={{ '--i': i + 1 }}>
                  {'  '}
                  <span className="p">{'{'}</span>{' '}
                  <span className="k">"title"</span>
                  <span className="p">:</span>{' '}
                  <span className="s">"{product.title}"</span>
                  <span className="p">,</span>
                  {padding}{' '}
                  <span className="k">"price"</span>
                  <span className="p">:</span>{' '}
                  <span className="n">{product.price}</span>{' '}
                  <span className="p">{isLast ? '}' : '},'}</span>
                </div>
              )
            })}
            <div className="ln" style={{ '--i': PRODUCTS.length + 1 }}>
              <span className="p">]</span>
            </div>
          </div>
        </div>
      </div>

      <div className="visual__copy">
        <h2>
          Turn any page into <span className="hl">clean data.</span>
        </h2>
        <p>Point, scrape, export. Your scrapers and datasets are waiting on the other side.</p>
      </div>
    </section>
  )
}
