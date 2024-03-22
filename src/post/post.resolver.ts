import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PostService } from "./post.service";
import {  UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/dtos/gql-auth-guard";
import { CurrentUser } from "src/user/current-user-decorator";
import { User } from "src/user/schemas/user.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserService } from "src/user/user.service";
import { Post, } from "./schemas/post.schema";

@Resolver(()=> Post)
export class PostResolver {
    constructor(private readonly postService : PostService,
        private readonly userService: UserService){}
@Query(() => [Post])
getPosts(){
    return this.postService.findAll()
}

@UseGuards(GqlAuthGuard)
@Mutation(()=>Post)
createPost(@CurrentUser() user: User, @Args('post' ) post: CreatePostDto){
    return this.postService.create(post, user.id)
}

@ResolveField(() => User)
user (@Parent() post : Post){
    return this.userService.findById(post.user)
}
}
