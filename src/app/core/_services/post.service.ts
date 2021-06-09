import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {IComment, IPost, IUser} from '@shared/models';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

const API_URL = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  // get All Post
  getAllPost(pageNumber: number = 1): Observable<IPost[]> {
    return this.http.get<any>(API_URL + 'allPost?pageNumber=' + pageNumber, httpOptions).pipe(
      map(ele => ele.data.posts)
    );
  }

  // get all post whose you're following
  getSubPost(): Observable<IPost[]> {
    return this.http.get<any>(API_URL + 'getSubpost', httpOptions).pipe(
      map(ele => ele.data.posts),
      delay(50));
  }

  // Get a post
  getSinglePost(ID: string): Observable<IPost> {
    return this.http.get<any>(API_URL + 'post/' + ID, httpOptions).pipe(
      map(res => res.data.posts),
      delay(50)
    );
  }

  // Get users like a post
  getUsersLikePost(ID: string): Observable<IUser[]> {
    return this.http.get<any>(API_URL + 'getUserLikePost/' + ID, httpOptions).pipe(
      map(next => next.data.likes),
      delay(50)
    );
  }

  // Get comment of post
  getCommentsOfPost(ID: string): Observable<IComment[]> {
    return this.http.get<any>(API_URL + 'post/' + ID, httpOptions).pipe(
      map(res => res.data.posts.comments),
      delay(50)
    );
  }

  // Create a post
  createPost(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post(API_URL + 'create', formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  // Edit a post
  editPost(ID: string, formData: FormData): Observable<HttpEvent<any>> {
    return this.http.put(API_URL + 'editPost/' + ID, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  // Delete a post by ID
  deletePost(ID: string): Observable<any> {
    return this.http.delete(API_URL + 'deletePost/' + ID, httpOptions).pipe(delay(50));
  }

  // Like a Post - push ID into post
  likePost(ID: string): Observable<any> {
    return this.http.put(API_URL + 'like', {
      postId: ID
    }, httpOptions).pipe(delay(50));
  }

  // Unlike post - remove ID from post
  unlikePost(ID: string): Observable<any> {
    return this.http.put(API_URL + 'unlike', {
      postId: ID
    }, httpOptions).pipe(delay(50));
  }

  // Send comment to post
  commentOnPost(comment: string, ID: string): Observable<any> {
    return this.http.put(API_URL + 'comment', {
      text: comment,
      postId: ID
    }, httpOptions).pipe(delay(50));
  }
}
