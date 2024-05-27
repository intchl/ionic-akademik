import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ListKrsPageRoutingModule } from './list-krs-routing.module';
import { ListKrsPage } from './list-krs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ListKrsPageRoutingModule,
  ],
  declarations: [ListKrsPage],
})
export class ListKrsPageModule {}
