import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit() {
  }
}
