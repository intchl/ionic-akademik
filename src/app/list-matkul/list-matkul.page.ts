import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Matkul } from '../shared/Matkul';
import { MatkulService } from './../shared/matkul.service';
import { Dosen } from '../shared/Dosen';
import { DosenService } from './../shared/dosen.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-matkul',
  templateUrl: './list-matkul.page.html',
  styleUrls: ['./list-matkul.page.scss'],
})
export class ListMatkulPage implements OnInit {
  Matkuls: Matkul[] = [];
  Dosens: Dosen[] = [];
  presentingElement: Element | null = null;
  matkulForm: FormGroup;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modal: ModalController,
    private matkulService: MatkulService,
    private dosenService: DosenService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.matkulForm = this.fb.group({
      nama_mk: [''],
      kode_mk: [''],
      sms: [''],
      sks: [''],
      dosen: [''], // Menambahkan kontrol dosen
    });
    this.fetchMatkuls();
    this.fetchDosens();
    this.presentingElement = document.querySelector('.ion-page');
  }

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

  getDosenName(dosenKey: string): string {
    const dosen = this.Dosens.find((d) => d.$key === dosenKey);
    return dosen ? dosen.nama_d : '';
  }

  formSubmit() {
    if (!this.matkulForm.valid) {
      return false;
    } else {
      return this.matkulService
        .createMatkul(this.matkulForm.value)
        .then((res) => {
          console.log(res);
          this.modal.dismiss();
          this.matkulForm.reset();
          this.router.navigate(['/../list-matkul/']);
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

  fetchMatkuls() {
    this.matkulService
      .getMatkulList()
      .snapshotChanges()
      .subscribe((res) => {
        this.Matkuls = [];
        res.forEach((item) => {
          let a: any = item.payload.toJSON();
          a['$key'] = item.key;
          this.Matkuls.push(a as Matkul);
        });
      });
  }

  deleteMatkul(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.matkulService.deleteMatkul(id);
    }
  }
}
