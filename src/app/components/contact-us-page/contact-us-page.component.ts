import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent {

  email:string = "";
  firstName:string = "";
  lastName:string = "";
  opinions:string = "";
  response:any;
  url:string = 'http://localhost/AquaPlants-backend/api/feedback/create.php';

  constructor(private http:HttpClient) {}

  opinionsSubmit(userInfo:NgForm){
    // Recieve data from user
    this.email= userInfo.form.controls.email.value;
    this.firstName= userInfo.form.controls.firstName.value;
    this.lastName= userInfo.form.controls.lastName.value;
    this.opinions= userInfo.form.controls.opinions.value;
    

    // Pass data to REST API and get result back
    this.http.post<any>(this.url, { 
      // Prepare data
      firstname : this.firstName,
      lastname : this.lastName,
      email : this.email,
      opinions : this.opinions
    }).subscribe((response)=>{
      this.response = response;
      // Show the result
      alert(this.response.message);
    });
    
  }
}
