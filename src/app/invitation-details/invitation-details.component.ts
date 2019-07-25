import {Component, OnInit} from '@angular/core';


declare const Waypoint: any;

@Component({
  selector: 'app-invitation-details',
  templateUrl: './invitation-details.component.html',
  styleUrls: ['./invitation-details.component.css']
})
export class InvitationDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const items = Array.from(document.getElementsByClassName('animate-box'));
    for (const item of items) {
      this.createWaypoint(item);
    }

  }

  createWaypoint(item: Element) {
    const waypoint = new Waypoint({
      element: item,
      handler: (direction) => {
        console.log('The direction is ' + direction);
        if (direction === 'down') {
          item.classList.remove('fadeOutUp', 'animated');
          item.classList.add('fadeInUp', 'animated');
        } else {
          item.classList.remove('fadeInUp', 'animated');
          item.classList.add('fadeOutUp', 'animated');
        }
      },
      offset: '95%'
    });
  }

}
