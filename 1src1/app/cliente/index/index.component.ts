import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  cliente: Cliente[] = [];

  // constructor() { }
  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe((data: Cliente[])=>{
      this.cliente = data;
      console.log(this.cliente);
      console.log("<------------------------------------------>");

    })
  }

  deleteCliente(id: any){
    this.clienteService.delete(id).subscribe(res => {
        this.cliente = this.cliente.filter(item => item.id !== id);
        console.log('Client deleted successfully!');
    })
  }

}
