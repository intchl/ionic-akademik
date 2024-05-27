import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Dosen } from '../shared/Dosen';
import { DosenService } from './../shared/dosen.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-dosen',
  templateUrl: './list-dosen.page.html',
  styleUrls: ['./list-dosen.page.scss'],
})
export class ListDosenPage implements OnInit {
  Dosens: Dosen[] = [];
  presentingElement: Element | null = null;
  dosenForm: FormGroup;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modal: ModalController,
    private dosenService: DosenService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dosenForm = this.fb.group({
      nama_d: [''],
      nidn: [''],
    });
    this.fetchDosens();
    this.presentingElement = document.querySelector('.ion-page');
  }
  formSubmit() {
    if (!this.dosenForm.valid) {
      return false;
    } else {
      return this.dosenService
        .createDosen(this.dosenForm.value)
        .then((res) => {
          console.log(res);
          this.modal.dismiss();
          this.dosenForm.reset();
          this.router.navigate(['/../list-dosen/']);
        })
        .catch((error) => console.log(error));
    }
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    role === 'confirm' && this.modal.dismiss();
  };

  fetchDosens() {
    this.dosenService
      .getDosenList()
      .snapshotChanges()
      .subscribe((res) => {
        this.Dosens = [];
        res.forEach((item) => {
          let a: any = item.payload.toJSON();
          a['$key'] = item.key;
          this.Dosens.push(a as Dosen);
        });
      });
  }

  deleteDosen(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.dosenService.deleteDosen(id);
    }
  }
}
