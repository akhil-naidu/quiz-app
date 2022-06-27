import React, { useState } from 'react';

import { Box, Input, Center, Button, HStack } from '@chakra-ui/react';

const Quiz = ({ data }: any) => {
  const [userAnswer, setUserAnswer] = useState<any>('');

  const answerSubmitted = () => {
    const answer = {
      ...data.questions[data.currentQuestion - 1],
      submittedAns: userAnswer,
    };

    console.log(answer);
    data.submitAnswer(answer);

    data.nextQuestion();
    setUserAnswer('');
  };

  if (data.currentQuestion > data.totalQuestions) {
    return (
      <div>
        {data.questions.map((question: any) => (
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
      {data.title}
      <Box bg='gray.200' height='80px'>
        <Center h='80px'>
          {data.questions[data.currentQuestion - 1].title}
        </Center>
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
