import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-update",
  templateUrl: "./categoria-update.component.html",
  styleUrls: ["./categoria-update.component.css"],
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  formulario! : FormGroup;
  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();

    this.formulario = this.formBuilder.group({
        nome: ["", [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
        descricao: ["", [Validators.minLength(3), Validators.maxLength(200), Validators.required]]
      });

  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe({
      next: (resposta) => {
        this.categoria = resposta;
      },

      error: (err) => {
        this.service.mensagem(err);
      },
    });
  }

  update(): void {
    this.service.update(this.categoria).subscribe({
      next: (resposta) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Categoria atualizada com sucesso!");
      },

      error: (err) => {
       this.service.mensagem("Erro ao atualizar categoria. Tente novamente mais tarde!")
      },
    });
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
