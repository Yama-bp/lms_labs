from flask import Blueprint, jsonify
from app.models.quiz_task import QuizTask
from structures.extension import db

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/', methods=['GET'])
def get_quiz():
    groups = db.session.query(QuizTask.group_id, QuizTask.title, QuizTask.task_type).distinct().order_by(QuizTask.group_id).all()
    
    quizzes = []
    for group in groups:
        tasks = QuizTask.query.filter_by(group_id=group.group_id).order_by(QuizTask.task_order).all()
        quizzes.append({
            "id": group.group_id,
            "type": group.task_type,
            "title": group.title,
            "tasks": [{"question": t.question, "answer": t.answer, "options": t.options.split("|") if t.options else []} for t in tasks]
        })
    
    return jsonify({"success": True, "quiz": quizzes}), 200