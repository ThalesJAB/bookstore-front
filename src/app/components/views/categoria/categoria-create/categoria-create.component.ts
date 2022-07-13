import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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

  formulario! : FormGroup;

  constructor(private service: CategoriaService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ["", [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
      descricao: ["", [Validators.minLength(3), Validators.maxLength(200), Validators.required]]
    });
  }


  create(): void {
    this.service.create(this.categoria).subscribe({
      next: (resposta) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Categoria criada com sucesso!");
      },

      error: (err) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Erro ao criar categoria. Tente novamente mais tarde!")
      },
    });
  }

  cancel() : void{
    this.router.navigate(["categorias"]);
  }
}
