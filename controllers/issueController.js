import db from '../db.js';

// Get issue details by ID
export const getIssueDetails = (req, res) => {
  const issueId = req.params.id;

  // Query to fetch the issue details
  const query = `
    SELECT 
      i.title, 
      i.description, 
      i.upvotes, 
      i.downvotes, 
      i.solved, 
      i.location
    FROM issues i
    WHERE i.id = ?;
  `;

  // Fetch the issue details from the database
  db.query(query, [issueId], (err, issueResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (issueResults.length === 0) return res.status(404).json({ message: 'Issue not found' });

    // Query to fetch the comments for the issue
    const commentQuery = `
      SELECT user, text, timestamp
      FROM comments
      WHERE issue_id = ?
    `;

    // Fetch the comments for the issue
    db.query(commentQuery, [issueId], (err, commentResults) => {
      if (err) return res.status(500).json({ error: err.message });

      // Manually construct the JSON response with the comments
      const issue = issueResults[0];
      issue.comments = commentResults; // Adding comments array
      issue.comment_count = commentResults.length; // Adding the comment count

      // Send the combined response
      res.json(issue);
    });
  });
};

// Upvote an issue
export const upvoteIssue = (req, res) => {
  const issueId = req.params.id;
  const query = 'UPDATE issues SET upvotes = upvotes + 1 WHERE id = ?';
  db.query(query, [issueId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Upvote added successfully' });
  });
};

// Downvote an issue
export const downvoteIssue = (req, res) => {
  const issueId = req.params.id;
  const query = 'UPDATE issues SET downvotes = downvotes + 1 WHERE id = ?';
  db.query(query, [issueId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Downvote added successfully' });
  });
};

// Mark an issue as solved
export const markIssueAsSolved = (req, res) => {
  const issueId = req.params.id;
  const query = 'UPDATE issues SET solved = 1 WHERE id = ?';
  db.query(query, [issueId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Issue marked as solved' });
  });
};

// Add a comment to an issue
export const addComment = (req, res) => {
  const issueId = req.params.id;
  const { user, text } = req.body;
  const query = 'INSERT INTO comments (issue_id, user, text) VALUES (?, ?, ?)';
  db.query(query, [issueId, user, text], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Comment added successfully' });
  });
};
