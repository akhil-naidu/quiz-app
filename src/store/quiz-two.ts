import create from 'zustand';

const useQuizTwoStore = create((set) => ({
  title: 'Quiz Two Title',
  quizStarted: false,
  toggleQuiz: () => set((state: any) => ({ quizStarted: !state.quizStarted })),
}));

export default useQuizTwoStore;
