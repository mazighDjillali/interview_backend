import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { comments as mockComments } from './comments.mock';

@Injectable()
export class CommentsService {
  private comments = [...mockComments];

  private repliesFile = path.join("C:/Users/PC/Documents/Comments management app/backend/comment-backend/src/comments/", 'replies.json');

  findAll() {
    return this.comments;
  }

  replyToComment(id: number, reply: string) {
    // Remove comment from list
    this.comments = this.comments.filter(c => c.id !== id);

    // Load existing replies from file (if file exists)
    let existingReplies: { id: number; reply: string }[] = [];
    if (fs.existsSync(this.repliesFile)) {
      existingReplies = JSON.parse(fs.readFileSync(this.repliesFile, 'utf-8'));
    }

    // Add new reply
    existingReplies.push({ id, reply });

    // Write back to file (pretty-printed JSON)
    fs.writeFileSync(this.repliesFile, JSON.stringify(existingReplies, null, 2));

    return {
      message: 'Reply saved',
      reply: { id, reply },
      remaining: this.comments
    };
  }

  getReplies() {
    if (fs.existsSync(this.repliesFile)) {
      return JSON.parse(fs.readFileSync(this.repliesFile, 'utf-8'));
    }
    return [];
  }
}
