import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  email: string;

  constructor(
    private navCrtl: NavController,
    // private navParams: NavParams,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    const localUser = this.storageService.getLocalStorage();
    if (localUser && localUser.email) {
      this.email = localUser.email;
    }
  }
}
