import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../blog.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
base_url ="https://6808bb48942707d722df7f39.mockapi.io/api/blog/content";
  constructor(private http:HttpClient) { }

  
   // Method to post the blog data
  createPost(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.base_url}`, blog);
  }
  // Fetch a blog post by ID
  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/${id}`);
  }

  getAllPosts(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.base_url}`);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.base_url}/${id}`);
  }

  updatePost(blogId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.base_url}/${blogId}`, updatedData);
  }


}
