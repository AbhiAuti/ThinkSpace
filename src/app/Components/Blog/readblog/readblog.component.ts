import { Component, OnInit } from '@angular/core';
import { sharedImports } from '../../../shared-imports';
import { Blog } from '../../../blog.model';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../Services/content.service';

@Component({
  selector: 'app-readblog',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './readblog.component.html',
  styleUrl: './readblog.component.css'
})
export class ReadblogComponent implements OnInit {
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.contentService.getPostById(blogId).subscribe((data) => {
        this.blog = data;
      });
    }
  }
}