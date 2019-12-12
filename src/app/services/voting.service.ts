import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Voting } from '../models/voting.model';
import { Option } from '../models/option.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  getVotings() {
    return this.http.get(`${environment.api_url}voting/`);
  }

  parseVotings(votings: any) {
    const res: Voting[] = [];
    votings.forEach(v => {
      const options: Option[] = [];
      v.question.options.forEach(o => {
        options.push(new Option(o.number, o.option));
      });
      const question = new Question(v.question.desc, options);
      res.push(new Voting(v.id, v.name, v.desc, question, v.start_date, v.end_date));
    });
    return res;
  }
}
