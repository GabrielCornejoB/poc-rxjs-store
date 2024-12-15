import { RxjsStore } from './rxjs-store';
import { DestroyRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, EMPTY, map, Observable, switchMap, tap } from 'rxjs';

type PostsState = {
  isLoading: boolean;
  posts: string[] | null;
  selectedPost: string | null;
}

const initialState: PostsState = {
  isLoading: false,
  posts: null,
  selectedPost: null
}

@Injectable()
export class PostsStore extends RxjsStore<PostsState> {

  readonly apiUrl = "https://jsonplaceholder.typicode.com/posts";

  isLoading$ = this.select(s => s.isLoading);

  allState$ = this.select(s => s)

  constructor(private readonly http: HttpClient, destroyRef: DestroyRef) {
    super(initialState, destroyRef);
  }

  load() {
    this.patch({isLoading: true});
    setTimeout(() => {
      this.patch({isLoading: false})
    }, 3000)
  }

  updateOtherState() {
    this.patch({posts: ["post1", "post2"], selectedPost: "selectedPost"})
  }

  fetchPostsTitles(): Observable<string[]> {
    return this.http.get<{title: string}[]>(this.apiUrl).pipe(map(posts => posts.map(post => post.title)))
  }

  getPostsAction() {
    this.action<void>($ => $.pipe(
      tap(() => this.patch({isLoading: true})),
      delay(750),
      switchMap(() => this.fetchPostsTitles().pipe(
        tap(() => this.patch({isLoading: true})),
        catchError(err => {
            console.error(err);
            return EMPTY;
          }
        ),
        tap({
          next: (res) => this.patch({posts: res})
        })
      ))
    ))();
  }

  findPost(postId: number) {
    this.action<number>(id$ =>
      id$.pipe(
        tap(() => this.patch({isLoading: true})),
        delay(500),
        switchMap((id) => this.http.get(this.apiUrl + "/" + id).pipe(
          tap(() => this.patch({isLoading: false})),
          catchError(err => {
            console.error(err);
            return EMPTY;
          }),
          tap({
            next: (res: any) => this.patch({selectedPost: res.title})
          })
        ))
      )
    )(postId);
  }
}
