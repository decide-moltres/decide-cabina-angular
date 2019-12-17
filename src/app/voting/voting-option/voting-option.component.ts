import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-voting-option',
  templateUrl: './voting-option.component.html',
  styleUrls: ['./voting-option.component.css']
})
export class VotingOptionComponent implements OnInit {

  @Input() option: Option;
  constructor() { }

  ngOnInit() {
  }

}
