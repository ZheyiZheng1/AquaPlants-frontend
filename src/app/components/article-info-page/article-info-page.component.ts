import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Articles } from 'src/app/interfaces/articles';

@Component({
  selector: 'app-article-info-page',
  templateUrl: './article-info-page.component.html',
  styleUrls: ['./article-info-page.component.css']
})
export class ArticleInfoPageComponent implements OnInit {
  //initialize all data
  articleId:any=null;
  article:Articles={
    "articleId":this.articleId,
    "title":"",
    "content":"",
    "date":""
  }
  url:string = 'http://localhost/AquaPlants-backend/api/articles/search_by_id.php';
  response:any;

  constructor(private router :ActivatedRoute, private http:HttpClient, private router_for_Router: Router) { }

  ngOnInit(): void {
    this.articleId=this.router.snapshot.params.articleId;
    this.http.post<any>(this.url, {
      //prepare data
      articleId : this.articleId
    }).subscribe((response)=>{
      this.response = response;
      if (response === "No related article found"){
        // There is no match data, redirect to 404 page
        this.router_for_Router.navigate(['/**'])
      } else {
        // No error occur, save the data
        this.article=response.data[0];
      }
    });
  }

}
