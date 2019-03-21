import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {


  itensCategoria: CategoriaDTO[];
  
  constructor(
    private menu: MenuController,
    private categoriaService: CategoriaService,
    private alertController: AlertController,
    private sanitizer: DomSanitizer
  ) {  }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(
      response => {
        this.itensCategoria = response;
        let i = 0;
        this.itensCategoria.forEach(el => {
          this.itensCategoria[i].imagemCategoria = 'data:image/png;base64,' + el.imagemCategoria;
          i++;
        });
      },
      error => {}
      );
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
