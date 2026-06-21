from structures.extension import db

class QuizAnswer(db.Model):
    __tablename__ = 'quiz_answer'
    
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'), nullable=False)
    answer_text = db.Column('Текст ответа', db.String(500), nullable=False)
    is_correct = db.Column('Правильный', db.Boolean, default=False)
    
    question = db.relationship('QuizQuestion', back_populates='answers')
    
    def __init__(self, question_id, answer_text, is_correct=False):
        self.question_id = question_id
        self.answer_text = answer_text
        self.is_correct = is_correct
    
    def __repr__(self):
        return f'<QuizAnswer {self.id}: {self.answer_text[:30]} ({"✓" if self.is_correct else "✗"})>'