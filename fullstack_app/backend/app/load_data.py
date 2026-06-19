import json
from structures.extension import db
from app.models.game import Game
from app.models.publisher import Publisher
from app.models.game_publisher import GamePublisher
from app.models.quiz_task import QuizTask

def load_data():
    if Game.query.count() > 0:
        print("Данные уже загружены")
        return
    
    print("Загрузка данных...")
    
    games_data = [
        {"title": "PUBG Mobile", "release_year": 2018, "player_count": 300, "count_type": "monthly players",
         "publishers": ["Tencent", "Krafton"],
         "description": "PUBG Mobile — одна из самых популярных мобильных игр в жанре «королевская битва». Игроки высаживаются на остров, собирают оружие и сражаются до последнего выжившего. Игра собрала более 300 миллионов активных игроков ежемесячно.",
         "image_url": "/images/game1.jpg"},
        {"title": "Mobile Legends: Bang Bang", "release_year": 2017, "player_count": 150, "count_type": "peak daily players",
         "publishers": ["Moonton"],
         "description": "Mobile Legends: Bang Bang — популярная MOBA-игра. Достигла 150 миллионов пиковых ежедневных игроков. Игра предлагает быстрые матчи 5 на 5, множество героев и регулярные обновления.",
         "image_url": "/images/game2.jpg"},
        {"title": "Call of Duty: Mobile", "release_year": 2019, "player_count": 1000, "count_type": "total downloads",
         "publishers": ["Activision"],
         "description": "Call of Duty: Mobile — мобильная версия знаменитой серии шутеров. Достигла 1 миллиарда загрузок. Включает классические карты и режимы из предыдущих игр серии.",
         "image_url": "/images/game3.jpg"},
        {"title": "Among Us", "release_year": 2018, "player_count": 485, "count_type": "total downloads",
         "publishers": ["InnerSloth"],
         "description": "Among Us — многопользовательская игра на социальную дедукцию. К ноябрю 2020 года набрала 485 миллионов игроков. Игроки выполняют задания на космическом корабле, пытаясь вычислить предателя.",
         "image_url": "/images/game4.jpg"},
        {"title": "Genshin Impact", "release_year": 2020, "player_count": 65, "count_type": "monthly players",
         "publishers": ["HoYoverse"],
         "description": "Genshin Impact — action RPG с открытым миром. Насчитывает более 65 миллионов игроков. Игра доступна на мобильных устройствах, ПК и консолях.",
         "image_url": "/images/game5.jpg"},
        {"title": "Honor of Kings", "release_year": 2015, "player_count": 200, "count_type": "peak monthly players",
         "publishers": ["Tencent"],
         "description": "Honor of Kings — самая популярная MOBA-игра в Китае. Насчитывает более 200 миллионов пиковых ежемесячных игроков. Международная версия известна как Arena of Valor.",
         "image_url": "/images/game6.jpg"},
        {"title": "Subway Surfers", "release_year": 2012, "player_count": 100, "count_type": "monthly players",
         "publishers": ["SYBO Games"],
         "description": "Subway Surfers — бесконечный раннер. В июле 2019 года достигла 100 миллионов ежемесячных игроков. Игроки управляют персонажем, убегающим от инспектора.",
         "image_url": "/images/game7.jpg"},
        {"title": "Clash Royale", "release_year": 2016, "player_count": 50, "count_type": "daily players",
         "publishers": ["Supercell"],
         "description": "Clash Royale — стратегия в реальном времени с элементами коллекционных карточных игр. Насчитывает 50 миллионов ежедневных игроков.",
         "image_url": "/images/game8.jpg"},
        {"title": "Gardenscapes", "release_year": 2016, "player_count": 324, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Gardenscapes — игра в жанре «три в ряд» с элементами строительства. Насчитывает 324 миллиона игроков. Игроки помогают дворецкому Остину восстановить старый сад.",
         "image_url": "/images/game9.jpg"},
        {"title": "Hearthstone", "release_year": 2014, "player_count": 100, "count_type": "total downloads",
         "publishers": ["Blizzard"],
         "description": "Hearthstone — коллекционная карточная игра. К ноябрю 2018 года достигла 100 миллионов игроков. Основана на вселенной Warcraft.",
         "image_url": "/images/game10.jpg"},
        {"title": "Sonic Dash", "release_year": 2013, "player_count": 350, "count_type": "total downloads",
         "publishers": ["Sega"],
         "description": "Sonic Dash — бесконечный раннер с Соником. Насчитывает 350 миллионов загрузок. Игроки бегут через уровни, собирая кольца и уворачиваясь от препятствий.",
         "image_url": "/images/game1.jpg"},
        {"title": "Helix Jump", "release_year": 2018, "player_count": 334, "count_type": "total downloads",
         "publishers": ["Voodoo"],
         "description": "Helix Jump — аркадная игра, где нужно провести мяч через спиральную башню. Насчитывает 334 миллиона загрузок.",
         "image_url": "/images/game2.jpg"},
        {"title": "Homescapes", "release_year": 2017, "player_count": 312, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Homescapes — игра в жанре «три в ряд» от Playrix. Насчитывает 312 миллионов игроков. Помогите Остину восстановить особняк.",
         "image_url": "/images/game3.jpg"},
        {"title": "Super Mario Run", "release_year": 2016, "player_count": 300, "count_type": "total downloads",
         "publishers": ["Nintendo"],
         "description": "Super Mario Run — мобильная версия знаменитой серии от Nintendo. Насчитывает 300 миллионов загрузок. Марио бежит автоматически, игрок управляет прыжками.",
         "image_url": "/images/game4.jpg"},
        {"title": "Township", "release_year": 2012, "player_count": 274, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Township — игра от Playrix, сочетающая фермерство и строительство города. Насчитывает 274 миллиона игроков.",
         "image_url": "/images/game5.jpg"},
        {"title": "Knives Out", "release_year": 2017, "player_count": 250, "count_type": "total downloads",
         "publishers": ["NetEase"],
         "description": "Knives Out — мобильная королевская битва от NetEase. Насчитывает 250 миллионов загрузок.",
         "image_url": "/images/game6.jpg"},
        {"title": "Angry Birds 2", "release_year": 2015, "player_count": 230, "count_type": "total downloads",
         "publishers": ["Rovio"],
         "description": "Angry Birds 2 — продолжение знаменитой серии от Rovio. Насчитывает 230 миллионов загрузок.",
         "image_url": "/images/game7.jpg"},
        {"title": "QQ Speed Mobile", "release_year": 2017, "player_count": 200, "count_type": "total downloads",
         "publishers": ["Tencent"],
         "description": "QQ Speed Mobile — гоночная мобильная игра от Tencent. Насчитывает 200 миллионов загрузок.",
         "image_url": "/images/game8.jpg"},
        {"title": "Fishdom", "release_year": 2008, "player_count": 173, "count_type": "total downloads",
         "publishers": ["Playrix"],
         "description": "Fishdom — игра в жанре «три в ряд» с аквариумными рыбками от Playrix. Насчитывает 173 миллиона игроков.",
         "image_url": "/images/game9.jpg"},
        {"title": "Rise Up", "release_year": 2018, "player_count": 162, "count_type": "total downloads",
         "publishers": ["Serkan Ozyilmaz"],
         "description": "Rise Up — аркадная игра, где нужно защитить воздушный шар. Насчитывает 162 миллиона загрузок.",
         "image_url": "/images/game10.jpg"},
        {"title": "PES 2018 Mobile", "release_year": 2017, "player_count": 150, "count_type": "total downloads",
         "publishers": ["Konami"],
         "description": "PES 2018 Mobile — мобильная версия футбольного симулятора от Konami. Насчитывает 150 миллионов загрузок.",
         "image_url": "/images/game1.jpg"},
        {"title": "War Robots", "release_year": 2014, "player_count": 150, "count_type": "total downloads",
         "publishers": ["Pixonic"],
         "description": "War Robots — многопользовательский шутер с роботами. Насчитывает 150 миллионов загрузок.",
         "image_url": "/images/game2.jpg"},
        {"title": "World of Tanks", "release_year": 2010, "player_count": 140, "count_type": "total downloads",
         "publishers": ["Wargaming"],
         "description": "World of Tanks — танковый симулятор от Wargaming. Насчитывает 140 миллионов загрузок.",
         "image_url": "/images/game3.jpg"},
        {"title": "Mario Kart Tour", "release_year": 2019, "player_count": 124, "count_type": "total downloads",
         "publishers": ["Nintendo"],
         "description": "Mario Kart Tour — мобильная версия гонок Mario Kart от Nintendo. Насчитывает 124 миллиона загрузок.",
         "image_url": "/images/game4.jpg"},
        {"title": "Ice Age Village", "release_year": 2012, "player_count": 120, "count_type": "total downloads",
         "publishers": ["Gameloft"],
         "description": "Ice Age Village — игра по мотивам мультфильма «Ледниковый период» от Gameloft. Насчитывает 120 миллионов загрузок.",
         "image_url": "/images/game5.jpg"},
        {"title": "FIFA Mobile", "release_year": 2016, "player_count": 113, "count_type": "total downloads",
         "publishers": ["EA Sports"],
         "description": "FIFA Mobile — мобильная версия футбольного симулятора от EA Sports. Насчитывает 113 миллионов загрузок.",
         "image_url": "/images/game6.jpg"},
        {"title": "Ludo King", "release_year": 2016, "player_count": 100, "count_type": "total downloads",
         "publishers": ["Gametion"],
         "description": "Ludo King — мобильная версия настольной игры Ludo. Насчитывает 100 миллионов загрузок.",
         "image_url": "/images/game7.jpg"},
        {"title": "Flappy Bird", "release_year": 2013, "player_count": 50, "count_type": "total downloads",
         "publishers": ["dotGears"],
         "description": "Flappy Bird — знаменитая аркадная игра, ставшая вирусной в 2014 году. Насчитывает 50 миллионов загрузок.",
         "image_url": "/images/game8.jpg"},
        {"title": "Dragon Ball Z: Dokkan Battle", "release_year": 2015, "player_count": 350, "count_type": "total downloads",
         "publishers": ["Bandai Namco"],
         "description": "Dragon Ball Z: Dokkan Battle — мобильная игра по вселенной Dragon Ball от Bandai Namco. Насчитывает 350 миллионов загрузок.",
         "image_url": "/images/game9.jpg"},
        {"title": "Mini World", "release_year": 2015, "player_count": 400, "count_type": "total downloads",
         "publishers": ["Minovate"],
         "description": "Mini World — песочница в стиле Minecraft. Насчитывает 400 миллионов загрузок.",
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
    
    quiz_tasks = [
        {"task_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "PUBG Mobile", "answer": "Tencent, Krafton", "options": "", "task_order": 1, "group_id": 1},
        {"task_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "Clash Royale", "answer": "Supercell", "options": "", "task_order": 2, "group_id": 1},
        {"task_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "Genshin Impact", "answer": "HoYoverse", "options": "", "task_order": 3, "group_id": 1},
        {"task_type": "M", "title": "Сопоставьте игру и её издателя.", "question": "Subway Surfers", "answer": "SYBO Games", "options": "", "task_order": 4, "group_id": 1},
        
        {"task_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Call of Duty: Mobile", "answer": "1", "options": "", "task_order": 1, "group_id": 2},
        {"task_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Among Us", "answer": "2", "options": "", "task_order": 2, "group_id": 2},
        {"task_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "PUBG Mobile", "answer": "3", "options": "", "task_order": 3, "group_id": 2},
        {"task_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Honor of Kings", "answer": "4", "options": "", "task_order": 4, "group_id": 2},
        {"task_type": "S", "title": "Расположите игры по убыванию количества игроков.", "question": "Mobile Legends", "answer": "5", "options": "", "task_order": 5, "group_id": 2},
        
        {"task_type": "C", "title": "Выберите правильный ответ: какая игра достигла 1 миллиарда загрузок?", "question": "Самая скачиваемая игра", "answer": "Call of Duty: Mobile", "options": "PUBG Mobile|Call of Duty: Mobile|Among Us|Subway Surfers", "task_order": 1, "group_id": 3},
        
        {"task_type": "R", "title": "Выберите все игры от издателя Tencent.", "question": "Игры Tencent", "answer": "PUBG Mobile|Honor of Kings|QQ Speed", "options": "PUBG Mobile|Among Us|Honor of Kings|Clash Royale|QQ Speed", "task_order": 1, "group_id": 4},
        
        {"task_type": "C", "title": "Какая игра является самой старой из перечисленных?", "question": "Самая старая игра", "answer": "World of Tanks", "options": "Genshin Impact|PUBG Mobile|World of Tanks|Among Us", "task_order": 1, "group_id": 5},
        
        {"task_type": "R", "title": "Выберите игры, выпущенные в 2018 году.", "question": "Игры 2018 года", "answer": "PUBG Mobile|Among Us|Helix Jump", "options": "PUBG Mobile|Genshin Impact|Among Us|Helix Jump|Honor of Kings", "task_order": 1, "group_id": 6},
    ]
    
    for task in quiz_tasks:
        quiz_task = QuizTask(**task)
        db.session.add(quiz_task)
    
    db.session.commit()
    print(f"Загружено игр: {Game.query.count()}")
    print(f"Загружено издателей: {Publisher.query.count()}")
    print(f"Загружено связей: {GamePublisher.query.count()}")
    print(f"Загружено тестовых заданий: {QuizTask.query.count()}")