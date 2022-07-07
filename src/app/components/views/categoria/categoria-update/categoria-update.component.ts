import { Component, OnInit } from "@angular/core";
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
  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
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
        /*
        for (let i = 0; i < err.error.erros.length; i++) {
          this.service.mensagem(err.error.erros[i].message);
        }
        */
       this.service.mensagem("Validar se todos os campos estão preenchidos corretamente!")
      },
    });
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
