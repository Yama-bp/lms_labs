import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Quiz from "./features/Quiz";
import { Container, Typography } from "@mui/material";

function Testing() {
  return (
    <div>
      <Navbar active="4" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Проверь себя</Typography>
        <Quiz />
      </Container>
      <Footer />
    </div>
  );
}

export default Testing;