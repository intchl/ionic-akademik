import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListDosenPageRoutingModule } from './list-dosen-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ListDosenPage } from './list-dosen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    ListDosenPageRoutingModule,
  ],
  declarations: [ListDosenPage],
})
export class ListDosenPageModule {}
