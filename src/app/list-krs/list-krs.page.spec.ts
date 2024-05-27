import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListKrsPage } from './list-krs.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('ListKrsPage', () => {
  let component: ListKrsPage;
  let fixture: ComponentFixture<ListKrsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListKrsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListKrsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
