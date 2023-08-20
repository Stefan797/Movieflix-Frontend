import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LoadSingleMovieService } from 'src/app/services/load-single-movie.service';

@Component({
  selector: 'app-movie-fullscreen',
  templateUrl: './movie-fullscreen.component.html',
  styleUrls: ['./movie-fullscreen.component.sass']
})
export class MovieFullscreenComponent {
  response: any = [];

  constructor(private router: Router, private httpService: HttpService, private elementRef: ElementRef, private loadSingleMovieService: LoadSingleMovieService) {

  }

  ngOnInit(): void {
    this.response = this.loadSingleMovieService.getSingleM();
    console.log(this.response);
  }

  backToHome() {
    this.router.navigate(['/' + this.response[1]]);
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

  volumeScrollbarOpacity: number = 0;

  showVolumeScrollbar() {
    this.volumeScrollbarOpacity = 1;
  }

  hideVolumeScrollbar() {
    this.volumeScrollbarOpacity = 0;
  }

  adjustVolume(event: MouseEvent) {
    if (event.buttons === 1) {
      const soundImg = document.getElementById("sound-img");
      const y = event.clientY - soundImg.getBoundingClientRect().top;
      const volume = 1 - (y / soundImg.offsetHeight);

      // Hier kannst du den Lautstärkewert nutzen, um die Lautstärke zu regulieren
      console.log("Lautstärke:", volume);
    }
  }

  showNextMovie() {
    this.router.navigate(['/home']);
  }

  openFullscreen() {
    const videoPlayer = this.elementRef.nativeElement.querySelector('video');

    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
      videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
      videoPlayer.msRequestFullscreen();
    }
  }
}
