import { Component } from '@angular/core';
import {animation, transition, trigger, useAnimation} from "@angular/animations";
import { bounce, pulse, shakeX } from 'ng-animate';
import { BoundElementProperty } from '@angular/compiler';


const DEATH_DURATION_SECONDS = 0.5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("death", [
      transition(
        ":increment",
        useAnimation(shakeX, { params: { timing: DEATH_DURATION_SECONDS }})
      )
    ]),
    trigger("attacked", [
      transition(
        ":increment", [
          useAnimation(bounce, { params: { timing: 0.3 }}),
          useAnimation(pulse, { params: { timing: 0.3, scale: 4.5 }})
        ]
      )
    ])
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  ng_death : number = 0;
  ng_attack : number = 0;
  css_hit : boolean = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime();
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime();
    // TODO 2e animation angular en même temps
    console.log('Death triggered, current ng_death value:', this.ng_death); 
    this.ng_death++; 
    console.log('New ng_death value:', this.ng_death);
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
    this.ng_attack++;
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => {this.css_hit = false; }, 1600)
  }
}
