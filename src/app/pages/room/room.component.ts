import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  currentStream: any;
  listUser: Array<any> = [];
  constructor() {}

  ngOnInit(): void {
    this.checkMediaDevices();
  }

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .then((stream) => {
          this.currentStream = stream;
          this.addVideoUser(stream);
        })
        .catch((e) => console.error('Not permission granted'));
    } else {
      console.error('Error Not media devices detected');
    }
  };

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
  };
}
