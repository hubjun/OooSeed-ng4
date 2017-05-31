import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'circular-progress',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit {
  @Input() opts: Array<any>;
  constructor() { }
  drawBar(canvas, opts): void {
    let context = canvas.getContext('2d');
    let wdpr = window.devicePixelRatio;
    // let dpr = parseInt(document.getElementsByTagName('html')[0].getAttribute('data-dpr'));
    let clientWidth = document.documentElement.clientWidth;
    let canvasWidth = Math.floor(clientWidth * 45 * wdpr / 720);
    let radius = canvasWidth * 0.8 * 0.5;
    let fontSize = 13 + 'px';
    canvas.setAttribute('width', canvasWidth + 'px');
    canvas.setAttribute('height', canvasWidth + 'px');

    context.translate(canvasWidth / 2, canvasWidth / 2);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
    context.lineWidth = opts.border;
    context.strokeStyle = "#eee";
    context.stroke();

    //context.font = 'bold +"13 * dpr"+ Arial';
    context.font = `bold ${fontSize} Arial`;
    context.textAlign = "center";
    context.textBaseline = 'middle';

    context.fillStyle = opts.color;
    context.fillText(`${opts.percent}%`, 0, 2);
    let start = 0,
      end = 0;
    context.beginPath();
    context.arc(0, 0, radius, -90 * Math.PI / 180, (opts.percent * 3.6 - 90) * Math.PI / 180, false);
    context.lineWidth = opts.border;
    context.strokeStyle = opts.color;
    context.stroke();


  }
  ngOnInit() {
    let canvas = document.querySelectorAll('canvas');
    let opts = this.opts;
    for (let i = 0; i < canvas.length; i++) {
      this.drawBar(canvas[i], opts[i]);
    }
  }
}
