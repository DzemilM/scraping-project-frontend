<script>
  import SignIn from './pages/SignIn/SignIn.svelte'
  import SignUp from './pages/SignUp/SignUp.svelte'
  import Scraper from './pages/Scraper/Scraper.svelte'

  const page = window.location.pathname
</script>

{#if page === '/signup'}
  <SignUp />
{:else if page === '/scraper'}
  <Scraper />
{:else}
  <SignIn />
{/if}
