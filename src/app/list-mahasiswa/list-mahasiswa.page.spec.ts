import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMahasiswaPage } from './list-mahasiswa.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('ListMahasiswaPage', () => {
  let component: ListMahasiswaPage;
  let fixture: ComponentFixture<ListMahasiswaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMahasiswaPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMahasiswaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
