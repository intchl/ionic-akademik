import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Krs } from '../shared/Krs';
import { KrsService } from '../shared/krs.service';
import { Matkul } from '../shared/Matkul';
import { MatkulService } from '../shared/matkul.service';
import { Mahasiswa } from '../shared/Mahasiswa';
import { MahasiswaService } from '../shared/mahasiswa.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dosen } from '../shared/Dosen';
import { DosenService } from './../shared/dosen.service';

@Component({
  selector: 'app-list-krs',
  templateUrl: './list-krs.page.html',
  styleUrls: ['./list-krs.page.scss'],
})
export class ListKrsPage implements OnInit {
  Krss: Krs[] = [];
  Matkuls: Matkul[] = [];
  Mahasiswas: Mahasiswa[] = [];
  Dosens: Dosen[] = [];
  presentingElement: Element | null = null;
  krsForm: FormGroup;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modal: ModalController,
    private krsService: KrsService,
    private matkulService: MatkulService,
    private mahasiswaService: MahasiswaService,
    private dosenService: DosenService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.krsForm = this.fb.group({
      mahasiswa: [''],
      matkul: [''],
    });
    this.fetchKrss();
    this.fetchMatkuls();
    this.fetchMahasiswas();
    this.fetchDosens();
    this.presentingElement = document.querySelector('.ion-page');
  }

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

  fetchMahasiswas() {
    this.mahasiswaService
      .getMahasiswaList()
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

  getMatkulName(matkulKey: string): string {
    const matkul = this.Matkuls.find((d) => d.$key === matkulKey);
    return matkul ? `${matkul.nama_mk} ` : '';
  }
  getMatkulId(matkulKey: string): string {
    const matkul = this.Matkuls.find((d) => d.$key === matkulKey);
    return matkul ? `${matkul.kode_mk} -  ${matkul.sks} SKS` : '';
  }

  getMatkulDosen(matkulKey: string): string {
    const matkul = this.Matkuls.find((d) => d.$key === matkulKey);
    return matkul ? `${this.getDosenName(matkul.dosen)}` : '';
  }

  getMahasiswaName(mahasiswaKey: string): string {
    const mahasiswa = this.Mahasiswas.find((d) => d.$key === mahasiswaKey);
    return mahasiswa ? mahasiswa.nama_ms : '';
  }

  formSubmit() {
    if (!this.krsForm.valid) {
      return false;
    } else {
      return this.krsService
        .createKrs(this.krsForm.value)
        .then((res) => {
          console.log(res);
          this.modal.dismiss();
          this.krsForm.reset();
          this.router.navigate(['/../list-krs/']);
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

  fetchKrss() {
    this.krsService
      .getKrsList()
      .snapshotChanges()
      .subscribe((res) => {
        this.Krss = [];
        res.forEach((item) => {
          let a: any = item.payload.toJSON();
          a['$key'] = item.key;
          this.Krss.push(a as Krs);
        });
      });
  }

  deleteKrs(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.krsService.deleteKrs(id);
    }
  }
}
