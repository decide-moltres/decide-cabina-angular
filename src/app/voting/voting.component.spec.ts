import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingComponent } from './voting.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('VotingComponent', () => {
    let component: VotingComponent;
    let fixture: ComponentFixture<VotingComponent>;
    let element: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VotingComponent],
            imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VotingComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
