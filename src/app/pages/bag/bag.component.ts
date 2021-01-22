import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bag } from './bag';
import { Filter, BagService } from './bag.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/@core/utils/data.service';
import { Bestellungartikel } from 'app/@core/models/bestellartikel';
import { HttpService } from 'app/@core/utils/http.service';


@Component({
  selector: 'ngx-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {

  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private http: HttpService,private fb: FormBuilder, public data: DataService) {
    
  }

  ngOnInit() {
    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });


  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  thirdSubmit() {
    this.http.postBestellung(this.data.currentBestellung).subscribe((bestellung)=>{
      this.data.currentBestellung = bestellung;

      this.data.bestellartikel.forEach((ba)=>{
        ba.bestellung = this.data.currentBestellung;

        this.http.postBestellungartikel(ba).subscribe((result)=>{
        });
      })
    })

    this.wait(1000);

    this.http.printBestellung(this.data.currentBestellung.id).subscribe(data => {
    });
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
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
      console.log(value.artikel.preis);
      sum = sum + value.artikel.preis;
    });
    console.log(sum);
    return sum;
  }

  resetStepper(){
    this.data.bestellartikel = [];
    this.data.currentBestellung = {
      id: null,
      tischnr: 13
    };
  }

  onEdit(item: Bestellungartikel) {
    item.inEdit = true;
  }
  onSave(item: Bestellungartikel) {
    item.inEdit = false;
  }
}
