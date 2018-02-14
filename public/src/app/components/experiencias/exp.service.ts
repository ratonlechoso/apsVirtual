import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';//Para manejar los verbos http

import { Experiencia } from './experiencia';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs'; //se implementan los observables para manejar las promesas

@Injectable()
export class ExpService {
  base_url = 'http://localhost:3567/api/exp';
  constructor(public _http: Http
  ) { }

  private expSource = new Subject<Experiencia>();
  exp$ = this.expSource.asObservable();
  exp:  Experiencia

  setExp(exp: Experiencia) {
    console.log("pasa por setExp")
    this.exp = exp
    this.expSource.next(exp);
    this.exp$ = this.expSource.asObservable();
  }


  getAmbitos(): Observable<Object> {
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log("Accediendo al endpoint GET experiencias")
    return this._http.get(`${this.base_url}/ambitos`, options).map(res => this.parseRes(res));
  }

  getEspecialidades(id): Observable<Object> {
    let headers = new Headers({ 'x-access-token': id });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log("Accediendo al endpoint GET experiencias")
    return this._http.get(`${this.base_url}/especialidades`, options).map(res => this.parseRes(res));
  }

  getUniversidades(): Observable<Object> {
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log("Accediendo al endpoint GET Universidades")
    return this._http.get(`${this.base_url}/universidades`, options).map(res => this.parseRes(res));
  }

  getExperiencias(ambitoId): Observable<Object> {
    let headers = new Headers({ 'x-access-token': ambitoId });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log("Accediendo al endpoint GET experiencias")
    return this._http.get(`${this.base_url}/experiencias`, options).map(res => this.parseRes(res));
  }

  getExperiencia(expId): Observable<Object> {
    
    let headers = new Headers({ 'x-access-token': expId });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log("Accediendo al endpoint GET experiencias")
    return this._http.get(`${this.base_url}/experiencia`, options).map(res => this.parseRes(res));
  }

  createExperiencia(exp: Experiencia): Observable<Object> {
    console.log(exp)
    let body = JSON.stringify(exp);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(`${this.base_url}/experiencias`, body, options).map( (res) => this.parseRes(res) );
  }

  updateExperiencia(exp: Experiencia): Observable<Object> {
    console.log(exp)
    let body = JSON.stringify(exp);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.put(`${this.base_url}/experiencias`, body, options).map( (res) => this.parseRes(res) );
  }


  deleteExperiencia(id: String): Observable<Object> {
    let headers = new Headers({ 'x-access-token': id });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(`${this.base_url}/experiencias/`, options).map( (res) => this.parseRes(res) );
  }

  parseRes(res) {
    let body = JSON.parse(res['_body']);
    return body;
  }


}