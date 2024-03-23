import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiCreatedResponse({schema: {example: { success: true, message: 'All post data' }}})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  // /
  // posts/?page=1&perPage=10
  @ApiCreatedResponse({schema: {example: { success: true, message: 'Single Post data' }}})
  @Get('posts/:page/:perPage')
  findAll() {
    return this.postService.findAll();
  }

  @ApiCreatedResponse({schema: {example: {success: true, message: 'Post has been updated'}}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiCreatedResponse({schema: {example: {success: true, message: 'Post has been deleted'}}})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
