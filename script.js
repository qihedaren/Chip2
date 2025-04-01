document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');
    const emojiButtons = document.querySelectorAll('.emoji-button');

    // Escape HTML to avoid injection
    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    // Load comments from localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    function displayComments() {
        commentList.innerHTML = '';

        comments.forEach((comment, index) => {
            const li = document.createElement('li');
            li.className = 'comment-card';

            // Comment content
            const contentDiv = document.createElement('div');
            contentDiv.className = 'comment-content';
            contentDiv.innerHTML = `${escapeHTML(comment.text)} ${
                comment.emoji ? `<span style="font-size: 20px; margin-left: 5px;">${comment.emoji}</span>` : ''
            }`;
            li.appendChild(contentDiv);

            // Action buttons container
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'comment-actions';

            // Upvote
            const upvoteBtn = document.createElement('button');
            upvoteBtn.className = 'vote-button';
            upvoteBtn.innerHTML = `👍 <span class="vote-count">${comment.upvotes || 0}</span>`;
            upvoteBtn.addEventListener('click', () => {
                comment.upvotes = (comment.upvotes || 0) + 1;
                saveAndRefresh();
            });

            // Downvote
            const downvoteBtn = document.createElement('button');
            downvoteBtn.className = 'vote-button';
            downvoteBtn.innerHTML = `👎 <span class="vote-count">${comment.downvotes || 0}</span>`;
            downvoteBtn.addEventListener('click', () => {
                comment.downvotes = (comment.downvotes || 0) + 1;
                saveAndRefresh();
            });

            // Delete
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'vote-button';
            deleteBtn.innerHTML = '❌ Delete';
            deleteBtn.addEventListener('click', () => {
                comments.splice(index, 1);
                saveAndRefresh();
            });

            // Reply toggle
            const replyBtn = document.createElement('button');
            replyBtn.className = 'reply-button';
            replyBtn.innerHTML = '💬 Reply';

            actionsDiv.appendChild(upvoteBtn);
            actionsDiv.appendChild(downvoteBtn);
            actionsDiv.appendChild(replyBtn);
            actionsDiv.appendChild(deleteBtn);
            li.appendChild(actionsDiv);

            // Replies section
            const repliesDiv = document.createElement('div');
            repliesDiv.className = 'replies';

            if (comment.replies && comment.replies.length > 0) {
                comment.replies.forEach(reply => {
                    const replyCard = document.createElement('div');
                    replyCard.className = 'comment-card';
                    replyCard.style.margin = '10px 0';
                    const replyContent = document.createElement('div');
                    replyContent.className = 'comment-content';
                    replyContent.innerHTML = escapeHTML(reply);
                    replyCard.appendChild(replyContent);
                    repliesDiv.appendChild(replyCard);
                });
            }

            li.appendChild(repliesDiv);

            // Reply form
            const replyForm = document.createElement('div');
            replyForm.className = 'reply-form';
            replyForm.style.display = 'none';

            const replyInput = document.createElement('input');
            replyInput.type = 'text';
            replyInput.className = 'reply-input';
            replyInput.placeholder = 'Write a reply...';

            const replySubmit = document.createElement('button');
            replySubmit.textContent = 'Submit Reply';

            replySubmit.addEventListener('click', () => {
                const replyText = replyInput.value.trim();
                if (replyText) {
                    if (!comment.replies) comment.replies = [];
                    comment.replies.push(replyText);
                    saveAndRefresh();
                }
            });

            replyForm.appendChild(replyInput);
            replyForm.appendChild(replySubmit);
            li.appendChild(replyForm);

            // Toggle reply form visibility
            replyBtn.addEventListener('click', () => {
                replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
            });

            commentList.appendChild(li);
        });
    }

    // Save and re-render
    function saveAndRefresh() {
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
    }

    // Handle emoji buttons
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
                emoji: '', // Optional field
                timestamp: new Date().toISOString(),
                upvotes: 0,
                downvotes: 0,
                replies: []
            });
            commentInput.value = '';
            saveAndRefresh();
        }
    });

    // Initial display
    displayComments();
});
