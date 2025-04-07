import { Component } from '@angular/core';
import {animation, transition, trigger, useAnimation} from "@angular/animations";
import { shakeX } from 'ng-animate';

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
    ])
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  ng_death = false;

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

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards

    // TODO 2e animation angular en même temps
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
  }
}
