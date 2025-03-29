<script>
    import VotingComponent from '$lib/VotingComponent.svelte';
    import { bigFlopVotes } from '$lib/stores.js';
</script>

<VotingComponent 
    title="Biggest Chip Flops" 
    items={$bigFlopVotes} 
    store={bigFlopVotes}
/> 