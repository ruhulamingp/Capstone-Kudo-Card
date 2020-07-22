import { environment } from 'src/environments/environment';
import { CreatePostDto } from './dataModel/CreatePostDto';
import { ApiConfig } from './ApiConfig';
import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostListItem } from './dataModel/PostListItem';
import { QueryParams } from '../DTO/QueryParamDTO';

@Injectable({providedIn: 'root'})
export class PostResource {
    private readonly URL = environment.apiUrl + 'kudo';

    constructor(private httpClient: HttpClient) { }

    public findAll(queryParam: QueryParams): Observable<PostListItem[]> {

        let params = new HttpParams();
        Object.keys(queryParam).map(k => {
           params = params.set (k, queryParam[k]);
        });
        return this.httpClient.get<PostListItem[]>(this.URL, {params});
    }

    public create(createPostDto: CreatePostDto): Observable<CreatePostDto> {
        return this.httpClient.post<CreatePostDto>(this.URL + '/create', createPostDto);
    }

    public update(createPostDto: CreatePostDto): Observable<CreatePostDto> {
        return this.httpClient.put<CreatePostDto>(this.URL + '/update', createPostDto);
    }
 
    public delete(id: string): Observable<CreatePostDto> {
        const httpParams = new HttpParams().set('kudoId', id);

        const options = { params: httpParams };
        return this.httpClient.delete<CreatePostDto>(this.URL + '/delete', options);
    }


}
