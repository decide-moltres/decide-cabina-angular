import { Component, OnInit } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Voting } from '../models/voting.model';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.css']
})
export class VotingsComponent implements OnInit {

  votings: Voting[] = [];

  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.votingService.getVotings().subscribe((res) => {
      this.votings = this.votingService.parseVotings(res as any);
      console.log(this.votings);
    }, error => {
      console.log(error);
    });

  }

}
