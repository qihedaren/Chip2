document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');
    const emojiButtons = document.querySelectorAll('.emoji-button');

    // Helper function to escape HTML
    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    // Load comments from localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Function to display comments
    function displayComments() {
        commentList.innerHTML = '';
        comments.forEach((comment, index) => {
            const li = document.createElement('li');
            li.className = 'comment-card';
            li.innerHTML = `
                <div class="comment-content">
                    ${escapeHTML(comment.text)}
                    ${comment.emoji ? `<span style="font-size: 20px; margin-left: 5px;">${comment.emoji}</span>` : ''}
                </div>
                <div class="comment-actions">
                    <button class="vote-button" onclick="vote(${index}, 1)">
                        👍 <span class="vote-count">${comment.upvotes || 0}</span>
                    </button>
                    <button class="vote-button" onclick="vote(${index}, -1)">
                        👎 <span class="vote-count">${comment.downvotes || 0}</span>
                    </button>
                    <button class="reply-button" onclick="toggleReplyForm(${index})">
                        💬 Reply
                    </button>
                    <button class="vote-button" onclick="deleteComment(${index})">
                        ❌ Delete
                    </button>
                </div>
                <div class="replies">
                    ${comment.replies ? comment.replies.map(reply => `
                        <div class="comment-card" style="margin: 10px 0;">
                            <div class="comment-content">${escapeHTML(reply)}</div>
                        </div>
                    `).join('') : ''}
                </div>
                <div class="reply-form" id="reply-form-${index}">
                    <input type="text" class="reply-input" placeholder="Write a reply..." id="reply-input-${index}">
                    <button onclick="submitReply(${index})">Submit Reply</button>
                </div>
            `;
            commentList.appendChild(li);
        });
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    // Voting logic
    window.vote = (index, value) => {
        if (value === 1) {
            comments[index].upvotes = (comments[index].upvotes || 0) + 1;
        } else {
            comments[index].downvotes = (comments[index].downvotes || 0) + 1;
        }
        displayComments();
    };

    // Toggle reply form
    window.toggleReplyForm = (index) => {
        const replyForm = document.getElementById(`reply-form-${index}`);
        replyForm.classList.toggle('active');
    };

    // Submit a reply
    window.submitReply = (index) => {
        const replyInput = document.getElementById(`reply-input-${index}`);
        const replyText = replyInput.value.trim();

        if (replyText) {
            if (!comments[index].replies) {
                comments[index].replies = [];
            }
            comments[index].replies.push(replyText);
            replyInput.value = '';
            toggleReplyForm(index);
            displayComments();
        }
    };

    // Delete comment
    window.deleteComment = (index) => {
        comments.splice(index, 1);
        displayComments();
    };

    // Handle emoji click
    emojiButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emoji = button.dataset.emoji;
            commentInput.value += emoji;
            commentInput.focus();
        });
    });

    // Handle comment submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = commentInput.value.trim();

        if (text) {
            comments.unshift({
                text,
                emoji: '', // Optional if you want to store emoji separately
                timestamp: new Date().toISOString(),
                upvotes: 0,
                downvotes: 0,
                replies: []
            });
            commentInput.value = '';
            displayComments();
        }
    });

    // Initial display
    displayComments();
});
