import { Component } from '@angular/core';
import {animation, transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flip, pulse, shake, shakeX } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';


const DEATH_DURATION_SECONDS = 0.75;
const ROTATE_CENTER_DURATION_SECONDS = 0.8; 
const ROTATE_TOP_DURATION_SECONDS = 0.7;
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
    ]),
    trigger("shake", [
      transition(
        ":increment",[
          useAnimation(bounce, { params: { timing: 1 }}),
        ]
      )
    ]),
    trigger("flip", [
      transition(
        ":increment", [
          useAnimation(flip, {params: { timing: 0.75 }})
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
  ng_shake : number = 0;
  ng_flip : number = 0;

  css_rotate : boolean = false;
  css_rotate_top : boolean = false;

  constructor() {
  }

  async triple(){
    this.ng_death++;
    await lastValueFrom(timer(1000))
    this.ng_shake++;
    await lastValueFrom(timer(750));
    this.ng_flip++;
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

  infiniteTripleSpin(){
    this.doubleCenterSpin();
  }

  doubleCenterSpin(){
    this.css_rotate = true;
    setTimeout(() => {
      this.css_rotate = false;
      this.topSpin();
    }, ROTATE_CENTER_DURATION_SECONDS * 2 * 1000)
  }

  topSpin(){
    this.css_rotate_top = true;
    setTimeout(() => {
      this.css_rotate_top = false;
      this.doubleCenterSpin();
    }, ROTATE_TOP_DURATION_SECONDS * 1000)
  }
}
