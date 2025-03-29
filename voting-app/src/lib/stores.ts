import { writable } from 'svelte/store';

// Initialize votes from localStorage if available
const initialVotes = JSON.parse(localStorage.getItem('bigflopVotes') || '{}') || {
    'Lay\'s Cappuccino': 0,
    'Pringles Rice Infusions': 0,
    'Doritos Collisions': 0,
    'Cheetos Sweetos': 0,
    'Lay\'s Wavy Mango Salsa': 0
};

// Create the votes store
export const votes = writable(initialVotes);

// Check if user has voted
export const hasVoted = writable(localStorage.getItem('hasVotedBigFlop') === 'true');

// Function to submit a vote
export function submitVote(flavor: string) {
    votes.update(currentVotes => {
        const newVotes = { ...currentVotes, [flavor]: currentVotes[flavor] + 1 };
        localStorage.setItem('bigflopVotes', JSON.stringify(newVotes));
        localStorage.setItem('hasVotedBigFlop', 'true');
        hasVoted.set(true);
        return newVotes;
    });
}

// Function to get sorted votes
export function getSortedVotes(votes: Record<string, number>) {
    return Object.entries(votes)
        .sort(([, a], [, b]) => b - a)
        .map(([flavor, count]) => ({ flavor, count }));
} 