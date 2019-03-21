import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private authService: AuthService,
    private alertController: AlertController,
  ) { }

  credenciais: CredenciaisDTO = {
    emailCliente: '',
    senhaCliente: ''
  };

  login() {
    this.authService.authenticate(this.credenciais).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateRoot('categorias');
    },
    error => {});  
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
