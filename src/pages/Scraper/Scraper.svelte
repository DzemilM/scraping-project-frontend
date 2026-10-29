<script>
  import Brand from '../../lib/components/Brand.svelte'
  import ThemeToggle from '../../lib/components/ThemeToggle.svelte'
  import '../SignIn/SignIn.css'
  import './Scraper.css'

  // Sites the backend has a custom parser for — shown as quick-fill chips.
  const examples = [
    { label: 'Book', url: 'https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html' },
    { label: 'Pokémon', url: 'https://scrapeme.live/shop/Bulbasaur/' },
    { label: 'Car', url: 'https://webscraper.io/test-sites/e-commerce/static/product/31' },
  ];

  let url = $state("");
  let isLoading = $state(false);
  let formError = $state("");
  let view = $state("preview"); // "preview" | "json"
  let scrapedUrl = $state("https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html");

  // Sample data so you can see the design. Replace with $state(null) once connected.
  let result = $state({
    title: "A Light in the Attic",
    UPC: "a897fe39b1053632",
    price: "51.77",
    tax: "0.00",
    in_stock: "In stock (22 available)"
  });

  // TODO 1 — In src/lib/api/scraper.js, write scrape(url, token).
  //          GET http://localhost:8000/scrape?url=... with the header
  //          Authorization: Bearer <token>. Check response.ok like in auth.js.
  //          Hint: encodeURIComponent(url) keeps the "?" and "&" inside the url safe.
  //
  // TODO 2 — handleSubmit: stop the page reload, read "accessToken" from
  //          localStorage, call scrape(), then set result + scrapedUrl.
  //          Use isLoading and formError the same way SignIn does.
  //
  // TODO 3 — No token? Send the user to "/" instead of calling the backend.
  //
  // TODO 4 — Got a 401 back (token expired after 30 min)? Remove the token
  //          and send the user to "/".
  //
  // TODO 5 — Log out button: remove the token, go to "/".
  //
  // TODO 6 — Example chips: clicking one fills the input with its url.
  //
  // TODO 7 — Copy button: copy the JSON text to the clipboard.
  //          Hint: navigator.clipboard.writeText(...)
  //
  // TODO 8 — In SignIn.svelte, go to "/scraper" after a successful login.

  async function handleSubmit(event){
    event.preventDefault();
  }

  // Turns "in_stock" / "countryOfOrigin" into "In stock" / "Country of origin".
  function prettyKey(key){
    const words = key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  function isLong(value){
    return String(value).length > 120;
  }
</script>

<div class="app">
  <header class="app__top">
    <Brand />
    <div class="app__actions">
      <ThemeToggle />
      <button class="logout" type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Log out
      </button>
    </div>
  </header>

  <main class="app__main">
    <section class="hero">
      <h1>Scrape any page</h1>
      <p class="subtitle">Paste a link and get structured data back — readable or raw JSON.</p>

      <form class="url-bar" class:is-invalid={formError.length > 0} novalidate onsubmit={handleSubmit}>
        <svg class="url-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <label class="sr-only" for="url">Page URL</label>
        <input
          id="url"
          name="url"
          type="url"
          inputmode="url"
          autocomplete="off"
          spellcheck="false"
          placeholder="https://example.com/product/123"
          bind:value={url}
        />
        <button class="btn btn--primary url-bar__submit" class:is-loading={isLoading} type="submit" disabled={isLoading}>
          <span class="btn__label">
            Scrape
            <svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <span class="btn__spinner" aria-hidden="true"></span>
        </button>
      </form>

      <div class="examples">
        <span>Try:</span>
        {#each examples as example}
          <button class="chip" type="button">{example.label}</button>
        {/each}
      </div>
    </section>

    <div class="form-alert" role="alert" hidden={!formError}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4.5M12 16h.01" />
      </svg>
      <span>{formError}</span>
    </div>

    {#if isLoading}
      <section class="result" aria-busy="true">
        <div class="result__head"><span class="skeleton skeleton--title"></span></div>
        <div class="result__body">
          {#each [1, 2, 3, 4] as row}
            <div class="skeleton-row">
              <span class="skeleton skeleton--key"></span>
              <span class="skeleton skeleton--value"></span>
            </div>
          {/each}
        </div>
      </section>
    {:else if result}
      <section class="result">
        <div class="result__head">
          <div class="result__source">
            <span class="result__dot" aria-hidden="true"></span>
            <a href={scrapedUrl} target="_blank" rel="noreferrer">{scrapedUrl}</a>
          </div>

          <div class="result__tools">
            <div class="tabs" role="tablist" aria-label="Result view">
              <button role="tab" type="button" aria-selected={view === "preview"} onclick={() => view = "preview"}>Preview</button>
              <button role="tab" type="button" aria-selected={view === "json"} onclick={() => view = "json"}>JSON</button>
            </div>
            <button class="icon-btn" type="button" aria-label="Copy JSON">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>

        <div class="result__body">
          {#if view === "preview"}
            <dl class="preview">
              {#each Object.entries(result) as [key, value]}
                <div class="preview__row" class:preview__row--long={isLong(value)}>
                  <dt>{prettyKey(key)}</dt>
                  <dd>{value ?? "—"}</dd>
                </div>
              {/each}
            </dl>
          {:else}
            <pre class="json"><code>{JSON.stringify(result, null, 2)}</code></pre>
          {/if}
        </div>
      </section>
    {:else}
      <section class="empty">
        <svg width="28" height="28" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <path d="M2 5V3.5A1.5 1.5 0 0 1 3.5 2H5M11 2h1.5A1.5 1.5 0 0 1 14 3.5V5M14 11v1.5a1.5 1.5 0 0 1-1.5 1.5H11M5 14H3.5A1.5 1.5 0 0 1 2 12.5V11M4.5 8h7" />
        </svg>
        <p>Your results will show up here.</p>
      </section>
    {/if}
  </main>
</div>
