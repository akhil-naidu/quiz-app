import React, { useState } from 'react';
import Quiz from './Quiz';
import { SimpleGrid, Button, VStack, Input, Center } from '@chakra-ui/react';

import useQuizOneStore from '../store/quiz-one';
import useQuizTwoStore from '../store/quiz-two';

const Layout = () => {
  const [totalQuestions, setTotalQuestions] = useState<any>('');

  // Quiz One Variables
  const quizOneTitle = useQuizOneStore((state: any) => state.title);
  const quizOneStarted = useQuizOneStore((state: any) => state.quizStarted);
  const totalQuizOneQuestions = useQuizOneStore(
    (state: any) => state.totalQuestions,
  );
  const toggleQuizOne = useQuizOneStore((state: any) => state.toggleQuiz);
  const quizOneQuestions = useQuizOneStore((state: any) => state.questions);
  const currentQuestion = useQuizOneStore(
    (state: any) => state.currentQuestion,
  );
  const quizOneNextQuestion = useQuizOneStore(
    (state: any) => state.nextQuestion,
  );
  const submittedAnsForQuizOne = useQuizOneStore(
    (state: any) => state.submitAnswer,
  );

  const setQuizOneTotalQuestions = useQuizOneStore(
    (state: any) => state.setTotalQuestions,
  );
  const setQuizOneInitialQuestions = useQuizOneStore(
    (state: any) => state.setInitialQuestions,
  );

  const dataForQuizOne = {
    title: quizOneTitle,
    questions: quizOneQuestions,
    currentQuestion,
    nextQuestion: quizOneNextQuestion,
    submitAnswer: submittedAnsForQuizOne,
    totalQuestions: totalQuizOneQuestions,
  };

  // Quiz Two Variables
  const quizTwoTitle = useQuizTwoStore((state: any) => state.title);
  const quizTwoStarted = useQuizTwoStore((state: any) => state.quizStarted);
  const toggleQuizTwo = useQuizTwoStore((state: any) => state.toggleQuiz);

  const dataForQuizTwo = {
    title: quizTwoTitle,
    questions: quizOneQuestions,
  };

  const generateAndToggleQuizOne = () => {
    const questions: any = [];

    const generatedQuestions = () => {
      const operators = ['+', '-', '*', '/'];
      const answerGenerator: any = {
        '+': (n1: any, n2: any) => n1 + n2,
        '-': (n1: any, n2: any) => n1 - n2,
        '*': (n1: any, n2: any) => n1 * n2,
        '/': (n1: any, n2: any) => Math.floor(n1 / n2),
      };

      const num1 = Math.floor(Math.random() * 10 + 1);
      const num2 = Math.floor(Math.random() * 10 + 1);
      const operatorIndex = Math.floor(Math.random() * 3 + 1);

      const question = `${num1} ${operators[operatorIndex]} ${num2}`;
      const answer = answerGenerator[operators[operatorIndex]](num1, num2);

      const newQuestion = {
        id: questions.length + 1,
        title: question,
        answer,
        submittedAns: '',
      };

      questions.push(newQuestion);
    };

    new Array(totalQuestions).fill('').map(() => generatedQuestions());

    setQuizOneTotalQuestions(totalQuestions);
    setQuizOneInitialQuestions(questions);

    toggleQuizOne();
  };

  return (
    <SimpleGrid columns={2} spacing={10}>
      {quizOneStarted ? (
        <Quiz data={dataForQuizOne} />
      ) : (
        <Center>
          <VStack width='40%'>
            <Input
              placeholder='Enter Number of Questions'
              value={totalQuestions}
              onChange={(e: any) => setTotalQuestions(Number(e.target.value))}
            />
            <Input placeholder='Start Range' />
            <Input placeholder='End Range' />
            <Button onClick={generateAndToggleQuizOne}>Toggle Quiz One</Button>
          </VStack>
        </Center>
      )}
      {quizTwoStarted ? (
        <Quiz data={dataForQuizTwo} />
      ) : (
        <Center>
          <VStack width='40%'>
            <Input placeholder='Enter Number of Questions' />
            <Input placeholder='Start Range' />
            <Input placeholder='End Range' />
            <Button onClick={toggleQuizTwo}>Toggle Quiz Two</Button>
          </VStack>
        </Center>
      )}
    </SimpleGrid>
  );
};

export default Layout;
