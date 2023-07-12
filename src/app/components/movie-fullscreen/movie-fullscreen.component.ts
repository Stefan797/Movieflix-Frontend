import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movie-fullscreen',
  templateUrl: './movie-fullscreen.component.html',
  styleUrls: ['./movie-fullscreen.component.sass']
})
export class MovieFullscreenComponent {

  constructor(private router: Router, private httpService: HttpService) {
   
  }

  ngOnInit(): void {
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  isVideoPlaying = false;

  toggleVideo() {
    const video = document.getElementById('movie') as HTMLVideoElement;

    if (video.paused) {
      video.play();
      this.isVideoPlaying = true;
    } else {
      video.pause();
      this.isVideoPlaying = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.toggleVideo();
    }
  }

  soundpanel() {
    this.router.navigate(['/home']);
  }

  showNextMovie() {
    this.router.navigate(['/home']);
  }

  openFullscreen() {
    this.router.navigate(['/home']);
  }
}
