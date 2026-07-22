import http.server
import socketserver
import json
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class VanillaPortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "stack": "Vanilla HTML5 + CSS3 + JS + Python 3",
                "app": "Mayank Kumar Gupta Portfolio"
            }).encode('utf-8'))
            return

        # Serve vanilla index.html or static files
        path_without_query = self.path.split('?')[0]
        if path_without_query == '/' or not os.path.exists(os.path.join(DIRECTORY, path_without_query.lstrip('/'))):
            self.path = '/index.html'

        return super().do_GET()

    def do_POST(self):
        if self.path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', 'Visitor')
                email = data.get('email', '')
                message = data.get('message', '')
                project_type = data.get('projectType', 'General Inquiry')

                print(f"\n==================================================")
                print(f"[NEW INQUIRY VIA VANILLA HTML/JS + PYTHON BACKEND]")
                print(f"Name:        {name}")
                print(f"Email:       {email}")
                print(f"Category:    {project_type}")
                print(f"Message:     {message}")
                print(f"Destination: Forwarded to Mayank (notmynk.exe@gmail.com)")
                print(f"==================================================\n")

                response_data = json.dumps({
                    "success": True,
                    "message": f"Thank you, {name}! Your message was successfully received and processed by Mayank's Python backend server.",
                    "data": {"name": name, "email": email, "projectType": project_type}
                }).encode('utf-8')

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_data)
            except Exception as err:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(err)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == "__main__":
    print(f"==================================================")
    print(f"Serving Vanilla Portfolio on http://0.0.0.0:{PORT}")
    print(f"Engineered with: HTML, CSS, JavaScript & Python 3")
    print(f"==================================================")
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), VanillaPortfolioHandler) as httpd:
        httpd.serve_forever()
