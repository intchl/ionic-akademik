import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListMatkulPageRoutingModule } from './list-matkul-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ListMatkulPage } from './list-matkul.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ListMatkulPageRoutingModule,
  ],
  declarations: [ListMatkulPage],
})
export class ListMatkulPageModule {}
