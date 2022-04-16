import { Component, Inject, LOCALE_ID } from "@angular/core";

import { HttpService } from "../../@core/utils/http.service";
import { DataService } from "app/@core/utils/data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouteStateService } from "app/@core/utils/route-state.service";
import { formatDate } from '@angular/common';
import { Bestellungartikel } from 'app/@core/models/bestellartikel';


@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  
  statusCards: string;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  public cashedItems: Bestellungartikel[] = []; 
  public cashedSum: number;

  constructor(private http: HttpService, 
    @Inject(LOCALE_ID, ) private locale: string,
    private routeStateService: RouteStateService,
    private fb: FormBuilder, 
    public data: DataService, private route: ActivatedRoute, 
    private router: Router) {
  }

  ngOnInit() {
    this.routeStateService.pathParam.next(this.route.snapshot.queryParamMap.get('veranstalter'))
    
    if(this.data.paramInit){
      
      if(localStorage.getItem('token')){
        this.data.connect();
        this.data.setVeranstalter();
        this.data.loadArtikelByVeranstalter();
      }
      else{
        this.data.authenticateForFree().then(() => {  
          this.data.connect();
          this.data.setVeranstalter();
          this.data.loadArtikelByVeranstalter();
        });
      }
    }
 
    this.secondForm = this.fb.group({
      secondNr: ['', Validators.required],
      secondName: [''],
    });
  }

  printSampleBestellung(){
    this.http.printBestellung(1).subscribe(data => {
    });
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  thirdSubmit() {
    let currentDate = new Date();
    this.data.currentBestellung.bestellzeit = formatDate(currentDate, 'yyyy-MM-dd HH:mm', this.locale);
    this.data.currentBestellung.printed = false;

    if(!localStorage.getItem('token')){
      this.data.authenticateForFree().then(() => {  
        
        this.http.postBestellung(this.data.currentBestellung).subscribe((bestellung)=>{
          this.data.currentBestellung = bestellung;
    
          this.cashedItems = [...this.data.bestellartikel];
          this.cashedSum = this.data.sum;
          this.data.bestellArtikelSum = 0;
          this.baLoop().then(() => {
            this.wait(1000);
    
            this.http.checkPrinterUrl(this.data.veranstalter.printerUrl).subscribe((response) => {
              this.http.printBestellung(bestellung.id).subscribe(data => {
                this.resetStepper();
                this.data.send("created")
                this.data.showToast('success', 'Bestellung wurde erfolgreich abgeschickt.', 'bottom-right')
              });
            },
            (error) => {        
              this.resetStepper();     
              this.data.send("created")    
              this.data.showToast('danger', 'Drucken fehlgeschlagen. Bitte gib einem Kellner Bescheid. DANKE.', 'bottom-right')
            });
          });
        })
      });
    }
    else{
      this.http.postBestellung(this.data.currentBestellung).subscribe((bestellung)=>{
        this.data.currentBestellung = bestellung;

        this.cashedItems = [...this.data.bestellartikel];
        this.cashedSum = this.data.sum;
        this.data.bestellArtikelSum = 0;
        this.baLoop().then(() => {
          this.wait(1000);
  
          this.http.checkPrinterUrl(this.data.veranstalter.printerUrl).subscribe((response) => {
            this.http.printBestellung(bestellung.id).subscribe(data => {
              this.resetStepper();
              this.data.send("created")
              this.data.showToast('success', 'Bestellung wurde erfolgreich abgeschickt.', 'bottom-right')
            });
          },
          (error) => {    
            this.resetStepper();     
            this.data.send("created")    
            this.data.showToast('danger', 'Drucken fehlgeschlagen. Bitte gib einem Kellner Bescheid. DANKE.', 'bottom-right')
          });
        });
      })
    }
    
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

  cashItem(ba: Bestellungartikel){
    let a = this.cashedItems.findIndex(item => item.artikel === ba.artikel)

    if(a != -1){
      this.cashedItems.splice(a, 1);
    }

    this.cashedSum = this.data.calcSumOfBestellArray(this.cashedItems);
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
      tischnr: null,
      name: ""
    };
  }

  onEdit(item: Bestellungartikel) {
    item.inEdit = true;
  }
  onSave(item: Bestellungartikel) {
    item.inEdit = false;
  }

  reloadComponent() {
    location.reload();
  }
 
}
