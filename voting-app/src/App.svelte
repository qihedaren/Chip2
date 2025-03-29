<script>
  import { bigFlopVotes, bizarreVotes } from './lib/stores.js';
  import VotingComponent from './lib/VotingComponent.svelte';
  import { page } from '$app/stores';

  $: currentPage = $page.url.pathname;
</script>

<main>
  <nav>
    <a href="/bigflop" class:active={currentPage === '/bigflop'}>Big Flops</a>
    <a href="/bizzare" class:active={currentPage === '/bizzare'}>Bizzare Flavors</a>
  </nav>

  {#if currentPage === '/bigflop'}
    <VotingComponent 
      title="Biggest Chip Flops" 
      items={$bigFlopVotes} 
      store={bigFlopVotes}
    />
  {:else if currentPage === '/bizzare'}
    <VotingComponent 
      title="Most Bizzare Chip Flavors" 
      items={$bizzareVotes} 
      store={bizzareVotes}
    />
  {/if}
</main>

<style>
  main {
    padding: 2rem;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  a {
    color: #0066ff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;
  }

  a:hover {
    background-color: #f0f0f0;
  }

  a.active {
    background-color: #0066ff;
    color: white;
  }
</style>
