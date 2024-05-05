import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {
  wordToGuess:string | undefined;
  guessedLetters:Set<string> = new Set();
  attempts:number = 0;
  guess:boolean = false;
  correct:boolean = false;
  wrong:boolean = false;
  outOfGuesses:boolean = false;
  totalScore:number = 8;
  player: any;

  hangmanImages:string[] = [
    '../../assets/Hangman-0.png',
    '../../assets/Hangman-1.png',
    '../../assets/Hangman-2.png',
    '../../assets/Hangman-3.png',
    '../../assets/Hangman-4.png',
    '../../assets/Hangman-5.png',
    '../../assets/Hangman-6.png',
    '../../assets/Hangman-7.png'
  ]
  topButtons = [{
    letter: 'Q',
    clicked: false,
    correct: false
  },
  {
    letter: 'W',
    clicked: false,
    correct: false
  },
  {
    letter: 'E',
    clicked: false,
    correct: false
  },
  {
    letter: 'R',
    clicked: false,
    correct: false
  },
  {
    letter: 'T',
    clicked: false,
    correct: false
  },
  {
    letter: 'Y',
    clicked: false,
    correct: false
  },
  {
    letter: 'U',
    clicked: false,
    correct: false
  },
  {
    letter: 'I',
    clicked: false,
    correct: false
  },
  {
    letter: 'O',
    clicked: false,
    correct: false
  },
  {
    letter: 'P',
    clicked: false,
    correct: false
  },
]

middleButtons = [{
  letter: 'A',
  clicked: false,
  correct: false
},
{
  letter: 'S',
  clicked: false,
  correct: false
},
{
  letter: 'D',
  clicked: false,
  correct: false
},
{
  letter: 'F',
  clicked: false,
  correct: false
},
{
  letter: 'G',
  clicked: false,
  correct: false
},
{
  letter: 'H',
  clicked: false,
  correct: false
},
{
  letter: 'J',
  clicked: false,
  correct: false
},
{
  letter: 'K',
  clicked: false,
  correct: false
},
{
  letter: 'L',
  clicked: false,
  correct: false
},
]

bottomButtons = [
  {
    letter: 'Z',
    clicked: false,
    correct: false
  },
  {
    letter: 'X',
    clicked: false,
    correct: false
  },
  {
    letter: 'C',
    clicked: false,
    correct: false
  },
  {
    letter: 'V',
    clicked: false,
    correct: false
  },
  {
    letter: 'B',
    clicked: false,
    correct: false
  },
  {
    letter: 'N',
    clicked: false,
    correct: false
  },
  {
    letter: 'M',
    clicked: false,
    correct: false
  },
]

constructor(private appService: AppService) {}

lobby: any;
displayedWord: string=""

ngOnInit() {
  this.lobby = this.appService.getCurrentLobby();
  // this.appService.getWordToGuess(this.lobby.id).subscribe(result => {
  //   console.log(result);
  //   this.wordToGuess = result;
  //   this.getDisplayedWord();
  // })
  this.getDisplayedWord();
  this.player = this.appService.getCurrentPlayer();
  console.log(this.player);
}

getDisplayedWord() {
  // Display the word with guessed letters
  this.wordToGuess = "ANGULAR"
  return this.wordToGuess!.replace(/\w/g,
    (letter) => (this.guessedLetters.has(letter.toUpperCase()) ? letter : '_ ')
  );
}
handleGuess(letter:string, index:number, level:string):void{
  if(!this.guessedLetters.has(letter)){
    this.guessedLetters.add(letter);
    if(!"ANGULAR".includes(letter)){
      this.attempts++;
      this.totalScore--;
      if(this.attempts > 7){
        this.outOfGuesses = true;
      }

      if(level == "top"){
        this.topButtons[index].clicked = true;
      }else if(level == "middle"){
        this.middleButtons[index].clicked = true;
      }else{
        this.bottomButtons[index].clicked = true;
      }
    }else{
      if(level == "top"){
        this.topButtons[index].correct = true;
      }else if(level == "middle"){
        this.middleButtons[index].correct = true;
      }else{
        this.bottomButtons[index].correct = true;
      }
    }
  }
}

submitAnswer(answer:string):void{
  const userGuess = answer.toUpperCase();
  if(userGuess == this.wordToGuess){
    this.correct = true;
    console.log(this.player.id);
    this.appService.updatePlayerScore(this.player.id, this.totalScore).subscribe(result => console.log(result));
  }else{
    this.wrong = true;
  }
}
}
