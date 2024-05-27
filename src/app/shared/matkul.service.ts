import { Injectable } from '@angular/core';
import { Matkul } from '../shared/Matkul';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class MatkulService {
  matkulListRef: AngularFireList<any>;
  matkulRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createMatkul(matkul: Matkul) {
    return this.matkulListRef.push({
      nama_mk: matkul.nama_mk,
      kode_mk: matkul.kode_mk,
      sms: matkul.sms,
      sks: matkul.sks,
      dosen: matkul.dosen,
    });
  }

  // Get Single
  getMatkul(id: string) {
    this.matkulRef = this.db.object('/matkul/' + id);
    return this.matkulRef;
  }

  // Get List
  getMatkulList() {
    this.matkulListRef = this.db.list('/matkul');
    return this.matkulListRef;
  }

  // Update
  updateMatkul(id: any, matkul: Matkul) {
    return this.matkulRef.update({
      nama_mk: matkul.nama_mk,
      kode_mk: matkul.kode_mk,
      sms: matkul.sms,
      sks: matkul.sks,
      dosen: matkul.dosen,
    });
  }

  // Delete
  deleteMatkul(id: string) {
    this.matkulRef = this.db.object('/matkul/' + id);
    this.matkulRef.remove();
  }
}
