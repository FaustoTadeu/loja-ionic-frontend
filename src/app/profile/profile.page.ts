import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/cliente.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  email: string;
  cliente: ClienteDTO;
  safeUrlImage: SafeUrl;

  constructor(
    private navCrtl: NavController,
    private storageService: StorageService,
    private clienteService: ClienteService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const localUser = this.storageService.getLocalStorage();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        if(response.fotoCliente == null) {
          this.safeUrlImage = undefined;  
        } else {
            this.safeUrlImage = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ response.fotoCliente);
        }
      },
      error => {
        if(error.status == 403) {
          this.navCrtl.navigateForward("home");
        }
      });
    } else {
      this.navCrtl.navigateForward("home");
    }
  }
}
