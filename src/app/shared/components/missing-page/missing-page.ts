/**
 * Created by dell on 2017/5/9.
 */
import { Component,Input } from '@angular/core';

@Component({
  selector: 'missing-default-content',
  template: `
    <div class="spellMissingPage1">
      <div class="missingBg">
        <p>
          <img src="../../../../assets/images/missing-picture.png">
        </p>
      </div>
      <!--<p>{{text}}</p>-->
    </div>
  `,
  styleUrls: ['./missing-page.scss'],
})

export class MissingDefaultContentComponent {
  @Input() text: string;
  @Input() srcurl: string;
  constructor(
  ) { }
}
// 暂时没有该类拼球信息，去看看其他吧~




