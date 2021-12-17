import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Comments } from 'src/app/interfaces/comments';
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
  commentResponse:any;
  myCommentResponse:any;
  followerPosts:Posts[]=[];
  recommendedPosts:Posts[]=[];
  imageObjects:PostImage[][]=[];
  likeArray:any[]=[];
  myCommentArray:Comments[][]=[];
  commentObjects:Comments[][]=[];
  
  //Set urls
  recommendedUrl:string = 'http://localhost/AquaPlants-backend/api/posts/show_recommended.php';
  followerUrl:string = 'http://localhost/AquaPlants-backend/api/plants/search_by_id.php';
  searchImageUrl:string = 'http://localhost/AquaPlants-backend/api/postImages/search_by_id.php';
  searchLikeUrl:string = 'http://localhost/AquaPlants-backend/api/likes/search_by_id.php';
  createLikeUrl:string = 'http://localhost/AquaPlants-backend/api/likes/create.php';
  deleteLikeUrl:string = 'http://localhost/AquaPlants-backend/api/likes/delete.php';
  searchMyCommentUrl:string = 'http://localhost/AquaPlants-backend/api/comments/search_by_id.php';
  searchCommentUrl:string = 'http://localhost/AquaPlants-backend/api/comments/search.php';
  createCommentUrl:string = 'http://localhost/AquaPlants-backend/api/comments/create.php';
  deleteCommentUrl:string = 'http://localhost/AquaPlants-backend/api/comments/delete.php';
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
          this.commentObjects[i]=[];
          this.myCommentArray[i]=[];
          this.getImages(i);
          this.getLikedArray(i);
          this.getMyCommentArray(i);
          this.getCommentArray(i);
          // Everything is loaded, ready to show
          
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

  getCommentArray(i: number) {
    // Start load comments of that post
    this.http.post<any>(this.searchCommentUrl, {postId : this.recommendedPosts[i].postId, userEmail : this.email}).subscribe((commentResponse)=>{
      this.commentResponse = commentResponse;
      if (commentResponse.data !== undefined){
        // Ready for show results, save data to array.
        for(let j=0; j<commentResponse.data.length; j++){
          this.commentObjects[i][j]=commentResponse.data[j];
        }
      }
    });
    
  }

  getMyCommentArray(i: number) {
    // Start load comments of that post, which leave by the signed-in user.
    this.http.post<any>(this.searchMyCommentUrl, {postId : this.recommendedPosts[i].postId, userEmail : this.email}).subscribe((myCommentResponse)=>{
      this.myCommentResponse = myCommentResponse;
      if (myCommentResponse.data !== undefined){
        // Ready for show results, save data to array.
        for(let j=0; j<myCommentResponse.data.length; j++){
          this.myCommentArray[i][j]=myCommentResponse.data[j];
          
        }
      }
    });
    console.log(this.myCommentArray[0])
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
