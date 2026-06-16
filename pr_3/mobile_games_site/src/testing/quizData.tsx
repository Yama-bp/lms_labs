export type tTasks = {
  "question": string;
  "answer": string;
  "options"?: string[];
}[]

export type tQuizzes = {
  "id": number,
  "type": "M" | "S" | "C" | "R",
  "title": string,
  "tasks": tTasks,
}[];

export const quiz: tQuizzes = [
  {
    "id": 1,
    "type": "M",
    "title": "Сопоставьте игру и её издателя.",
    "tasks": [
      { "question": "PUBG Mobile", "answer": "Tencent / Krafton" },
      { "question": "Clash Royale", "answer": "Supercell" },
      { "question": "Genshin Impact", "answer": "HoYoverse" },
      { "question": "Subway Surfers", "answer": "SYBO Games" },
    ]
  },
  {
    "id": 2,
    "type": "S",
    "title": "Расположите игры по убыванию количества игроков.",
    "tasks": [
      { "question": "Call of Duty: Mobile", "answer": "1" },
      { "question": "Among Us", "answer": "2" },
      { "question": "PUBG Mobile", "answer": "3" },
      { "question": "Honor of Kings", "answer": "4" },
      { "question": "Mobile Legends", "answer": "5" },
    ]
  },
  {
    "id": 3,
    "type": "C",
    "title": "Выберите правильный ответ: какая игра достигла 1 миллиарда загрузок?",
    "tasks": [
      { "question": "Самая скачиваемая игра", "answer": "Call of Duty: Mobile",
        "options": ["PUBG Mobile", "Call of Duty: Mobile", "Among Us", "Subway Surfers"] },
    ]
  },
  {
    "id": 4,
    "type": "R",
    "title": "Выберите все игры от издателя Tencent.",
    "tasks": [
      { "question": "Игры Tencent", "answer": "PUBG Mobile,Honor of Kings,QQ Speed",
        "options": ["PUBG Mobile", "Among Us", "Honor of Kings", "Clash Royale", "QQ Speed"] },
    ]
  },
  {
    "id": 5,
    "type": "C",
    "title": "Какая игра является самой старой из перечисленных?",
    "tasks": [
      { "question": "Самая старая игра", "answer": "World of Tanks",
        "options": ["Genshin Impact", "PUBG Mobile", "World of Tanks", "Among Us"] },
    ]
  },
  {
    "id": 6,
    "type": "R",
    "title": "Выберите игры, выпущенные в 2018 году.",
    "tasks": [
      { "question": "Игры 2018 года", "answer": "PUBG Mobile,Among Us,Helix Jump",
        "options": ["PUBG Mobile", "Genshin Impact", "Among Us", "Helix Jump", "Honor of Kings"] },
    ]
  },
];