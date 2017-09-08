import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBG-I6JtVuoDD6mvBuf800PNZr9-PjawDA',
      authDomain: 'recipe-shopping-38df8.firebaseapp.co'
    });
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
