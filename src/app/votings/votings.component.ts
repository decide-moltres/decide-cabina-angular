import { Component, OnInit } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Voting } from '../models/voting.model';
import { TouchSequence } from 'selenium-webdriver';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.css']
})
export class VotingsComponent implements OnInit {

  votings: Voting[] = [];

  constructor(private votingService: VotingService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const tokenid = this.authService.getToken();
    this.authService.getUser(tokenid).subscribe((res) => {
      const id = (res as any).id;
      this.votingService.getVotingsByUserId(id).subscribe((res2) => {
        this.votings = this.votingService.parseVotings(res2 as any).filter(v => v.startDate !== null);
      }, error => {
        console.log(error);
      });
    });
  }

}
