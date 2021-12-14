import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Like } from 'src/app/interfaces/like';
import { PostImage } from 'src/app/interfaces/post-image';

import { Posts } from 'src/app/interfaces/posts';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  //Initialize all data
  email: string = "";
  jsonObj:any;
  profileJson: string = "";
  response:any;
  imageResponse:any;
  likeResponse:any;
  followerPosts:Posts[]=[];
  recommendedPosts:Posts[]=[];
  imageObjects:PostImage[][]=[];
  likeArray:any[]=[];
  
  //Set urls
  recommendedUrl:string = 'http://localhost/AquaPlants-backend/api/posts/show_recommended.php';
  followerUrl:string = 'http://localhost/AquaPlants-backend/api/plants/search_by_id.php';
  searchImageUrl:string = 'http://localhost/AquaPlants-backend/api/postImages/search_by_id.php';
  searchLikeUrl:string = 'http://localhost/AquaPlants-backend/api/likes/search_by_id.php';
  createLikeUrl:string = 'http://localhost/AquaPlants-backend/api/likes/create.php';
  deleteLikeUrl:string = 'http://localhost/AquaPlants-backend/api/likes/delete.php';
  constructor(public auth: AuthService, private router :ActivatedRoute, private http:HttpClient, private router_for_Router: Router) { }

  ngOnInit(): void {
    // Subscribe auth0 user profile.
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
    
    // Show follower posts.
    // Show recommended posts.
    this.http.get<any>(this.recommendedUrl).subscribe((response)=>{
      this.response = response;
      if (response.data !== undefined){
        
        // Extract email from profile.
        this.jsonObj = JSON.parse(this.profileJson);
        this.email = this.jsonObj['email'];

        // Ready for show results, save data to array.
        for(let i=0; i<response.data.length; i++){
          //save post
          this.recommendedPosts[i] = response.data[i];
          // Initiate the array. !Important, Not like Java, Multidimensional Arrays doesnot work without initiate!
          this.imageObjects[i]=[];
          this.getImages(i);
          this.getLikedArray(i);
        }
      }
    });
  }

  getImages(i: number) {
    // Start load images of that post
    this.http.post<any>(this.searchImageUrl, {postId : this.recommendedPosts[i].postId}).subscribe((imageResponse)=>{
      this.imageResponse = imageResponse;
      if (imageResponse.data !== undefined){
        // Ready for show results, save data to array.
        for(let j=0; j<imageResponse.data.length; j++){
          this.imageObjects[i][j]=imageResponse.data[j];
        }
      }
    });
    // End of load post images
  }

  getLikedArray(i: number) {
    // Start load likes of that post
    this.http.post<any>(this.searchLikeUrl, {postId : this.recommendedPosts[i].postId, userEmail : this.email}).subscribe((likeResponse)=>{
      this.likeResponse = likeResponse;
      if (this.likeResponse == 'No like found'){
        this.likeArray[i]=null;
      }else {
        this.likeArray[i]=likeResponse;
      }
    });
  }

  getLike(i: number) {
    if (this.likeArray[i]==null){
      return false;
    } else {
      return true;
    }
  }

  like(index:number) {
    this.http.post<any>(this.createLikeUrl, {postId : this.recommendedPosts[index].postId, userEmail : this.email}).subscribe((response)=>{
      this.response = response;
      console.log(response);
      //change value in likeArray
      this.getLikedArray(index);
    });
  }

  unlike(index:number) {
    this.http.post<any>(this.deleteLikeUrl, {likeId : this.likeArray[index].data[0].likeId}).subscribe((response)=>{
      this.response = response;
      console.log(response);
      //change value in likeArray
      this.likeArray[index]=null;
    });
  }

  commentSubmit(userRequest:NgForm) {
    //save comment to backend and show result message.
    console.log(userRequest.form.controls.comment.value);
  }

}
