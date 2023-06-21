import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularUniApplication';

  constructor(private http: HttpClient) { }

  // form vars
  cep: string = '';
  // return vars
  endereco = {
    logradouro: '',
    localidade: '',
    uf: ''
  }
  retorno = {
    rua: '',
    cidade: '',
    estado: ''
  }

  pesquisado = false;
  espera = false;

  pesquisa() {
    this.espera = true;
    this.cep = this.cep.replace(/\D/g, '');

    const url = 'http://viacep.com.br/ws/' + this.cep + '/json/';

    this.http.get(url).subscribe((res) => {
      this.endereco = res as { logradouro: string, localidade: string, uf: string };
      this.retorno.rua = this.endereco.logradouro;
      this.retorno.cidade = this.endereco.localidade;
      this.retorno.estado = this.endereco.uf;
      //console.log(this.endereco)
    });
    this.pesquisado = true;
    this.espera = false;
  }

  limpa() {
    this.pesquisado = false;
    this.espera = false;
    this.cep = "";
    this.endereco = {
      logradouro: '',
      localidade: '',
      uf: ''
    };
    this.retorno.rua = "";
    this.retorno.cidade = "";
    this.retorno.estado = "";
  }
}