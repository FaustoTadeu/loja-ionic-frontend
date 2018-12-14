import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(private menu: MenuController, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

}
