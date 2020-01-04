import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VotingService } from '../services/voting.service';
import { Voting } from '../models/voting.model';
import { Question } from '../models/question.model';
import { Option } from '../models/option.model';
import { ElGamal } from '../models/elgamal.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  voting: Voting;
  loading: boolean;
  submitted: boolean;
  datos: string;

 
  constructor(private router: Router, private votingService: VotingService,
              private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.votingService.getVoting(id).subscribe((res) => {
      this.voting = this.votingService.parseVoting(res[0] as any);
    }, error => {
      console.log(error);
    });
  }

  onSubmit(datos: string, event: Event) {
    if (datos === undefined) {
      console.log('Selecciona una opción');
      return;
    }
    event.preventDefault();
    this.submitted = true;
    this.loading = true;
    console.log('ENVIO');
    const v = this.decideEncrypt(datos);
    const tokenid = this.authService.getToken();
    this.authService.getUser(tokenid).subscribe((res) => {
      const id = (res as any).id;

      const data = {
        vote: { a: v.alpha.toString(), b: v.beta.toString() },
        voting: this.voting.id,
        voter: id,
        token: tokenid
      };
      const e = this.votingService.postData(data).subscribe((ser) => {
        console.log(ser);
        this.router.navigate(['']);
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  decideEncrypt(datos: string) {
    const bigmsg = BigInt.fromJSONObject(datos.toString());
    const asd = (this.voting.pubKey as any).p.toString();
    const asd2 = BigInt.fromJSONObject((this.voting.pubKey as any).p.toString());
    console.log(asd);
    console.log(asd2);

    const bigpk = {
      p: BigInt.fromJSONObject((this.voting.pubKey as any).p.toString()),
      g: BigInt.fromJSONObject((this.voting.pubKey as any).g.toString()),
      y: BigInt.fromJSONObject((this.voting.pubKey as any).y.toString())
    };

    console.log(`BigPK: ${bigpk.p}`);

    const cipher = ElGamal.encrypt(bigpk, bigmsg);
    return cipher;
  }
}

const BigInt = require('jsbn').BigInteger;
// ZERO AND ONE are already taken care of
BigInt.TWO = new BigInt('2', 10);

BigInt.setup = (callback: () => void) => {
  // nothing to do but go
  callback();
};

BigInt.prototype.toJSONObject = () => {
  return this.toString();
};

BigInt.fromJSONObject = (s: string) => {
  return new BigInt(s, 10);
};

BigInt.fromInt = (i: string) => {
  return BigInt.fromJSONObject('' + i);
};

BigInt.use_applet = false;




