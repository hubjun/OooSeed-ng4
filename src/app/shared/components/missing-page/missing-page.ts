/**
 * Created by dell on 2017/5/9.
 */
import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'missing-default-content',
  template: `
    <div class="spellMissingPage1">
      <div class="missingBg">
        <p>
          <img src="../../../../assets/images/missing-picture.png">
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./missing-page.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class MissingDefaultContentComponent {
  @Input() text: string;
  @Input() srcurl: string;
  constructor(
  ) { }
}
// 暂时没有该类拼球信息，去看看其他吧~




