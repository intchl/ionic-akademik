import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditKrsPageRoutingModule } from './edit-krs-routing.module';

import { EditKrsPage } from './edit-krs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditKrsPageRoutingModule,
  ],
  declarations: [EditKrsPage],
})
export class EditKrsPageModule {}
