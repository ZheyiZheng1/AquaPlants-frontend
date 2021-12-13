import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { PostImage } from 'src/app/interfaces/post-image';

import { Posts } from 'src/app/interfaces/posts';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  //Initialize all data
  profileJson: string = "";
  response:any;
  imageResponse:any;
  followerPosts:Posts[]=[];
  recommendedPosts:Posts[]=[];
  imageObjects:PostImage[][]=[];
  imageObject = [
    {
      image: 'assets/images/FishTank-unsplash.jpg',
      thumbImage: 'assets/images/FishTank-unsplash.jpg',
      postId: '1',
      imageId: '1'
    },
    {
      image: 'assets/images/plantsImages/AegagropilaLinnaei.png',
      thumbImage: 'assets/images/plantsImages/AegagropilaLinnaei.png',
      postId: '2',
      imageId: '2'
    }
  ];
  
  //Set urls
  recommendedUrl:string = 'http://localhost/AquaPlants-backend/api/posts/show_recommended.php';
  followerUrl:string = 'http://localhost/AquaPlants-backend/api/plants/search_by_id.php';
  searchImageUrl:string = 'http://localhost/AquaPlants-backend/api/postImages/search_by_id.php';
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
        // Ready for show results, save data to array.
        for(let i=0; i<response.data.length; i++){
          //save post
          this.recommendedPosts[i] = response.data[i];
          // Start load images of that post
          // Initiate the array. !Important, Not like Java, Multidimensional Arrays doesnot work without initiate!
          this.imageObjects[i]=[];
          this.http.post<any>(this.searchImageUrl, {postId : this.recommendedPosts[i].postId}).subscribe((imageResponse)=>{
            this.imageResponse = imageResponse;
            if (imageResponse.data !== undefined){
              // Ready for show results, save data to array.
              for(let j=0; j<imageResponse.data.length; j++){
                this.imageObjects[i][j]=imageResponse.data[j];
                console.log(this.imageObjects[i][j]);
                
              }
            }
          });
          // End of load post images
          
        }
      }
    });

  }

  commentSubmit(userRequest:NgForm) {
    //save comment to backend and show result message.
    console.log(userRequest.form.controls.comment.value);
  }

}
