<<<<<<< HEAD
<script>
    import { updateVotes } from './stores.js';
    export let title;
    export let items;
    export let store;

    function handleVote(id) {
        updateVotes(store, id);
    }
</script>

<div class="voting-container">
    <h2>{title}</h2>
    <div class="voting-grid">
        {#each items as item}
            <div class="voting-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div class="voting-stats">
                    <span>Votes: {item.votes}</span>
                    <button on:click={() => handleVote(item.id)}>Vote</button>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .voting-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    h2 {
        color: #333;
        margin-bottom: 2rem;
        text-align: center;
    }

    .voting-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .voting-card {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }

    .voting-card:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #0066ff;
        margin-bottom: 1rem;
    }

    p {
        color: #666;
        margin-bottom: 1.5rem;
    }

    .voting-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        background-color: #0066ff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #0052cc;
    }

    @media (max-width: 768px) {
        .voting-grid {
            grid-template-columns: 1fr;
        }
    }
=======
<script>
    import { updateVotes } from './stores.js';
    export let title;
    export let items;
    export let store;

    function handleVote(id) {
        updateVotes(store, id);
    }
</script>

<div class="voting-container">
    <h2>{title}</h2>
    <div class="voting-grid">
        {#each items as item}
            <div class="voting-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div class="voting-stats">
                    <span>Votes: {item.votes}</span>
                    <button on:click={() => handleVote(item.id)}>Vote</button>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .voting-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    h2 {
        color: #333;
        margin-bottom: 2rem;
        text-align: center;
    }

    .voting-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .voting-card {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }

    .voting-card:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #0066ff;
        margin-bottom: 1rem;
    }

    p {
        color: #666;
        margin-bottom: 1.5rem;
    }

    .voting-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        background-color: #0066ff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #0052cc;
    }

    @media (max-width: 768px) {
        .voting-grid {
            grid-template-columns: 1fr;
        }
    }
>>>>>>> e70043a0e855e053292ed2610ec3de895c3927cd
</style> 