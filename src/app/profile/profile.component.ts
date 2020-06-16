import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as profile from '../profile.json'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  user: any = (profile as any).default;
  name;
  bio;
  mobile;
  genre;
  profile;
  img;
  User = { Name: '',Mobile: '',Bio:'',Genre:'' };
  isLoader = false;
  @ViewChild('image') image: ElementRef;
  x ; y ; x2; y2;inx;iny;inx2;iny2;dp;dpi;ppi;

  onLoad() {
    console.log((this.image.nativeElement as HTMLImageElement).naturalWidth);
    console.log((this.image.nativeElement as HTMLImageElement).naturalHeight);
    this.x = (this.image.nativeElement as HTMLImageElement).naturalWidth;
    this.y = (this.image.nativeElement as HTMLImageElement).naturalHeight;
    this.inx = 0.0104166667 * this.x;
    this.iny = 0.0104166667 * this.y;
    this.x2= this.x * this.x;
    this.y2= this.y * this.y;
    this.inx2 = this.inx * this.inx;
    this.iny2 = this.iny * this.iny;
    console.log(this.inx);
    console.log(this.iny);
    this.dp = Math.sqrt(this.x2 + this.y2);
    this.dpi = Math.sqrt(this.inx2 + this.iny2);
    this.ppi = this.dp/this.dpi;
    console.log(this.ppi);
  }

  ngOnInit() {
    console.log(profile);
    if( (localStorage.getItem("name") === null)  && (localStorage.getItem("mobile") === null) &&
     (localStorage.getItem("bio") === null) && (localStorage.getItem("genre") === null)){
    localStorage.setItem("name",this.user.name);
    localStorage.setItem("mobile",this.user.mobile);
    localStorage.setItem("bio",this.user.bio);
    localStorage.setItem("genre",this.user.genres[0].genre);
    this.name = localStorage.getItem("name");
    this.mobile = localStorage.getItem("mobile");
    this.bio = localStorage.getItem("bio");
    this.genre = localStorage.getItem("genre");
    this.profile= localStorage.getItem("profile");
    this.img = "assets/images/profile.jpg"
    }
    else{
      this.name = localStorage.getItem("name");
    this.mobile = localStorage.getItem("mobile");
    this.bio = localStorage.getItem("bio");
    this.genre = localStorage.getItem("genre");
    this.img = localStorage.getItem("profile")
    }
  }
 
  onClick(){
    this.isLoader = true;
    setTimeout(() => {
      this.isLoader = false;
    },1000)
    // localStorage.setItem("name",this.User.Name);
    // localStorage.setItem("mobile",this.User.Mobile);
    // localStorage.setItem("bio",this.User.Bio);
    // localStorage.setItem("genre",this.User.Genre);
    // this.name =this.User.Name;
    // this.mobile = this.User.Mobile;
    // this.bio = this.User.Bio;
    // this.genre = this.User.Genre;
    localStorage.setItem("name",this.name);
    localStorage.setItem("mobile",this.mobile);
    localStorage.setItem("bio",this.bio);
    localStorage.setItem("genre",this.genre);
 
    // this.user.name=this.User.Name;
    // this.user.mobile=this.User.Mobile;
    // this.user.bio = this.User.Bio;
    // this.user.genres[0].genre = this.User.Genre;
  }

  onChange(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any) => {
        this.img = event.target.result;
        localStorage.setItem("profile",this.img);
      }
    }
  }

}
