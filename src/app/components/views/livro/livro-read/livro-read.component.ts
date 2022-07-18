import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";
@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

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
    private router: Router,
    private _ngZone: NgZone
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

  cancel():void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe().subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
