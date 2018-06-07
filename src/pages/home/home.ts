import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public iab: InAppBrowser,
              public network: Network) {

  }

  connected: Subscription;
  disconnected: Subscription;

  ionViewCanEnter(){
    this.connected= this.network.onConnect().subscribe(data=>{
      this.networkUpdate(data.type);
    },error=>{
 
    });
 
    this.disconnected=this.network.onDisconnect().subscribe(data=>{
     this.networkUpdate(data.type);
    },error=>{
 
    });
  }

  networkUpdate(connectionState: string){
    this.toastCtrl.create({
      message:'You are now '+connectionState+' via '+this.network.type,
      duration:3000
    }).present();
  }

  ionViewDidLoad(){
    this.iab.create('http://argus.workiy.org','_self',{location:'no'}); 
  }

  

}
