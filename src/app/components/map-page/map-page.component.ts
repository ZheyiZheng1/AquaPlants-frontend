import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Stores } from 'src/app/interfaces/stores';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  //switch between shop map and shop list. False repesent list, true is map.
  switchMapList:boolean = false;
  addressPrefix:string = "Address: ";
  phoneNumPrefix:string = "Phone: ";
  stores:Stores[]=[];
  response:any;
  url:string = 'http://localhost/AquaPlants-backend/api/shops/show_all.php';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    //Recieve data from REST API and save in stores
    this.http.post<any>(this.url, {}).subscribe((response)=>{
      this.response = response;
      
      for(let i=0; i<response.data.length; i++) {
        this.stores[i] = response.data[i]; 
      }
      console.log(this.stores);
    });
  }
  
  switchShowList ():void {
    this.switchMapList = !this.switchMapList;
  }

}
