import { Component } from '@angular/core';
import { sharedImports } from '../../../shared-imports';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../Services/content.service';
import { Router } from '@angular/router';
import { Blog } from '../../../blog.model';

@Component({
  selector: 'app-addblog',
  standalone: true,
  imports: [sharedImports,CommonModule,FormsModule],
  templateUrl: './addblog.component.html',
  styleUrl: './addblog.component.css'
})
export class AddblogComponent {
    isUploading: boolean = false;
    uploadProgress: number = 0;  
    imagePreview: string = '';
    selectedImageName: string = '';
  blog:Blog ={
    title: '',
    description: '',
    image: '',
    authorId:'',
    authorEmail:'',
    authorName:''
  }

  constructor(private contentservice:ContentService,private router:Router ){}

   triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  // Handle the image selection
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageName = file.name; // Store file name
      this.imagePreview = URL.createObjectURL(file); // Just for local preview
    }
  }

   uploadToImgBB(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      const img_url='https://api.imgbb.com/1/upload';
      const apiKey ='78fb6dc7847032c281dc89f4ca71a41b';
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `${img_url}?key=${apiKey}`, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        }
      };

      xhr.onloadstart = () => {
        this.isUploading = true;
      };

      xhr.onloadend = () => {
        this.isUploading = false;
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          resolve(response.data.url);
        } else {
          reject('Upload failed');
        }
      };

      xhr.onerror = () => {
        reject('Upload failed');
      };

      xhr.send(formData);
    });
  }

   // Submit the form
  onSubmit(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const loggedInUser = sessionStorage.getItem('loggedInUser'); // Get current user ID

    if (file && this.blog.title && this.blog.description && loggedInUser) {
      this.uploadToImgBB(file).then(imageUrl => {
        this.blog.image = imageUrl;
        this.blog.authorId = loggedInUser;

        this.contentservice.createPost(this.blog).subscribe(
          (response) => {
            alert('🎉 Blog created successfully!');
            this.onReset(); // Reset after successful creation
            this.router.navigate(['']);
          },
          (error) => {
            alert('🚨 Failed to create blog');
            console.error(error);
          }
        );
      }).catch(err => {
        console.error('Image upload failed', err);
      });
    } else {
      alert('❗ Please fill all fields and make sure you are logged in.');
    }
  }


  // Reset the form
  onReset(): void {
    this.blog = {
      title: '',
      description: '',
      image: ''
    };
    this.imagePreview = ''; // Reset image preview
    this.selectedImageName = ''; // Reset image name
  }
}
