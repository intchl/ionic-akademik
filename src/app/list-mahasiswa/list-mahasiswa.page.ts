import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Mahasiswa } from '../shared/Mahasiswa';
import { MahasiswaService } from './../shared/mahasiswa.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-mahasiswa',
  templateUrl: './list-mahasiswa.page.html',
  styleUrls: ['./list-mahasiswa.page.scss'],
})
export class ListMahasiswaPage implements OnInit {
  Mahasiswas: Mahasiswa[] = [];
  presentingElement: Element | null = null;
  MahasiswaForm: FormGroup;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modal: ModalController,
    private MahasiswaService: MahasiswaService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.MahasiswaForm = this.fb.group({
      nama_ms: [''],
      nim: [''],
      sms: [''],
    });
    this.fetchMahasiswas();
    this.presentingElement = document.querySelector('.ion-page');
  }
  formSubmit() {
    if (!this.MahasiswaForm.valid) {
      return false;
    } else {
      return this.MahasiswaService.createMahasiswa(this.MahasiswaForm.value)
        .then((res) => {
          console.log(res);
          this.modal.dismiss();
          this.MahasiswaForm.reset();
          this.router.navigate(['/../list-mahasiswa//']);
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

  fetchMahasiswas() {
    this.MahasiswaService.getMahasiswaList()
      .snapshotChanges()
      .subscribe((res) => {
        this.Mahasiswas = [];
        res.forEach((item) => {
          let a: any = item.payload.toJSON();
          a['$key'] = item.key;
          this.Mahasiswas.push(a as Mahasiswa);
        });
      });
  }

  deleteMahasiswa(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.MahasiswaService.deleteMahasiswa(id);
    }
  }
}
