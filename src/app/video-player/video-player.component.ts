import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  player: YT.Player;
  id = 'ufuD50wC25w';
  @Output()
  notify = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  playVideo() {
    if (this.player != null) {
      this.player.playVideo();
    }
  }

  savePlayer(player) {
    this.playVideoOnFullScreen(player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
    if (event.data === YT.PlayerState.ENDED) {
      this.notify.emit();
    }
  }

  playVideoOnFullScreen(player: YT.Player) {
    const iframe = player.getIframe();
    iframe.width = '100%';
    iframe.height = '100%';
    player.playVideo();
  }
}
