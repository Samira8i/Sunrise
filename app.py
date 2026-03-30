from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging
import os  # ДОБАВИТЬ ЭТУ СТРОКУ
from datetime import datetime

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# ========== БЕРЕМ КЛЮЧИ ИЗ ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ==========
VK_TOKEN = os.environ.get('VK_TOKEN')  # Берем из окружения
VK_USER_ID = os.environ.get('VK_USER_ID')  # Берем из окружения

# Проверяем, что ключи есть
if not VK_TOKEN or not VK_USER_ID:
    logger.error("Ошибка: VK_TOKEN или VK_USER_ID не заданы в переменных окружения")
# =========================================================

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Проверка что ключи есть
        if not VK_TOKEN or not VK_USER_ID:
            return jsonify({
                'success': False,
                'error': 'Сервер не настроен. Обратитесь к администратору.'
            }), 500

        data = request.json
        name = data.get('name', '')
        phone = data.get('phone', '')
        message = data.get('message', '')

        if not name or not phone:
            return jsonify({
                'success': False,
                'error': 'Заполните имя и телефон'
            }), 400

        text = f"""📩 НОВАЯ ЗАЯВКА С САЙТА САНРАЙЗ!

👤 Имя: {name}
📞 Телефон: {phone}
💬 Сообщение: {message if message else 'Нет'}

🕐 Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}
🌐 Источник: Сайт sunrise.ru
"""

        vk_url = "https://api.vk.com/method/messages.send"
        params = {
            'user_id': VK_USER_ID,
            'message': text,
            'random_id': 0,
            'access_token': VK_TOKEN,
            'v': '5.131'
        }

        logger.info(f"Отправляем заявку: {name} - {phone}")
        response = requests.get(vk_url, params=params)
        result = response.json()

        if 'error' in result:
            logger.error(f"Ошибка ВК: {result['error']}")
            return jsonify({
                'success': False,
                'error': 'Ошибка отправки в ВК'
            }), 500

        logger.info(f"Заявка успешно отправлена в ВК")
        return jsonify({
            'success': True,
            'message': 'Спасибо! Мы свяжемся с вами в ближайшее время.'
        })

    except Exception as e:
        logger.error(f"Ошибка на сервере: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Произошла ошибка на сервере'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'time': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)