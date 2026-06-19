import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Quiz from "./features/Quiz";
import { Container, Typography } from "@mui/material";
import { fetchQuiz } from "../api";

function Testing() {
  const [quizData, setQuizData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchQuiz();
      if (data.success) setQuizData(data.quiz);
    };
    load();
  }, []);

  return (
    <div>
      <Navbar active="4" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Проверь себя</Typography>
        {quizData.length > 0 && <Quiz data={quizData} />}
      </Container>
      <Footer />
    </div>
  );
}

export default Testing;