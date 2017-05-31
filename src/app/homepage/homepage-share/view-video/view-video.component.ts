import {Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";


@Component({
  selector: 'seed-view-video',
  templateUrl: 'view-video.component.html',
  styleUrls: ['view-video.component.scss'],
})
export class ViewVideoComponent implements OnInit {
  public _link:string;
  public _poster:string;

  @Input()
  get link(){
    return this._link
  }
  set link(val:string){
    this._link = val;
  }
  @Input()
  get poster(){
    return this._poster
  }
  set poster(val:string){
    this._poster = val;
  }
  @Input() modal;
  @Input() content;

  @ViewChild('player') player;
  private parentSubject: Subject<any> = new Subject<any>();
  constructor(
    public element: ElementRef,
  ) {}

  resize(event) {
    let width = this.element['nativeElement'].offsetWidth;
    let height = this.element['nativeElement'].offsetHeight;

    this.parentSubject.next({
      width: width,
      height: height,
    });

  }

  orientationChange(event) {
    window.setTimeout(() => {
      this.resize(event);
    }, 150);
  }

  dismiss() {
    this.modal.hide();
    this.content.disableScroll();
    this.player.nativeElement.load();
  }


  ngOnInit(){

  }



  ngOnDestroy(){
    this.player.nativeElement.src = '';
    this.player.nativeElement.load();
  }
}
