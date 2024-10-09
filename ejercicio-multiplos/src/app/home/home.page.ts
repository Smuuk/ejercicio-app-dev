import { Component } from '@angular/core';
import { Firestore, addDoc , collection } from '@angular/fire/firestore';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numeroIngresado!: number;
  numerosAr: number[] = [];


  constructor(private firestore: Firestore) {}

  // Función para calcular la serie de números, poniendo como limite el número ingresado por el usuario
  calcularSerie() {
    this.numerosAr = [];
    for (let i = 0; i <= this.numeroIngresado; i++) {
      this.numerosAr.push(i);
    }
    this.guardarPeticion(this.numeroIngresado, this.numerosAr);
  }

  async guardarPeticion(numeroIngresado: number, resultado: number[]) {
    const peticion = {
      numeroIngresado: numeroIngresado,
      resultado: resultado,
      // Fecha y hora con la que se registro la info.
      timestamp: new Date().toISOString()
    };
  
    try {
      // Almacenando en Firestore
      const peticionesCollection = collection(this.firestore, 'peticiones');
      await addDoc(peticionesCollection, peticion);
      console.log('Petición guardada en Firestore');
    } catch (error) {
      console.error('Error al guardar en Firestore', error);
    }
  }


  // Función para pintar el color según los múltiplos
  getColor(num: number): string {
    if (num % 3 === 0) {
      return 'green';
    } else if (num % 5 === 0) {
      return 'red';
    } else if (num % 7 === 0) {
      return 'blue';
    } else {
      return 'black';
    }
  }
}
