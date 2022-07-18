import { ThisReceiver } from "@angular/compiler";
import {
  Directive,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
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
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;

    this.formulario = this.formBuilder.group({
      titulo: ["", [Validators.minLength(3), Validators.required]],
      nomeAutor: ["", [Validators.minLength(3), Validators.required]],
      texto: ["", [Validators.minLength(10), Validators.required]],
    });
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe({
      next: (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro criado com sucesso");
      },

      error: (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem(
          "Erro ao criar livro. Tente novamente mais tarde!"
        );
      },
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
  /*

  configText(){
    console.log("dale")

   
    const textarea = document.querySelector("textarea");

    textarea?.addEventListener("keyup", e =>{
      textarea.style.height = "59px";
      let scHeight = (<HTMLTextAreaElement>e.target).scrollHeight;
      console.log(scHeight)
      textarea.style.height = `${scHeight}px`; 
      // this.height = `${scHeight}px`;

    })
  */
  configText() {
    let textArea = document.querySelector("textarea");
    textArea!.style.height = "63px";
    console.log(textArea!.scrollHeight);
    textArea!.style.height = textArea!.scrollHeight + "px";
  }
}
