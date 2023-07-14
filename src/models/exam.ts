export interface Exam {
  date: string,
  time: string,
  name: string,
  courseId: string,
  type: examType
  questions: question[]
}

enum examType {
  MCQ = "MCQ",
  TRUE_FALSE = "TRUE_FALSE",
  CLASSIC = "CLASSIC",
}

type question = {
  question: string,
  answers: string[]
  correctAnswer: string
}

