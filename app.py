from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import datetime
import os

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    project_type = data.get('projectType', 'General Inquiry')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({
            'success': False,
            'error': 'Missing required fields: Please provide your name, email, and message.'
        }), 400

    timestamp = datetime.datetime.now().isoformat()
    print("\n==================================================")
    print("[NEW INQUIRY RECEIVED VIA PYTHON FLASK BACKEND]")
    print(f"Timestamp:   {timestamp}")
    print(f"Name:        {name}")
    print(f"Email:       {email}")
    print(f"Category:    {project_type}")
    print(f"Message:     {message}")
    print("Forwarding:  Dispatched to Mayank's inbox (notmynk.exe@gmail.com)")
    print("==================================================\n")

    return jsonify({
        'success': True,
        'message': f"Thank you, {name}! Your inquiry has been received by the Python backend.",
        'timestamp': timestamp,
        'receivedData': {'name': name, 'email': email, 'projectType': project_type}
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'backend': 'Python Flask API',
        'app': 'Mayank Kumar Gupta Portfolio'
    })

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
