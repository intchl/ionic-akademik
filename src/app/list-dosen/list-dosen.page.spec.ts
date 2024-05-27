import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDosenPage } from './list-dosen.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('ListDosenPage', () => {
  let component: ListDosenPage;
  let fixture: ComponentFixture<ListDosenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDosenPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDosenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
