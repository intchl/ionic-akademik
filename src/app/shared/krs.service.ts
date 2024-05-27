import { Injectable } from '@angular/core';
import { Krs } from '../shared/Krs';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class KrsService {
  krsListRef: AngularFireList<any>;
  krsRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createKrs(krs: Krs) {
    return this.krsListRef.push({
      mahasiswa: krs.mahasiswa,
      matkul: krs.matkul,
    });
  }

  // Get Single
  getKrs(id: string) {
    this.krsRef = this.db.object('/krs/' + id);
    return this.krsRef;
  }

  // Get List
  getKrsList() {
    this.krsListRef = this.db.list('/krs');
    return this.krsListRef;
  }

  // Update
  updateKrs(id: any, krs: Krs) {
    return this.krsRef.update({
      mahasiswa: krs.mahasiswa,
      matkul: krs.matkul,
    });
  }

  // Delete
  deleteKrs(id: string) {
    this.krsRef = this.db.object('/krs/' + id);
    this.krsRef.remove();
  }
}
