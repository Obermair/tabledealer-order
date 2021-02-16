import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bag } from './bag';
import { Filter, BagService } from './bag.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/@core/utils/data.service';
import { Bestellungartikel } from 'app/@core/models/bestellartikel';
import { HttpService } from 'app/@core/utils/http.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {

  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(@Inject(LOCALE_ID, ) private locale: string, private router: Router, private http: HttpService,private fb: FormBuilder, public data: DataService) {
  }

  ngOnInit() {
    this.secondForm = this.fb.group({
      secondNr: ['', Validators.required],
      secondName: ['', Validators.required],
    });
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  thirdSubmit() {
    let currentDate = new Date();
    this.data.currentBestellung.bestellzeit = formatDate(currentDate, 'yyyy-MM-dd HH:mm', this.locale);
    this.data.currentBestellung.printed = false;

    this.http.postBestellung(this.data.currentBestellung).subscribe((bestellung)=>{
      this.data.currentBestellung = bestellung;

      this.baLoop().then(() => {
        this.wait(1000);

        this.http.checkPrinterUrl(this.data.veranstalter.printerUrl).subscribe((response) => {
          this.http.printBestellung(bestellung.id).subscribe(data => {
            this.resetStepper();
            this.data.showToast('success', 'Bestellung wurde erfolgreich abgeschickt.', 'bottom-right')
          });
        },
        (error) => {        
          this.resetStepper();          
          this.data.showToast('danger', 'Drucken fehlgeschlagen. Bitte gib einem Kellner Bescheid. DANKE.', 'bottom-right')
        });
      });
    })
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  baLoop() {
    let requests =  new Promise<void>((resolve, reject) => {
      
      this.data.bestellartikel.forEach((ba, index, array)=>{
        ba.bestellung = this.data.currentBestellung;
        this.http.postBestellungartikel(ba).subscribe((result)=>{
        });

        if (index === array.length -1) resolve();
      })
    });

    return requests;
  }

  incAmount(ba: Bestellungartikel){
    let a = this.data.bestellartikel.findIndex(item => item.artikel === ba.artikel)

    if(a != -1){
      this.data.bestellartikel[a].menge++;
    } 
    
    this.data.calcSum();
  }

  decAmount(ba: Bestellungartikel){
    let a = this.data.bestellartikel.findIndex(item => item.artikel === ba.artikel)
    
    if(a != -1){
      if(this.data.bestellartikel[a].menge == 1){
        this.data.bestellartikel.splice(a, 1);
      }
      else{
        this.data.bestellartikel[a].menge--;
      }
    }
    this.data.calcSum();
  }

  getPrice(){
    let sum = 0; 
    this.data.bestellartikel.forEach(function (value) {
      sum = sum + value.artikel.preis;
    });
    return sum;
  }

  resetStepper(){
    this.data.bestellartikel = [];
    this.data.currentBestellung = {
      id: null,
      tischnr: 13,
      name: 'Huber'
    };
  }

  onEdit(item: Bestellungartikel) {
    item.inEdit = true;
  }
  onSave(item: Bestellungartikel) {
    item.inEdit = false;
  }

  backToDash() {
    this.router.navigate(['pages/dashboard'])
  }
}
