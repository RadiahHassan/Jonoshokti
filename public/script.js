const issueId = 1;  // Replace with dynamic issue ID from your frontend

// DOM elements
const issueTitle = document.getElementById("issue-title");
const issueDescription = document.getElementById("issue-description");
const issueLocation = document.getElementById("issue-location");
const issueStatus = document.getElementById("issue-status");
const upvoteCount = document.getElementById("upvote-count");
const downvoteCount = document.getElementById("downvote-count");
const commentCount = document.getElementById("comment-count");
const commentList = document.getElementById("comment-list");
const commentText = document.getElementById("comment-text");
const addCommentBtn = document.getElementById("add-comment-btn");
const upvoteBtn = document.getElementById("upvote-btn");
const downvoteBtn = document.getElementById("downvote-btn");

// Fetch Issue details
async function fetchIssueDetails() {
    try {
        const response = await fetch(`/api/issues/${issueId}`);
        const data = await response.json();

        // Display issue details
        issueTitle.textContent = data.title;
        issueDescription.textContent = data.description;
        issueLocation.textContent = data.location;
        issueStatus.textContent = data.solved ? "Solved" : "Unsolved";
        upvoteCount.textContent = data.upvotes;
        downvoteCount.textContent = data.downvotes;

        // Display comments
        commentCount.textContent = data.comment_count;
        commentList.innerHTML = data.comments.map(comment => `
            <div class="comment">
                <strong>${comment.user}</strong>: ${comment.text} <small>(${comment.timestamp})</small>
            </div>
        `).join("");
    } catch (error) {
        console.error('Error fetching issue details:', error);
    }
}

// Handle Upvote
async function upvoteIssue() {
    try {
        const response = await fetch(`/api/issues/${issueId}/upvote`, {
            method: 'POST',
        });
        const data = await response.json();
        alert(data.message);  // Display success message
        fetchIssueDetails();  // Refresh the issue details
    } catch (error) {
        console.error('Error upvoting issue:', error);
    }
}

// Handle Downvote
async function downvoteIssue() {
    try {
        const response = await fetch(`/api/issues/${issueId}/downvote`, {
            method: 'POST',
        });
        const data = await response.json();
        alert(data.message);  // Display success message
        fetchIssueDetails();  // Refresh the issue details
    } catch (error) {
        console.error('Error downvoting issue:', error);
    }
}

// Handle Add Comment
async function addComment() {
    const text = commentText.value.trim();
    if (!text) {
        alert('Please enter a comment');
        return;
    }

    const user = 'User1';  // Replace with dynamic user info

    try {
        const response = await fetch(`/api/issues/${issueId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, text }),
        });
        const data = await response.json();
        alert(data.message);  // Display success message
        commentText.value = '';  // Clear the comment input
        fetchIssueDetails();  // Refresh the issue details
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Event Listeners
upvoteBtn.addEventListener("click", upvoteIssue);
downvoteBtn.addEventListener("click", downvoteIssue);
addCommentBtn.addEventListener("click", addComment);

// Initial load of issue details
fetchIssueDetails();
