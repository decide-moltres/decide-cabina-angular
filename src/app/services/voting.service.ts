import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Voting } from '../models/voting.model';
import { Option } from '../models/option.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  getVotingsByUserId(id: number) {
    return this.http.get(`${environment.api_url}voting/user/?id=${id}`);
  }

  parseVotings(votings: any) {
    const res: Voting[] = [];
    votings.forEach(v => {
      const options: Option[] = [];
      v.question.options.forEach(o => {
        options.push(new Option(o.number, o.option, false));
      });
      const question = new Question(v.question.desc, options);
      res.push(new Voting(v.id, v.name, v.desc, question, v.start_date, v.end_date, v.pub_key, this.votingTipe(v.tipe)));
    });
    return res;
  }

  votingTipe(t: string) {
    if (t === 'S') {
      return 'Senate';
    } else if (t === 'P') {
      return 'Presidential';
    } else if (t === 'PP') {
      return 'Presidential primaries';
    } else {
      return 'Senate primaries';
    }
  }

  parseVoting(voting: any) {
    const options: Option[] = [];
    voting.question.options.forEach(o => {
      options.push(new Option(o.number, o.option, false));
    });
    const question = new Question(voting.question.desc, options);
    return new Voting(voting.id, voting.name, voting.desc, question, voting.start_date,
      voting.end_date, voting.pub_key, this.votingTipe(voting.tipe));
  }

  getVoting(id: number) {
    return this.http.get(`${environment.api_url}voting/?id=${id}`);
  }

  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.api_url}store/`, data, { headers });
  }
}
