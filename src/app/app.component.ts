import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';
import { sharedImports } from './shared-imports';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,sharedImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

quotes = [
    '“your the universe feeling itself.”',
    '“i prayed for love ,the love lasted but lover left.”',
    '“Dream it. Wish it. Do it.”',
    '“You Are That.”'
  ];
  currentQuote = '';


  isMuted = false;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

ngAfterViewInit() {
  this.audioPlayer.nativeElement.volume = 0.1;
}

  ngOnInit() {
    // Rotate quote every 10 sec
    setInterval(() => {
      this.showRandomQuote();
    }, 10000);
  }

  showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[randomIndex];

    const quoteBox = document.querySelector('.quote-popup') as HTMLElement;
    quoteBox.classList.add('show');

    // Auto-hide after 10s
    setTimeout(() => {
      quoteBox.classList.remove('show');
    }, 15000);
  }
  
  hideQuote() {
  const quoteBox = document.querySelector('.quote-popup') as HTMLElement;
  quoteBox.classList.remove('show');
}


  toggleMute() {
    this.isMuted = !this.isMuted;
  }
  constructor(private authservice:AuthService,private router:Router) {}; 

  newblog(){
  if(this.authservice.isLoggedIn()){
    this.router.navigate(['/addblog']);
  }else{
    this.router.navigate(['login']);
  }
}

loginStatus():boolean{
 return this.authservice.isLoggedIn();
}

 login():void {
    this.router.navigate(['/login']);
    
  }

  logout():void{
    this.authservice.logout(); 
    
  }

  goHome() {
    this.router.navigate(['/']); 
  }

  
}


