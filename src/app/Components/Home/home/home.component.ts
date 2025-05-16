import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ContentService } from '../../../Services/content.service';
import { Blog } from '../../../blog.model';
import { sharedImports } from '../../../shared-imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,sharedImports],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
   constructor(private authservice:AuthService,private contentservice:ContentService, private router:Router){};
  isDarkTheme = false;
  blogList: Blog[] = [];

  toggleTheme() {
  this.isDarkTheme = !this.isDarkTheme;
}

newblog(){
  if(this.authservice.isLoggedIn()){
    this.router.navigate(['/addblog']);
  }else{
    this.router.navigate(['login']);
  }
}

//All-Blog
  ngOnInit(): void {
    this.fetchBlogs();
  }

fetchBlogs(): void {
    this.contentservice.getAllPosts().subscribe((blogs) => {
      // Ensure likes/dislikes are always numbers
      this.blogList = blogs;
    });
  }

  readMore(id:string):void{
   this.router.navigate(['/blog', id]);
  }

}
