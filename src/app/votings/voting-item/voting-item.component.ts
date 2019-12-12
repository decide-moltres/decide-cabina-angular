import { Component, OnInit, Input } from '@angular/core';
import { Voting } from 'src/app/models/voting.model';

@Component({
  selector: 'app-voting-item',
  templateUrl: './voting-item.component.html',
  styleUrls: ['./voting-item.component.css']
})
export class VotingItemComponent implements OnInit {
  @Input() voting: Voting;

  constructor() { }

  ngOnInit() {
  }

}
