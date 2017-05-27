/**
 * Created by 陈文豪 on 2017/5/4.
 */
import {Component, ViewChild, ElementRef,} from '@angular/core';
import {ToolsService} from "../../tools/tools.service";
import {Subject} from "rxjs";

@Component({
  selector: 'seed-content',
  template: `
    <seed-toolbar-nav></seed-toolbar-nav>  
    <div
     #content
     id="seed-scroll-content"
     class="seed-scroll-content"  

      (scroll)="onScroll()"    

     >
      <ng-content></ng-content>
    </div>
    <div
      [class.show]="isVisible"
      id="seed-scroll-top" 
      (click)="scrollTop()"
    >
    </div>  
  `,
})
export class Content{
  public isVisible:boolean = false;
  public isScrolling:boolean;
  public unsbscribe:Subject<void> = new Subject<void>();
  @ViewChild('content') public content:ElementRef;

  constructor(
    public tools:ToolsService
  ){
    this.tools.scrollTop$
      .takeUntil(this.unsbscribe)
      .subscribe(() => {
        this.scrollTop();
    })
  }

  infiniteScroll(callback = null){
    if (callback == null)
      return;
    callback();
  }
  get getScrollElement() {
    return this.content.nativeElement;
  }
  get contentHeight(): number {
    return this.content.nativeElement.contentHeight;
  }

  get scrollHeight(): number {
    return this.content.nativeElement.scrollHeight;
  }

  get scrollWidth(): number {
    return this.content.nativeElement.scrollWidth;
  }

  scrollTop(): void {
    this.content.nativeElement.scrollTop = 0;
  }

  scrollTo(x: number, y: number, duration: number = 300, done?: Function) {
    return this.content.nativeElement.scrollTo(x, y, duration, done);
  }

   _onInfinityScroll(){
     this.infiniteScroll()
   }

   _onScroll(states:boolean){
     this.isScrolling = states
     console.log(this.isScrolling)
     this.isScrolling = false;
     console.log(this.isScrolling)
   }
  onScroll(event) {
    let windowHeight = this.content.nativeElement.offsetHeight;
    let distance = this.content.nativeElement.scrollTop;
    let scrollHeight = this.content.nativeElement.scrollHeight;
    if(distance > 200) {
      this.isVisible = true;
    }else if(this.isVisible && distance < 200) {
      this.isVisible = false;
    }
  }

  ngOnDestroy(){
    this.unsbscribe.next();
    this.unsbscribe.complete();
  }
}

