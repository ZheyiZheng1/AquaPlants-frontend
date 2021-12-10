import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileJson: string = "";

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    // Subscribe auth0 user profile.
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }

  logout() :void {
    this.auth.logout({ returnTo: 'http://localhost:4200/home/search' });
  }

}
