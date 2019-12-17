import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VotingsComponent } from './votings/votings.component';
import { VotingComponent } from './voting/voting.component';
import { HttpClientModule } from '@angular/common/http';
import { VotingItemComponent } from './votings/voting-item/voting-item.component';
import { VotingOptionComponent } from './voting/voting-option/voting-option.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    VotingsComponent,
    VotingComponent,
    VotingItemComponent,
    VotingOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
