<script>
  import SignIn from './pages/SignIn/SignIn.svelte'
  import SignUp from './pages/SignUp/SignUp.svelte'

  const page = window.location.pathname
</script>

{#if page === '/signup'}
  <SignUp />
{:else}
  <SignIn />
{/if}
