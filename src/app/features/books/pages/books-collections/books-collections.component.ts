import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronRightSolid } from '@ng-icons/heroicons/solid';
import { TopBarComponent } from '../../../../shared/components/topbar/topbar.component';

@Component({
  selector: 'app-books-collections',
  standalone: true,
  providers: [provideIcons({ heroChevronRightSolid })],
  imports: [TopBarComponent, NgIcon],
  templateUrl: './books-collections.component.html',
})
export class BooksCollectionsComponent {
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
