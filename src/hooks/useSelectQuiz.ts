import { useQuizOneStore, useQuizTwoStore } from '../store/quiz';

const useSelectQuiz = (quizName: string) => {
  if (quizName === 'quiz one') {
    return useQuizOneStore;
  }

  if (quizName === 'quiz two') {
    return useQuizTwoStore;
  }
};

export default useSelectQuiz;
