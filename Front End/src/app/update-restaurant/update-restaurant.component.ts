import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  id: number;
  restaurant:Restaurant;
  submitted=false;

  opentime = {hour: 10, minute: 10};

  closetime = {hour: 10, minute: 10};


  constructor(private route: ActivatedRoute,private router: Router,
    private restaurantService: RestaurantService, private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.restaurant = new Restaurant();

    this.id = this.route.snapshot.params['id'];
    
    this.restaurantService.getRestaurant(this.id)
      .subscribe(data => {
        console.log(data)
        this.restaurant = data;
      }, error => console.log(error));
  }

  updateRestaurant() {
    this.restaurantService.updateRestaurant(this.id, this.restaurant)
      .subscribe(data => {
        console.log(data);
        this.restaurant = new Restaurant();
      }, error => console.log(error));
  }

  onSubmit() {
    this.restaurant.openTime=this.opentime.hour+":"+this.opentime.minute;
    this.restaurant.closeTime=this.closetime.hour+":"+this.closetime.minute;
    this.submitted = true;
    this.updateRestaurant();    
  }

  revert() {
    this.router.navigate(['/home']);
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/zonions/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      
      );

    }
  }

  

    //Gets called when the user clicks on retrieve image button to get the image from back end
    // getImage() {
    // //Make a call to Spring Boot to get the Image Bytes.
    // this.httpClient.get('http://localhost:8080/zonions/image/get/' + this.imageName)
    //   .subscribe(
    //     res => {
    //       this.retrieveResonse = res;
    //       this.base64Data = this.retrieveResonse.picByte;
    //       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //     }
    //   );
  

  // open()
  // {
  //   this.restaurant.openTime=this.opentime.hour;
  //   console.log(this.restaurant.openTime);
  // }
