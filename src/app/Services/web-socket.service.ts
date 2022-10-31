import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  events = ['user-connected', 'user-disconnected'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();    

  constructor(private socket: Socket) {
    this.listener();    
  }

  listener = () => {
    this.events.forEach((evenName) => {
      this.socket.on(evenName, (data: any) =>
        this.cbEvent.emit({
          name: evenName,
          data: data,
        })
      );
    });
  };

  joinRoom = (data:any) => {
    this.socket.emit('join', data);
  }
}
