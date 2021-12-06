import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Articles } from 'src/app/interfaces/articles';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  //initialize all data
  articleId:string = "";
  title:string = "";
  content:string = "";
  date:string = "";
  response:any;
  noResult:boolean = false;
  //showRecommend use for show some random plants when user has not searched.
  showRecommend:boolean = true;
  articles:Articles[]=[];
  tableHeads=["Title","Date","Preview"];
  url:string = 'http://localhost/AquaPlants-backend/api/articles/search.php';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  articleSearchSubmit(userRequest:NgForm){
    this.articles=[];
    //Recieve data from user
    this.title = userRequest.form.controls.title.value;
    this.showRecommend = false;
    //Pass data to REST API and get result
    this.http.post<any>(this.url, {
      //prepare data
      title : this.title
    }).subscribe((response)=>{
      this.response = response;
      if(response === undefined) {
        //No result and show message 
        this.noResult=true;
      } else {
        //save data for later display
        this.noResult=false;
        console.log(response);
        for(let i=0; i<response.data.length; i++) {
          this.articles[i] = response.data[i];
          
        }
      }
      
    });
  }
}
