<script>
    import VotingComponent from '$lib/VotingComponent.svelte';
    import { bizarreVotes } from '$lib/stores.js';
</script>

<VotingComponent 
    title="Most Bizzare Chip Flavors" 
    items={$bizzareVotes} 
    store={bizzareVotes}
/> 