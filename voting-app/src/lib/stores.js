import { writable } from 'svelte/store';

// Initialize with some sample data
export const bigFlopVotes = writable([
    { id: 1, name: "Lay's Limon", votes: 0, description: "Too sour and artificial tasting" },
    { id: 2, name: "Doritos 3D Crunch", votes: 0, description: "Discontinued due to poor sales" },
    { id: 3, name: "Pringles Rice", votes: 0, description: "Failed to capture the original Pringles magic" }
]);

export const bizarreVotes = writable([
    { id: 1, name: "Lay's Cappuccino", votes: 0, description: "Coffee-flavored chips" },
    { id: 2, name: "Doritos Taco", votes: 0, description: "Taco-flavored chips" },
    { id: 3, name: "Pringles Pizza", votes: 0, description: "Pizza-flavored chips" }
]);

// Function to update votes
export function updateVotes(store, id) {
    store.update(items => 
        items.map(item => 
            item.id === id 
                ? { ...item, votes: item.votes + 1 }
                : item
        )
    );
} 