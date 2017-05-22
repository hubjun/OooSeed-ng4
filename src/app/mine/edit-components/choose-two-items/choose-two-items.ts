
import {ToolsService} from "../../../shared/tools/tools.service";
import { Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'choose-two-items',
  template:`
    <div class="chooseitemsbox">
      <div class="bottombox">
        <div class="change-up">
          <p class="cansel"(click)="chooseout(1)">取消</p>
          <p class="success"(click)="chooseout(2)">完成</p>
        </div>
        <div class="change-down">
          <p>(可选2个)</p>
            <ul>
              <li *ngFor="let item of items;let i=index;"id='{{item.id}}'(click)="chooseit(i,item.id)">{{item.title}}</li>
            </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./choose-two-items.scss'],
})

export class ChooseItemsComponent {
  public choosearr:any={
    data:[],
    result:'',
    id:''
  }
  @Input() items:any;
  @Output()chooseindex=new EventEmitter();
  constructor( public ToolServices:ToolsService) {

  }
  chooseit(i,id){
    console.log(id)
    let liarr=[];
    let lis=document.querySelectorAll(".change-down ul li");

    if(lis[i].className=='active'){
      lis[i].className='';
    }else {
      let activenum=document.querySelectorAll(".change-down ul .active");
        if(activenum.length>=2){
          this.ToolServices.presentConfirm('最多只能选择两个！', 1);
          return;
        }
        lis[i].className='active';
      }

      for(let i=0;i<lis.length;i++)
      {
        if(lis[i].className=='active')
        {
          let attr=lis[i].id.slice(0,2);
          liarr.push({attr: attr, lableId: lis[i].id});
        }
      }
      this.choosearr.data=liarr;
  }
  chooseout(i){
    this.choosearr.result=i;
    this.chooseindex.emit(this.choosearr);
  }
}

