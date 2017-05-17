/**
 * Created by 陈文豪 on 2017/5/4.
 */
import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, ViewChild, ElementRef, OnInit,
  HostListener
} from '@angular/core';
import {ToolsService} from "../../tools/tools.service";
import {Subject} from "rxjs";

@Component({
  selector: 'seed-content',
  template: `
    <seed-toolbar-nav></seed-toolbar-nav>  
    <div class="seed-scroll-content" #content (scroll)="onScroll()">
     <ng-content></ng-content>
    </div>
    <div
      *ngIf="isVisible"
      [class.show]="isVisible"
      id="seed-scroll-top"
      (click)="scrollTop()"
    >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarContentComponent{
  private isVisible:boolean = false;
  private unsbscribe:Subject<void> = new Subject<void>();
  @ViewChild('content') private content:ElementRef;

  constructor(
    private tools:ToolsService
  ){
    this.tools.scrollTop$
      .takeUntil(this.unsbscribe)
      .subscribe(() => {
        this.scrollTop();
    })
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


  onScroll() {
    let distance = this.content.nativeElement.scrollTop;
    if(distance > 100) {
      this.isVisible = true;
    }else if(this.isVisible && distance < 100) {
      this.isVisible = false;
    }
  }

  ngOnDestroy(){
    this.unsbscribe.next();
    this.unsbscribe.complete();
  }
}

