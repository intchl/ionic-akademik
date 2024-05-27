import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ListMahasiswaPageRoutingModule } from './list-mahasiswa-routing.module';
import { ListMahasiswaPage } from './list-mahasiswa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ListMahasiswaPageRoutingModule,
  ],
  declarations: [ListMahasiswaPage],
})
export class ListMahasiswaPageModule {}
