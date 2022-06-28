import React, { useState } from 'react';

import { Box, Input, Center, Button, HStack } from '@chakra-ui/react';
import useSelectQuiz from '../hooks/useSelectQuiz';

const Quiz = ({ quizName }: any) => {
  const [userAnswer, setUserAnswer] = useState<any>('');

  const useQuizStore: any = useSelectQuiz(quizName);

  const title = useQuizStore((state: any) => state.title);
  const questions = useQuizStore((state: any) => state.questions);
  const currentQuestion = useQuizStore((state: any) => state.currentQuestion);
  const nextQuestion = useQuizStore((state: any) => state.nextQuestion);
  const submitAnswer = useQuizStore((state: any) => state.submitAnswer);
  const totalQuestions = useQuizStore((state: any) => state.totalQuestions);

  const answerSubmitted = () => {
    const answer = {
      ...questions[currentQuestion - 1],
      submittedAns: userAnswer,
    };

    submitAnswer(answer);

    nextQuestion();
    setUserAnswer('');
  };

  if (currentQuestion > totalQuestions) {
    return (
      <div>
        {questions.map((question: any) => (
          <Box key={question.id} bg='gray.200' p={4}>
            <h1>Question: {question.title}</h1>
            <h1>Correct Answer: {question.answer}</h1>
            <h1>Submitted Answer: {question.submittedAns}</h1>
            <h1>
              Result:
              {question.answer === question.submittedAns ? 'Correct' : 'Wrong'}
            </h1>
          </Box>
        ))}
      </div>
    );
  }

  return (
    <div>
      {title}
      <Box bg='gray.200' height='80px'>
        <Center h='80px'>{questions[currentQuestion - 1].title}</Center>
      </Box>
      <Center py={4}>
        <HStack spacing='24px'>
          <Input
            placeholder='Enter Your Answer'
            value={userAnswer}
            onChange={(e: any) => setUserAnswer(Number(e.target.value))}
          />

          <Button colorScheme='teal' size='md' onClick={answerSubmitted}>
            Button
          </Button>
        </HStack>
      </Center>
    </div>
  );
};

export default Quiz;
