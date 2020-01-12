import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Voting } from '../models/voting.model';
import { Option } from '../models/option.model';
import { Question } from '../models/question.model';
import { PoliticalParty } from '../models/politicalParty.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  getVotingsByUserId(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}voting/user/?id=${id}`);
  }

  parseVotings(votings: any): Voting[] {
    const res: Voting[] = [];
    votings.forEach(v => {
      const options: Option[] = [];
      v.question.options.forEach(o => {
        options.push(new Option(o.number, o.option, false));
      });
      const question = new Question(v.question.desc, options);
      res.push(new Voting(v.id, v.name, v.desc, question, v.start_date, v.end_date, v.pub_key, this.votingTipe(v.tipe),
        this.votingProvince(v.province), v.political_party));
    });
    return res;
  }

  votingTipe(t: string): string {
    if (t === 'S') {
      return 'Senate';
    } else if (t === 'P') {
      return 'Presidential';
    } else if (t === 'PP') {
      return 'Presidential primaries';
    } else if (t === 'SP') {
      return 'Senate primaries';
    } else {
      return 'Other';
    }
  }

  votingProvince(p: string): string {
    if (p === 'S') {
      return 'Sevillistán';
    } else if (p === 'H') {
      return 'Huelvistán';
    } else if (p === 'C') {
      return 'Cadistán';
    } else {
      return '';
    }
  }

  parseVoting(voting: any): Voting {
    const options: Option[] = [];
    let party: PoliticalParty;

    if (voting.political_party !== undefined && voting.political_party !== '') {
      party = new PoliticalParty({ ...voting.political_party });
    } else {
      party = new PoliticalParty();
    }

    voting.question.options.forEach(o => {
      options.push(new Option(o.number, o.option, false));
    });
    const question = new Question(voting.question.desc, options);
    return new Voting(voting.id, voting.name, voting.desc, question, voting.start_date,
      voting.end_date, voting.pub_key, this.votingTipe(voting.tipe), this.votingProvince(voting.province), voting.political_party);
  }

  getVoting(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}voting/?id=${id}`);
  }

  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }): Observable<object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.apiUrl}store/`, data, { headers });
  }
}
