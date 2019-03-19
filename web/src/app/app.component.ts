import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  photos = [
    {
      url : 'https://i.ytimg.com/vi/C7JazmUWsn4/maxresdefault.jpg',
      description: 'Anime Fuuka'
    },
    {
      url : 'https://vignette.wikia.nocookie.net/fuukaakitsuki/images/3/3b/T_main_img.png/revision/latest?cb=20180302194356',
      description: 'Anime Fuuka Girls'
    }
  ]

}
