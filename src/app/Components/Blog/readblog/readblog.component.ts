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
sendFeedback(email: string ) {
    if (!email) {
      alert('No email available for this author.');
      return;
    }

    const mailtoLink = `mailto:${email}?subject=Feedback on your blog "${this.blog?.title}"&body=Hi ${this.blog?.authorName},%0D%0A%0D%0AI wanted to share some feedback on your blog titled "${this.blog?.title}".%0D%0A%0D%0AThanks!`;
    window.location.href = mailtoLink;
  }
}