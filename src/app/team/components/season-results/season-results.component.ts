import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../team.service';
import { ReportTeamMatchVO } from '../../../domain/interface.model';

@Component({
  selector: 'season-results',
  templateUrl: './season-results.component.html',
  styleUrls: ['./season-results.component.scss']
})
export class SeasonResultsComponent {
  public result:ReportTeamMatchVO;
  public progressBarOpts: Array<any> = [{
    color: '#e94141',
    percent: 0,
    size: 90,
    border: 3
  }, {
    color: '#89d035',
    percent: 0,
    size: 90,
    border: 3
  }, {
    color: '#23a3ec',
    percent: 0,
    size: 90,
    border: 3
  }]

  constructor() {}

  setPercent(result): void {
    this.result = result;
    let progressBarOpts = this.progressBarOpts;
    progressBarOpts[0].percent = result.winsPercentum;
    progressBarOpts[1].percent = result.flatPercentum;
    progressBarOpts[2].percent = result.negativePercentum;
  }
}
