import React, { useState } from 'react';
import Quiz from './Quiz';
import { SimpleGrid, Button, VStack, Input, Center } from '@chakra-ui/react';

import { useQuizOneStore, useQuizTwoStore } from '../store/quiz';

const Layout = () => {
  const [totalQuestionsForQuizOne, setTotalQuestionsForQuizOne] =
    useState<any>('');
  const [totalQuestionsForQuizTwo, setTotalQuestionsForQuizTwo] =
    useState<any>('');

  const quizOneStarted = useQuizOneStore((state: any) => state.quizStarted);
  const toggleQuizOne = useQuizOneStore((state: any) => state.toggleQuiz);

  const setQuizOneTotalQuestions = useQuizOneStore(
    (state: any) => state.setTotalQuestions,
  );
  const setQuizOneInitialQuestions = useQuizOneStore(
    (state: any) => state.setInitialQuestions,
  );

  const quizTwoStarted = useQuizTwoStore((state: any) => state.quizStarted);
  const toggleQuizTwo = useQuizTwoStore((state: any) => state.toggleQuiz);

  const setQuizTwoTotalQuestions = useQuizTwoStore(
    (state: any) => state.setTotalQuestions,
  );
  const setQuizTwoInitialQuestions = useQuizTwoStore(
    (state: any) => state.setInitialQuestions,
  );

  const generateAndToggleQuiz = (quizName: string) => {
    const operators = ['+', '-', '*', '/'];
    const answerGenerator: any = {
      '+': (n1: any, n2: any) => n1 + n2,
      '-': (n1: any, n2: any) => n1 - n2,
      '*': (n1: any, n2: any) => n1 * n2,
      '/': (n1: any, n2: any) => Math.floor(n1 / n2),
    };

    const questionsOne: any = [];
    const questionsTwo: any = [];

    const generatedQuestions = (quizName: string, length: number) => {
      const num1 = Math.floor(Math.random() * 10 + 1);
      const num2 = Math.floor(Math.random() * 10 + 1);
      const operatorIndex = Math.floor(Math.random() * 3 + 1);

      const question = `${num1} ${operators[operatorIndex]} ${num2}`;
      const answer = answerGenerator[operators[operatorIndex]](num1, num2);

      if (quizName === 'quiz one') {
        const newQuestion = {
          id: questionsOne.length + 1,
          title: question,
          answer,
          submittedAns: '',
        };
        questionsOne.push(newQuestion);
      }

      if (quizName === 'quiz two') {
        const newQuestion = {
          id: questionsTwo.length + 1,
          title: question,
          answer,
          submittedAns: '',
        };
        questionsTwo.push(newQuestion);
      }
    };

    if (quizName === 'quiz one') {
      new Array(totalQuestionsForQuizOne)
        .fill('')
        .map((_, index) => generatedQuestions('quiz one', index));
      setQuizOneTotalQuestions(totalQuestionsForQuizOne);
      setQuizOneInitialQuestions(questionsOne);

      toggleQuizOne();
    }

    if (quizName === 'quiz two') {
      new Array(totalQuestionsForQuizTwo)
        .fill('')
        .map((_, index) => generatedQuestions('quiz two', index));
      setQuizTwoTotalQuestions(totalQuestionsForQuizTwo);
      setQuizTwoInitialQuestions(questionsTwo);

      toggleQuizTwo();
    }
  };

  return (
    <SimpleGrid columns={2} spacing={10}>
      {quizOneStarted ? (
        <Quiz quizName='quiz one' />
      ) : (
        <Center>
          <VStack width='40%'>
            <Input
              placeholder='Enter Number of Questions'
              value={totalQuestionsForQuizOne}
              onChange={(e: any) =>
                setTotalQuestionsForQuizOne(Number(e.target.value))
              }
            />
            <Input placeholder='Start Range' />
            <Input placeholder='End Range' />
            <Button onClick={() => generateAndToggleQuiz('quiz one')}>
              Toggle Quiz One
            </Button>
          </VStack>
        </Center>
      )}

      {quizTwoStarted ? (
        <Quiz quizName='quiz two' />
      ) : (
        <Center>
          <VStack width='40%'>
            <Input
              placeholder='Enter Number of Questions'
              value={totalQuestionsForQuizTwo}
              onChange={(e: any) =>
                setTotalQuestionsForQuizTwo(Number(e.target.value))
              }
            />
            <Input placeholder='Start Range' />
            <Input placeholder='End Range' />
            <Button onClick={() => generateAndToggleQuiz('quiz two')}>
              Toggle Quiz Two
            </Button>
          </VStack>
        </Center>
      )}
    </SimpleGrid>
  );
};

export default Layout;
