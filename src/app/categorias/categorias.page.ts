import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {


  itensCategoria: CategoriaDTO[];
  bucketUrl = API_CONFIG.bucketBaseUrl;

  constructor(
    private menu: MenuController,
    private categoriaService: CategoriaService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(
      response => {
        this.itensCategoria = response;
      },
      error => {
        console.log(error);
      });
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }



  async mostraCategoria(categoria: string) {
    const alert = await this.alertController.create({
      header: 'Categorias',
      subHeader: 'Testando Alerts',
      message: 'A Categoria é ' + categoria,
      buttons: ['OK']
    });

    await alert.present();
  }

}
