import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsComponent } from './votings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VotingItemComponent } from './voting-item/voting-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('VotingsComponent', () => {
  let component: VotingsComponent;
  let fixture: ComponentFixture<VotingsComponent>;
  let element: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingsComponent, VotingItemComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have', () => {
    const navbarBrand = element.querySelector('.side-title');
    expect(navbarBrand.textContent).toContain('Votings');
  });

  it('should have', () => {
    const navbarBrand = element.querySelector('.h4');
    expect(navbarBrand.textContent).toContain('Select one of the following voting options:');
  });

});
