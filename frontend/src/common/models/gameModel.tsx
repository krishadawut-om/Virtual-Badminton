export interface GameModel {
  id: string;
  userId: string;
  userScore: number;
  opponentScore: number;
  totalPlayingTime: number;
  shots: Shots;
  createAt: Date;
}

export interface Shots {
  clear: number;
  drive: number;
  drop: number;
  smash: number;
}
