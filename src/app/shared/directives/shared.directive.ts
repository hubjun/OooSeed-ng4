import {Directive, ElementRef,Input} from '@angular/core';

@Directive({
  selector: '[seed-roller]'
})
export class RollerDirective {

  @Input('seed-roller') render:boolean;



  constructor(
    private el:ElementRef
  ){
  }

  ngAfterViewInit(){
    if(this.render == true){
      this.setScroll();
    }
  }

  private setScroll(){
    let widths: number = 0;
    let parent = this.el.nativeElement.parentNode;
    let length = parent.children.length;
    for (let i = 0; i < length; i++) {
      widths += parent.children[i].offsetWidth;
    }
    parent.style.width = widths+'px';
  }
}
