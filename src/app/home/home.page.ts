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
    private alertController: AlertController
  ) { }

  credenciais: CredenciaisDTO = {
    emailCredencial: '',
    senhaCredencial: ''
  };

  login() {
    const result = this.authService.authenticate(this.credenciais);
    if (result != null) {
      this.navCtrl.navigateRoot('categorias');
    } else {
      this.mostraModal(this.credenciais);
    }
    // this.authService.authenticate(this.credenciais).subscribe(
    //   response => {
    //     console.log(response.headers.get('Authorization'));
    //     this.navCtrl.navigateRoot('categorias');
    //   },
    //   error => {
    //     const alert = this.alertController.create({
    //       header: 'Login Inválido',
    //       subHeader: 'Usuário não encontrado',
    //       message: 'Verifique os dados inseridos e tente novamente',
    //       buttons: ['OK']
    //     });
    //   });
  }

  async mostraModal(creds: CredenciaisDTO) {
    const alert = await this.alertController.create({
      header: 'Login Inválido',
      subHeader: 'Usuário ' + creds.emailCredencial + ' não encontrado',
      message: 'Verifique os dados inseridos e tente novamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
