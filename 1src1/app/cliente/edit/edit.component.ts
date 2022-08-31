import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  cliente!: Cliente;
  form!: FormGroup;

  constructor(
    public clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
    ) { 

    }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['idCliente'];
    this.clienteService.find(this.id).subscribe((data: Cliente)=>{
      this.cliente = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      lastname:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      cel:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      nit: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
      this.clienteService.update(this.id, this.form.value).subscribe(res => {
      console.log('Client updated successfully!');
      this.router.navigateByUrl('cliente/index');
    })
  }

}
