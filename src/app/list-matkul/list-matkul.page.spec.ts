import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMatkulPage } from './list-matkul.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('ListMatkulPage', () => {
  let component: ListMatkulPage;
  let fixture: ComponentFixture<ListMatkulPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMatkulPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMatkulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
