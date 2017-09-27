import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Login } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
* Generated class for the Signup page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  /*Postman responds to this userData when doing Api call to UserPost
  {
  "password": "ppp",
  "email": "pppp@yahoo.com",
  "first_name" : "ppp ppp" ,
  "last_name" : "pppp",
  "device_type" :"0"
}
*/
ResponseData: any;
userData={
  "password": "",
  "email": "",
  "first_name" : "" ,
  "last_name" : "",
  "device_type" :"web"  //This might need to get altered later based on the device type
};

  constructor(public navCtrl: NavController, public AuthServiceProvider: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }
  //this is how signup does a API call using the authserive provider
  signup(){
    //Api connections
    //this.navCtrl.push(TabsPage);  //this redirects to the home page  (then is a form of promise)
    console.log('Signup called trying to a make a API call to the database');
    this.AuthServiceProvider.postData(this.userData, "signup").then((result)=>{
      this.ResponseData=result;
      console.log(this.ResponseData);
      localStorage.setItem('userData', JSON.stringify(this.ResponseData));  //this is like application cache assigns the response to  userData
      //now that data is received you can direct to the home page
      this.navCtrl.push(TabsPage);
    },(err)=>{
      //connection failed
      console.log("Post Api call to databae is signup doesn't work");
      console.log(err);
    });
  }
  login(){
    //Api connections
    this.navCtrl.push(Login);
  }

}
