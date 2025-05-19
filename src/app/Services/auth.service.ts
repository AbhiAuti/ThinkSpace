import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private base_url ="https://6808bb48942707d722df7f39.mockapi.io/api/blog/auth";
  constructor(private http:HttpClient) { }

  isLoggedIn():boolean{
    return !!sessionStorage.getItem('loggedInUser');
  }

register(userData:{username:string,email:string,password:string}):Observable<User>{
    const createdAt = new Date().toISOString();
    // Choose your preferred method for b_id
    const rawString = `${userData.username}:${userData.password}:${createdAt}`;
    const b_id = btoa(rawString); // or use custom logic

    const fullData:User={
      ...userData,
      createdAt,
      b_id
    }

    return this.http.post<User>(this.base_url,fullData);
}

 login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.base_url).pipe(
      map(users => {
        const matchedUser = users.find(user => user.username === username && user.password === password);
        if (matchedUser) {
          sessionStorage.setItem('loggedInUser', JSON.stringify(matchedUser.b_id));
          return matchedUser;
        }
        return null;
      })
    );
  }


logout(){
    sessionStorage.removeItem('loggedInUser');
  }


}
