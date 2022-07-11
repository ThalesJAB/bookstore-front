import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: "root",
})

export class LivroService {
  baseUrl: String = environment.baseUrl;

  livroTeste: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };
 

  constructor(private http: HttpClient, private snack : MatSnackBar) {}

  findAllByCategoria(id_cat: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  create(livro: Livro, id_cat: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.post<Livro>(url, livro);
  }

  mensagem(str: String) : void{
    this.snack.open(
      `${str}`,'OK', {
        horizontalPosition:'end',
        verticalPosition: 'top',
        duration: 3000
      }
    )
  }
}
