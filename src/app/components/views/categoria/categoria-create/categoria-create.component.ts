import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectableObservable } from "rxjs";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-create",
  templateUrl: "./categoria-create.component.html",
  styleUrls: ["./categoria-create.component.css"],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: "",
    descricao: "",
  };
  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {}


  create(): void {
    this.service.create(this.categoria).subscribe({
      next: (resposta) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Categoria criada com sucesso!");
      },

      error: (err) => {
        for (let i = 0; i < err.error.erros.length; i++) {
          this.service.mensagem(err.error.erros[i].message);
        }
      },
    });
  }

  cancel() : void{
    this.router.navigate(["categorias"]);
  }
}
