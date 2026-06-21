from structures.extension import db

class QuizQuestion(db.Model):
    __tablename__ = 'quiz_question'
    
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column('Текст вопроса', db.String(500), nullable=False)
    quiz_type = db.Column('Тип задания', db.String(1), nullable=False)
    title = db.Column('Заголовок задания', db.String(500), default='')
    group_id = db.Column('Группа', db.Integer, default=1)
    task_order = db.Column('Порядок', db.Integer, default=0)
    
    answers = db.relationship('QuizAnswer', back_populates='question', cascade='all, delete-orphan')
    
    def __init__(self, question_text, quiz_type, title='', group_id=1, task_order=0):
        self.question_text = question_text
        self.quiz_type = quiz_type
        self.title = title
        self.group_id = group_id
        self.task_order = task_order
    
    def __repr__(self):
        return f'<QuizQuestion {self.id}: {self.question_text[:30]}>'