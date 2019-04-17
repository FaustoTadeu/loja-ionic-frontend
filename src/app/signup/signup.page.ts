import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from 'src/services/cidade.service';
import { EstadoService } from 'src/services/estado.service';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteService } from 'src/services/cliente.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',  
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[]


  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private clienteService: ClienteService,
    private alertCtrl: AlertController

    ) { 
      this.formGroup = this.formBuilder.group({
        nomeCliente: ['Maria Silva', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        emailCliente: ['maria@gmail.com', [Validators.required, Validators.email]],
        tipoCliente: ['2', [Validators.required]],
        cpfCnpjCliente: ['94304750615', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        senhaCliente: ['123', [Validators.required]],
        logradouroEndereco: ['Rua Flores', [Validators.required]],
        numeroEndereco: ['548', [Validators.required]],
        complementoEndereco: ['', []],
        bairroEndereco: ['Centro', []],
        cepEndereco: ['35588-000', [Validators.required]],
        telefoneUm: ['3199987-8765', [Validators.required]],
        telefoneDois: ['', []],
        telefoneTres: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]] 
      })
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].idEstado);
      this.updateCidades();
    },
    error => {

    })
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    if(estado_id != null) {
      this.cidadeService.findByEstado(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {
      
      });
    }
  }

  signupUser() {

    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
    .subscribe (response => {
      this.showInsertOk();
    },
    error => {
      this.falhaInsert();

    });
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
        header: 'Sucesso',
        message: 'Cadastro efetuado com sucesso',
        buttons: ['OK']
      });
      await alert.present();
  }

  async falhaInsert() {
    const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Cadastro não efetuado',
        buttons: ['OK']
      });
      await alert.present();
  }

  voltar() {
    this.navCtrl.navigateRoot('home');
  }

}
