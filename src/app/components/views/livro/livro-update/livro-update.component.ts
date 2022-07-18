import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };
  formulario!: FormGroup;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  
  constructor(
    private formBuilder: FormBuilder,
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();

    this.formulario = this.formBuilder.group({
      titulo: ["", [Validators.minLength(3), Validators.required]],
      nomeAutor: ["", [Validators.minLength(3), Validators.required]],
      texto: ["", [Validators.minLength(10), Validators.required]],
    });

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

  update():void{
    this.service.update(this.livro).subscribe({

      next: (resposta) =>{
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro atualizado com sucesso!");

      },

      error: (err) =>{
        this.service.mensagem("Falha ao atualizar livro, Tente novamente mais tarde!");
      }



    })
  }


  cancel():void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }



  
}


