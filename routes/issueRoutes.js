import express from 'express';
import {
  getIssueDetails,
  upvoteIssue,
  downvoteIssue,
  addComment,
  markIssueAsSolved
} from '../controllers/issueController.js';

const router = express.Router();

// Define routes
router.get('/issues/:id', getIssueDetails);  // Get issue details, including comments
router.post('/issues/:id/upvote', upvoteIssue);  // Upvote an issue
router.post('/issues/:id/downvote', downvoteIssue);  // Downvote an issue
router.post('/issues/:id/comments', addComment);  // Add a comment to an issue
router.post('/issues/:id/solve', markIssueAsSolved);  // Mark an issue as solved

export default router;
