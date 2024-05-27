import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KrsService } from '../shared/krs.service';
import { Matkul } from '../shared/Matkul';
import { MatkulService } from '../shared/matkul.service';
import { Mahasiswa } from '../shared/Mahasiswa';
import { MahasiswaService } from '../shared/mahasiswa.service';

@Component({
  selector: 'app-edit-krs',
  templateUrl: './edit-krs.page.html',
  styleUrls: ['./edit-krs.page.scss'],
})
export class EditKrsPage implements OnInit {
  Mahasiswas: Mahasiswa[] = [];
  Matkuls: Matkul[] = [];
  updateKrsForm: FormGroup;
  id: any;
  constructor(
    private krsService: KrsService,
    private matkulService: MatkulService,
    private mahasiswaService: MahasiswaService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.krsService

      .getKrs(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.updateKrsForm.setValue(res);
      });
  }

  ngOnInit() {
    this.updateKrsForm = this.fb.group({
      mahasiswa: [''],
      matkul: [''],
    });
    console.log(this.updateKrsForm.value);
    this.fetchMahasiswas();
    this.fetchMatkuls();
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

  updateForm() {
    this.krsService
      .updateKrs(this.id, this.updateKrsForm.value)
      .then(() => {
        this.router.navigate(['/../list-krs//']);
      })
      .catch((error) => console.log(error));
  }
}
