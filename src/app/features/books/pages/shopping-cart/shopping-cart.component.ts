import { Component } from '@angular/core';
import { TopBarComponent } from '../../../../shared/components/topbar/topbar.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [TopBarComponent],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  collectionsList = [
    {
      name: 'x project',
      description:
        'Esta es una descripcion para la coleccion de proyecto x espero que funcion de manera correcta las cosas en la vida de deadasbdasjdhasdhbjh',
    },
    {
      name: 'Z project',
      description:
        'Esta es una descripcion para la coleccion de proyecto x espero que funcion de manera correcta las cosas en la vida de deadasbdasjdhasdhbjh',
    },
    {
      name: 'x project',
      description:
        'Esta es una descripcion para la coleccion de proyecto x espero que funcion de manera correcta las cosas en la vida de deadasbdasjdhasdhbjh',
    },
    {
      name: 'x project',
      description:
        'Esta es una descripcion para la coleccion de proyecto x espero que funcion de manera correcta las cosas en la vida de deadasbdasjdhasdhbjh',
    },
    {
      name: 'x project',
      description:
        'Esta es una descripcion para la coleccion de proyecto x espero que funcion de manera correcta las cosas en la vida de deadasbdasjdhasdhbjh',
    },
  ];
}
