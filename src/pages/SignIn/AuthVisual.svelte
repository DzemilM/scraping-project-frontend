<script>
  import Brand from '../../lib/components/Brand.svelte'
  import './AuthVisual.css'

  // The animated "scraping" panel on the left. Purely decorative, no logic needed.

  const products = [
    { title: 'Linen Shirt', price: '49.00' },
    { title: 'Canvas Tote', price: '24.50' },
    { title: 'Wool Beanie', price: '19.99' },
    { title: 'Leather Belt', price: '35.00' },
  ]

  // Longest title, so the JSON lines line up nicely
  const titleWidth = Math.max(...products.map((p) => p.title.length))
</script>

<section class="auth__visual" aria-hidden="true">
  <Brand />

  <div class="scene">
    <div class="browser">
      <div class="browser__bar">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="browser__url">https://shop.example.com/products</span>
      </div>
      <div class="browser__body">
        <div class="scanline"></div>
        <div class="card-grid">
          {#each products as product, i (product.title)}
            <!-- first row gets scanned at 0.6s, second row at 2s -->
            <div class="p-card" style:--d={i < 2 ? '.6s' : '2s'}>
              <div class="p-card__img"></div>
              <div class="line line--title"></div>
              <div class="line line--short"></div>
              <div class="p-card__price"></div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="output">
      <div class="output__head">
        <span class="pulse"></span>
        extracting · {products.length} items
      </div>
      <div class="output__code">
        <div class="ln" style:--i={0}><span class="p">[</span></div>
        {#each products as product, i (product.title)}
          <div class="ln" style:--i={i + 1}>{'  '}<span class="p">{'{'}</span> <span class="k">"title"</span><span class="p">:</span> <span class="s">"{product.title}"</span><span class="p">,</span>{' '.repeat(titleWidth - product.title.length)} <span class="k">"price"</span><span class="p">:</span> <span class="n">{product.price}</span> <span class="p">{i === products.length - 1 ? '}' : '},'}</span></div>
        {/each}
        <div class="ln" style:--i={products.length + 1}><span class="p">]</span></div>
      </div>
    </div>
  </div>

  <div class="visual__copy">
    <h2>Turn any page into <span class="hl">clean data.</span></h2>
    <p>Point, scrape, export. Your scrapers and datasets are waiting on the other side.</p>
  </div>
</section>
