import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from 'src/services/cidade.service';
import { EstadoService } from 'src/services/estado.service';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeDTO } from 'src/models/cidade.dto';


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
    private estadoService: EstadoService

    ) { 
      this.formGroup = this.formBuilder.group({
        name: ['Maria Silva', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['maria@gmail.com', [Validators.required, Validators.email]],
        tipo: ['2', [Validators.required]],
        cpfCnpj: ['94304750615', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Flores', [Validators.required]],
        numero: ['548', [Validators.required]],
        complemento: ['', []],
        bairro: ['Centro', []],
        cep: ['35588-000', [Validators.required]],
        tel1: ['3199987-8765', [Validators.required]],
        tel2: ['', []],
        tel3: ['', []],
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
    console.log("passei");
  }

  voltar() {
    this.navCtrl.navigateRoot('home');
  }

}
