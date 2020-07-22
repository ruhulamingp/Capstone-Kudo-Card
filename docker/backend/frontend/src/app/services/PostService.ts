import { QueryParams } from './../DTO/QueryParamDTO';
import { CreatePostDto } from './dataModel/CreatePostDto';
import { PostResource } from './PostResource';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostListItem } from './dataModel/PostListItem';

@Injectable()
export class PostService {

    private postListsSubject: BehaviorSubject<PostListItem[]> = new BehaviorSubject(null);

    constructor(private postResource: PostResource) { }

    public getPostListSubject(): BehaviorSubject<PostListItem[]> {

        return this.postListsSubject ;

    }

    public getAllPostListItems(queryParam: QueryParams): Observable<PostListItem[]>{
        return this.postResource.findAll(queryParam);
    }

    public createPost(createPostDto: CreatePostDto): Observable<CreatePostDto>{
        return this.postResource.create(createPostDto);
    }

    public updatePost(createPostDto: CreatePostDto): Observable<CreatePostDto>{
        return this.postResource.update(createPostDto);
    }

    public delete(id: string): Observable<CreatePostDto>{
        return this.postResource.delete(id);
    }


}
