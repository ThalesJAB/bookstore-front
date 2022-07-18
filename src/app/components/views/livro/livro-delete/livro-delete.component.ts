
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  
  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();

  }

  findById():void{
    this.service.findById(this.livro.id!).subscribe({
      next: (resposta) =>{
        this.livro  = resposta;
      },

      error: (err) =>{
        this.service.mensagem("Livro não encontrado!");
      }

    });
  }

  delete():void{
    this.service.delete(this.livro.id!).subscribe({
      next: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro deletado com sucesso!")
      },

      error: (err) =>{
        this.service.mensagem("Falha ao deletar livro. Tente mais tarde!")
      }

    })
  }
  

  cancel():void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
