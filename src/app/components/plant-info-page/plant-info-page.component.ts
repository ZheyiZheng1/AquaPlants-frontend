import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"

import { Plants } from 'src/app/interfaces/plants';

@Component({
  selector: 'app-plant-info-page',
  templateUrl: './plant-info-page.component.html',
  styleUrls: ['./plant-info-page.component.css']
})
export class PlantInfoPageComponent implements OnInit {
  //initialize all data
  plantId:any=null;
  plant:Plants={
    "plantId":this.plantId,
    "name":"",
    "type":"",
    "origin":"",
    "growthRate":"",
    "averageHeight":0,
    "lightDemand":"",
    "co2Demand":"",
    "level":"",
    "description":"",
    "imageUrl":""
};
  response:any;
  url:string = 'http://localhost/AquaPlants-backend/api/plants/search_by_id.php';
  
  constructor(private router :ActivatedRoute, private http:HttpClient, private router_for_Router: Router) { }

  ngOnInit(): void {
    this.plantId=this.router.snapshot.params.plantId;
    this.http.post<any>(this.url, { 
      // Prepare data
      plantId : this.plantId
    }).subscribe((response)=>{
      this.response = response;
      if (response === "No related plants found"){
        // There is no match data, redirect to 404 page
        this.router_for_Router.navigate(['/**'])
      } else {
        // No error occur, save the data
        this.plant=response.data[0];
      }
    });
    // If there is no error, html part will show all infomation to user.
  }

}
