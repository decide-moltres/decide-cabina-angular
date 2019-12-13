import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotingService } from '../services/voting.service';
import { Voting } from '../models/voting.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  voting: Voting;

  constructor(private votingService: VotingService, private route: ActivatedRoute) { }

  ngOnInit() {

    const id = +this.route.snapshot.params.id;
    this.votingService.getVoting(id).subscribe((res) => {
      this.voting = this.votingService.parseVoting(res[0] as any);
    }, error => {
      console.log(error);
    });




  }
}
