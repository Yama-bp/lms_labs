from structures.extension import db
from app.models.game import Game
from app.models.publisher import Publisher
from app.models.game_publisher import GamePublisher
from app.models.quiz_type import QuizType
from app.models.quiz_question import QuizQuestion
from app.models.quiz_answer import QuizAnswer

def load_data():
    if Game.query.count() > 0:
        print("Данные уже загружены")
        return
    
    print("Загрузка данных...")
    
    # Типы заданий
    quiz_types = [
        QuizType('M', 'Сопоставление'),
        QuizType('S', 'Сортировка'),
        QuizType('C', 'Одиночный выбор'),
        QuizType('R', 'Множественный выбор'),
    ]
    for qt in quiz_types:
        db.session.add(qt)
    
    # Игры
    games_data = [
        {"title": "PUBG Mobile", "release_year": 2018, "player_count": 300, "count_type": "monthly players",
         "publishers": ["Tencent", "Krafton"],
         "description": "PUBG Mobile — одна из самых популярных мобильных игр в жанре «королевская битва». Игроки высаживаются на остров, собирают оружие и сражаются до последнего выжившего. Игра собрала более 300 миллионов активных игроков ежемесячно.",
         "image_url": "/images/game1.jpg"},
        {"title": "Mobile Legends: Bang Bang", "release_year": 2017, "player_count": 150, "count_type": "peak daily players",
         "publishers": ["Moonton"],
         "description": "Mobile Legends: Bang Bang — популярная MOBA-игра. Достигла 150 миллионов пиковых ежедневных игроков. Игра предлагает быстрые матчи 5 на 5.",
         "image_url": "/images/game2.jpg"},
        {"title": "Call of Duty: Mobile", "release_year": 2019, "player_count": 1000, "count_type": "total downloads",
         "publishers": ["Activision"],
         "description": "Call of Duty: Mobile — мобильная версия знаменитой серии шутеров. Достигла 1 миллиарда загрузок.",
         "image_url": "/images/game3.jpg"},
        {"title": "Among Us", "release_year": 2018, "player_count": 485, "count_type": "total downloads",
         "publishers": ["InnerSloth"],
         "description": "Among Us — многопользовательская игра на социальную дедукцию. К ноябрю 2020 года набрала 485 миллионов игроков.",
         "image_url": "/images/game4.jpg"},
        {"title": "Genshin Impact", "release_year": 2020, "player_count": 65, "count_type": "monthly players",
         "publishers": ["HoYoverse"],
         "description": "Genshin Impact — action RPG с открытым миром. Насчитывает более 65 миллионов игроков.",
         "image_url": "/images/game5.jpg"},
        {"title": "Honor of Kings", "release_year": 2015, "player_count": 200, "count_type": "peak monthly players",
         "publishers": ["Tencent"],
         "description": "Honor of Kings — самая популярная MOBA-игра в Китае. Насчитывает более 200 миллионов пиковых ежемесячных игроков.",
         "image_url": "/images/game6.jpg"},
        {"title": "Subway Surfers", "release_year": 2012, "player_count": 100, "count_type": "monthly players",
         "publishers": ["SYBO Games"],
         "description": "Subway Surfers — бесконечный раннер. В июле 2019 года достигла 100 миллионов ежемесячных игроков.",
         "image_url": "/images/game7.jpg"},
        {"title": "Clash Royale", "release_year": 2016, "player_count": 50, "count_type": "daily players",
         "publishers": ["Supercell"],
         "description": "Clash Royale — стратегия в реальном времени. Насчитывает 50 миллионов ежедневных игроков.",
         "image_url": "/images/game8.jpg"},
        {"title": "Gardenscapes", "release_year": 2016, "player_count": 324, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Gardenscapes — игра в жанре «три в ряд». Насчитывает 324 миллиона игроков.",
         "image_url": "/images/game9.jpg"},
        {"title": "Hearthstone", "release_year": 2014, "player_count": 100, "count_type": "total downloads",
         "publishers": ["Blizzard"],
         "description": "Hearthstone — коллекционная карточная игра. К ноябрю 2018 года достигла 100 миллионов игроков.",
         "image_url": "/images/game10.jpg"},
        {"title": "Sonic Dash", "release_year": 2013, "player_count": 350, "count_type": "total downloads",
         "publishers": ["Sega"],
         "description": "Sonic Dash — бесконечный раннер с Соником. Насчитывает 350 миллионов загрузок.",
         "image_url": "/images/game1.jpg"},
        {"title": "Helix Jump", "release_year": 2018, "player_count": 334, "count_type": "total downloads",
         "publishers": ["Voodoo"],
         "description": "Helix Jump — аркадная игра. Насчитывает 334 миллиона загрузок.",
         "image_url": "/images/game2.jpg"},
        {"title": "Homescapes", "release_year": 2017, "player_count": 312, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Homescapes — игра в жанре «три в ряд» от Playrix. Насчитывает 312 миллионов игроков.",
         "image_url": "/images/game3.jpg"},
        {"title": "Super Mario Run", "release_year": 2016, "player_count": 300, "count_type": "total downloads",
         "publishers": ["Nintendo"],
         "description": "Super Mario Run — мобильная версия Mario. Насчитывает 300 миллионов загрузок.",
         "image_url": "/images/game4.jpg"},
        {"title": "Township", "release_year": 2012, "player_count": 274, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Township — фермерство и строительство города. Насчитывает 274 миллиона игроков.",
         "image_url": "/images/game5.jpg"},
        {"title": "Knives Out", "release_year": 2017, "player_count": 250, "count_type": "total downloads",
         "publishers": ["NetEase"],
         "description": "Knives Out — мобильная королевская битва. Насчитывает 250 миллионов загрузок.",
         "image_url": "/images/game6.jpg"},
        {"title": "Angry Birds 2", "release_year": 2015, "player_count": 230, "count_type": "total downloads",
         "publishers": ["Rovio"],
         "description": "Angry Birds 2 — продолжение знаменитой серии. Насчитывает 230 миллионов загрузок.",
         "image_url": "/images/game7.jpg"},
        {"title": "QQ Speed Mobile", "release_year": 2017, "player_count": 200, "count_type": "total downloads",
         "publishers": ["Tencent"],
         "description": "QQ Speed Mobile — гоночная игра. Насчитывает 200 миллионов загрузок.",
         "image_url": "/images/game8.jpg"},
        {"title": "Fishdom", "release_year": 2008, "player_count": 173, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Fishdom — три в ряд с аквариумными рыбками. Насчитывает 173 миллиона игроков.",
         "image_url": "/images/game9.jpg"},
        {"title": "Rise Up", "release_year": 2018, "player_count": 162, "count_type": "total downloads",
         "publishers": ["Serkan Ozyilmaz"],
         "description": "Rise Up — защити воздушный шар. Насчитывает 162 миллиона загрузок.",
         "image_url": "/images/game10.jpg"},
        {"title": "PES 2018 Mobile", "release_year": 2017, "player_count": 150, "count_type": "total downloads",
         "publishers": ["Konami"],
         "description": "PES 2018 Mobile — футбольный симулятор. Насчитывает 150 миллионов загрузок.",
         "image_url": "/images/game1.jpg"},
        {"title": "War Robots", "release_year": 2014, "player_count": 150, "count_type": "total downloads",
         "publishers": ["Pixonic"],
         "description": "War Robots — шутер с роботами. Насчитывает 150 миллионов загрузок.",
         "image_url": "/images/game2.jpg"},
        {"title": "World of Tanks", "release_year": 2010, "player_count": 140, "count_type": "total downloads",
         "publishers": ["Wargaming"],
         "description": "World of Tanks — танковый симулятор. Насчитывает 140 миллионов загрузок.",
         "image_url": "/images/game3.jpg"},
        {"title": "Mario Kart Tour", "release_year": 2019, "player_count": 124, "count_type": "total downloads",
         "publishers": ["Nintendo"],
         "description": "Mario Kart Tour — мобильные гонки Mario. Насчитывает 124 миллиона загрузок.",
         "image_url": "/images/game4.jpg"},
        {"title": "Ice Age Village", "release_year": 2012, "player_count": 120, "count_type": "total downloads",
         "publishers": ["Gameloft"],
         "description": "Ice Age Village — игра по мотивам мультфильма. Насчитывает 120 миллионов загрузок.",
         "image_url": "/images/game5.jpg"},
        {"title": "FIFA Mobile", "release_year": 2016, "player_count": 113, "count_type": "total downloads",
         "publishers": ["EA Sports"],
         "description": "FIFA Mobile — футбольный симулятор. Насчитывает 113 миллионов загрузок.",
         "image_url": "/images/game6.jpg"},
        {"title": "Ludo King", "release_year": 2016, "player_count": 100, "count_type": "total downloads",
         "publishers": ["Gametion"],
         "description": "Ludo King — настольная игра. Насчитывает 100 миллионов загрузок.",
         "image_url": "/images/game7.jpg"},
        {"title": "Flappy Bird", "release_year": 2013, "player_count": 50, "count_type": "total downloads",
         "publishers": ["dotGears"],
         "description": "Flappy Bird — вирусная аркада. Насчитывает 50 миллионов загрузок.",
         "image_url": "/images/game8.jpg"},
        {"title": "Dragon Ball Z: Dokkan Battle", "release_year": 2015, "player_count": 350, "count_type": "total downloads",
         "publishers": ["Bandai Namco"],
         "description": "Dragon Ball Z: Dokkan Battle — игра по вселенной Dragon Ball. Насчитывает 350 миллионов загрузок.",
         "image_url": "/images/game9.jpg"},
        {"title": "Mini World", "release_year": 2015, "player_count": 400, "count_type": "total downloads",
         "publishers": ["Minovate"],
         "description": "Mini World — песочница. Насчитывает 400 миллионов загрузок.",
         "image_url": "/images/game10.jpg"},
    ]
    
    publishers_cache = {}
    
    for data in games_data:
        game = Game(
            title=data['title'],
            release_year=data['release_year'],
            player_count=data['player_count'],
            count_type=data['count_type'],
            description=data['description'],
            image_url=data['image_url']
        )
        db.session.add(game)
        db.session.flush()
        
        for pub_name in data['publishers']:
            if pub_name not in publishers_cache:
                publisher = Publisher.query.filter_by(name=pub_name).first()
                if not publisher:
                    publisher = Publisher(pub_name)
                    db.session.add(publisher)
                    db.session.flush()
                publishers_cache[pub_name] = publisher.id
            
            gp = GamePublisher(game_id=game.id, publisher_id=publishers_cache[pub_name])
            db.session.add(gp)
    
    # Тестовые задания
    quiz_questions = [
        # Задание 1: Сопоставление
        {"group_id": 1, "quiz_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "PUBG Mobile", "order": 1,
         "answers": [{"text": "Tencent / Krafton", "correct": True}, {"text": "Supercell", "correct": False}, {"text": "HoYoverse", "correct": False}, {"text": "SYBO Games", "correct": False}]},
        {"group_id": 1, "quiz_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "Clash Royale", "order": 2,
         "answers": [{"text": "Supercell", "correct": True}, {"text": "Tencent", "correct": False}, {"text": "Moonton", "correct": False}, {"text": "Blizzard", "correct": False}]},
        {"group_id": 1, "quiz_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "Genshin Impact", "order": 3,
         "answers": [{"text": "HoYoverse", "correct": True}, {"text": "Nintendo", "correct": False}, {"text": "Sega", "correct": False}, {"text": "Playrix", "correct": False}]},
        {"group_id": 1, "quiz_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "Subway Surfers", "order": 4,
         "answers": [{"text": "SYBO Games", "correct": True}, {"text": "Voodoo", "correct": False}, {"text": "Rovio", "correct": False}, {"text": "Gameloft", "correct": False}]},
        
        # Задание 2: Сортировка
        {"group_id": 2, "quiz_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Call of Duty: Mobile", "order": 1,
         "answers": [{"text": "1", "correct": True}]},
        {"group_id": 2, "quiz_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Among Us", "order": 2,
         "answers": [{"text": "2", "correct": True}]},
        {"group_id": 2, "quiz_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "PUBG Mobile", "order": 3,
         "answers": [{"text": "3", "correct": True}]},
        {"group_id": 2, "quiz_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Honor of Kings", "order": 4,
         "answers": [{"text": "4", "correct": True}]},
        {"group_id": 2, "quiz_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Mobile Legends", "order": 5,
         "answers": [{"text": "5", "correct": True}]},
        
        # Задание 3: Одиночный выбор
        {"group_id": 3, "quiz_type": "C", "title": "Выберите правильный ответ: какая игра достигла 1 миллиарда загрузок?", "question": "Самая скачиваемая игра", "order": 1,
         "answers": [{"text": "PUBG Mobile", "correct": False}, {"text": "Call of Duty: Mobile", "correct": True}, {"text": "Among Us", "correct": False}, {"text": "Subway Surfers", "correct": False}]},
        
        # Задание 4: Множественный выбор
        {"group_id": 4, "quiz_type": "R", "title": "Выберите все игры от издателя Tencent.", "question": "Игры Tencent", "order": 1,
         "answers": [{"text": "PUBG Mobile", "correct": True}, {"text": "Among Us", "correct": False}, {"text": "Honor of Kings", "correct": True}, {"text": "Clash Royale", "correct": False}, {"text": "QQ Speed", "correct": True}]},
        
        # Задание 5: Одиночный выбор
        {"group_id": 5, "quiz_type": "C", "title": "Какая игра является самой старой из перечисленных?", "question": "Самая старая игра", "order": 1,
         "answers": [{"text": "Genshin Impact", "correct": False}, {"text": "PUBG Mobile", "correct": False}, {"text": "World of Tanks", "correct": True}, {"text": "Among Us", "correct": False}]},
        
        # Задание 6: Множественный выбор
        {"group_id": 6, "quiz_type": "R", "title": "Выберите игры, выпущенные в 2018 году.", "question": "Игры 2018 года", "order": 1,
         "answers": [{"text": "PUBG Mobile", "correct": True}, {"text": "Genshin Impact", "correct": False}, {"text": "Among Us", "correct": True}, {"text": "Helix Jump", "correct": True}, {"text": "Honor of Kings", "correct": False}]},
    ]
    
    for q_data in quiz_questions:
        question = QuizQuestion(
            question_text=q_data['question'],
            quiz_type=q_data['quiz_type'],
            title=q_data['title'],
            group_id=q_data['group_id'],
            task_order=q_data['order']
        )
        db.session.add(question)
        db.session.flush()
        
        for a_data in q_data['answers']:
            answer = QuizAnswer(
                question_id=question.id,
                answer_text=a_data['text'],
                is_correct=a_data['correct']
            )
            db.session.add(answer)
    
    db.session.commit()
    print(f"Загружено игр: {Game.query.count()}")
    print(f"Загружено издателей: {Publisher.query.count()}")
    print(f"Загружено типов тестов: {QuizType.query.count()}")
    print(f"Загружено вопросов: {QuizQuestion.query.count()}")
    print(f"Загружено ответов: {QuizAnswer.query.count()}")