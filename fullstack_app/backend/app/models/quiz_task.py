from structures.extension import db

class QuizTask(db.Model):
    __tablename__ = 'quiz_task'
    
    id = db.Column(db.Integer, primary_key=True)
    task_type = db.Column('Тип задания', db.String(1), nullable=False)
    title = db.Column('Заголовок', db.String(500), nullable=False)
    question = db.Column('Вопрос', db.String(500), nullable=False)
    answer = db.Column('Ответ', db.String(500), nullable=False)
    options = db.Column('Варианты', db.String(1000), default='')
    task_order = db.Column('Порядок', db.Integer, default=0)
    group_id = db.Column('Группа', db.Integer, default=1)
    
    def __init__(self, task_type, title, question, answer, options='', task_order=0, group_id=1):
        self.task_type = task_type
        self.title = title
        self.question = question
        self.answer = answer
        self.options = options
        self.task_order = task_order
        self.group_id = group_id
    
    def __repr__(self):
        return f'<QuizTask {self.id}: {self.task_type} - {self.question[:30]}>'