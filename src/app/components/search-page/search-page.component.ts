import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plants } from 'src/app/interfaces/plants';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  //show only use for switch between advancend and basic search
  show:boolean = false;
  //showRecommend use for show some random plants when user has not searched.
  showRecommend:boolean = true;

  //initialize all data
  name:string = "";
  type:string = "";
  origin:string = "";
  growthRate:string = "";
  averageHeight:string = "";
  lightDemand:string = "";
  co2Demand:string = "";
  level:string = "";
  response:any;
  noResult:boolean=false;
  plants:Plants[]=[];
  tableHeads=["Image","Name","Type","Origin","Level"];
  url:string = 'http://localhost/AquaPlants-backend/api/plants/search.php';

  constructor(private http:HttpClient) { }

  

  plantsSearchSubmit(userRequest:NgForm){
    this.plants=[];
    // Recieve data from user
    this.name= userRequest.form.controls.name.value;
    if(this.show) {
      this.type= userRequest.form.controls.type.value;
      this.origin= userRequest.form.controls.origin.value;
      this.growthRate= userRequest.form.controls.growthRate.value;
      this.averageHeight= userRequest.form.controls.averageHeight.value;
      this.lightDemand= userRequest.form.controls.lightDemand.value;
      this.co2Demand= userRequest.form.controls.co2Demand.value;
      this.level= userRequest.form.controls.level.value;
    }
    

    // Pass data to REST API and get result back
    this.http.post<any>(this.url, { 
      // Prepare data
      name : this.name,
      type : this.type,
      origin : this.origin,
      growthRate : this.growthRate,
      averageHeight : this.averageHeight,
      lightDemand : this.lightDemand,
      co2Demand : this.co2Demand,
      level : this.level
    }).subscribe((response)=>{
      this.response = response;
      if (response.data !== undefined){
        // Ready for show results
        this.noResult=false;
        // Prepare for show data, put all data into the plants array
        for(let i=0; i<response.data.length; i++){
          this.plants[i] = response.data[i];
        }
      } else {
        // There is no match data, show error message and let user try again
        this.noResult=true;
      }
      
      // Show the result
      this.showRecommend = false;
      //All information will be displayed by html, nothing else to do here
    });
  }

  changeShowHide(){ this.show=!this.show; }
}
