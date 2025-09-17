import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments() {
    return this.commentsService.findAll();
  }

  @Post(':id/reply')
  replyToComment(
    @Param('id') id: string,
    @Body() body: { reply: string } 
  ) {
    console.log('Received body:', body);
    return this.commentsService.replyToComment(Number(id), body.reply);
  }
}
