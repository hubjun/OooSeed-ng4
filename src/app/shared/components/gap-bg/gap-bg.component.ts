import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'gap-bg',
  template: `
    <div class="gap"></div>
  `,
  styleUrls: ['./gap-bg.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GapBgComponent {

  constructor() { }

}
