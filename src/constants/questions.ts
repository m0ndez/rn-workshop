import { z } from "zod";

const questionSchema = z.object({
  question: z.string(),
  choices: z.array(z.string()),
  answer: z.string(),
  answered: z.boolean().optional(),
});

export type Question = z.infer<typeof questionSchema>;

export const QUESTIONS: Question[] = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    choices: ["J.K. Rowling", "Stephen King", "Harper Lee", "J.R.R. Tolkien"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["H", "O2", "CO2", "H2O"],
    answer: "H2O",
  },
  {
    question: "Which country is famous for its tulips?",
    choices: ["Netherlands", "Italy", "France", "Germany"],
    answer: "Netherlands",
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"],
    answer: "Blue whale",
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    choices: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
    answer: "Carbon dioxide",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    choices: ["Gold", "Diamond", "Platinum", "Iron"],
    answer: "Diamond",
  },
  {
    question: "Who is credited with inventing the telephone?",
    choices: [
      "Thomas Edison",
      "Alexander Graham Bell",
      "Nikola Tesla",
      "Albert Einstein",
    ],
    answer: "Alexander Graham Bell",
  },
  {
    question: "What is the largest organ in the human body?",
    choices: ["Heart", "Liver", "Brain", "Skin"],
    answer: "Skin",
  },
  {
    question: "What is the chemical symbol for gold?",
    choices: ["Au", "Ag", "Fe", "Cu"],
    answer: "Au",
  },
  {
    question: 'Who wrote "Hamlet"?',
    choices: [
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
      "Charles Dickens",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "Which is the smallest planet in our solar system?",
    choices: ["Mercury", "Mars", "Earth", "Venus"],
    answer: "Mercury",
  },
  {
    question: "What is the chemical symbol for silver?",
    choices: ["Ag", "Au", "Fe", "Cu"],
    answer: "Ag",
  },
  {
    question: "Who discovered penicillin?",
    choices: [
      "Louis Pasteur",
      "Alexander Fleming",
      "Marie Curie",
      "Gregor Mendel",
    ],
    answer: "Alexander Fleming",
  },
  {
    question: "What is the currency of Japan?",
    choices: ["Yuan", "Euro", "Dollar", "Yen"],
    answer: "Yen",
  },
  {
    question: "Who is known as the father of modern physics?",
    choices: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answer: "Albert Einstein",
  },
  {
    question: "Which animal can sleep up to 3 years?",
    choices: ["Cat", "Elephant", "Koala", "Snail"],
    answer: "Snail",
  },
  {
    question: "What is the chemical symbol for sodium?",
    choices: ["Na", "No", "Ni", "Ne"],
    answer: "Na",
  },
];
