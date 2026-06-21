from flask import Blueprint, jsonify
from app.models.quiz_question import QuizQuestion
from structures.extension import db

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/', methods=['GET'])
def get_quiz():
    groups = db.session.query(QuizQuestion.group_id, QuizQuestion.title, QuizQuestion.quiz_type).distinct().order_by(QuizQuestion.group_id).all()
    
    quizzes = []
    for group in groups:
        questions = QuizQuestion.query.filter_by(group_id=group.group_id).order_by(QuizQuestion.task_order).all()
        
        tasks = []
        for q in questions:
            all_answers = [a.answer_text for a in q.answers]
            correct_answer = next((a.answer_text for a in q.answers if a.is_correct), '')
            
            if q.quiz_type == 'C':
                # Одиночный выбор: все ответы — варианты, один правильный
                tasks.append({
                    "question": q.question_text,
                    "answer": correct_answer,
                    "options": all_answers
                })
            elif q.quiz_type == 'R':
                # Множественный выбор: все ответы — варианты, правильные — отмечены
                correct_answers = [a.answer_text for a in q.answers if a.is_correct]
                tasks.append({
                    "question": q.question_text,
                    "answer": '|'.join(sorted(correct_answers)),
                    "options": all_answers
                })
            elif q.quiz_type == 'M':
                # Сопоставление: вопрос — текст вопроса, ответ — правильный ответ
                tasks.append({
                    "question": q.question_text,
                    "answer": correct_answer
                })
            elif q.quiz_type == 'S':
                # Сортировка: вопрос — элемент, ответ — номер позиции
                tasks.append({
                    "question": q.question_text,
                    "answer": correct_answer
                })
        
        quizzes.append({
            "id": group.group_id,
            "type": group.quiz_type,
            "title": group.title,
            "tasks": tasks
        })
    
    return jsonify({"success": True, "quiz": quizzes}), 200