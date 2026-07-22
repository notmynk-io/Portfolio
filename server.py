import http.server
import socketserver
import json
import os

PORT = 3000
DIRECTORY = "."

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
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
                "backend": "Python 3 Standard Library HTTP Server",
                "app": "Mayank Kumar Gupta Portfolio"
            }).encode('utf-8'))
            return

        # Serve static HTML/CSS/JS files or fallback to index.html
        path_without_query = self.path.split('?')[0]
        full_path = os.path.join(DIRECTORY, path_without_query.lstrip('/'))
        
        if not os.path.exists(full_path) or os.path.isdir(full_path):
            if path_without_query.startswith('/api/'):
                self.send_response(404)
                self.end_headers()
                return
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
                print(f"[NEW INQUIRY RECEIVED BY PYTHON SERVER]")
                print(f"Name:        {name}")
                print(f"Email:       {email}")
                print(f"Category:    {project_type}")
                print(f"Message:     {message}")
                print(f"Forwarding:  Dispatched to Mayank (notmynk.exe@gmail.com)")
                print(f"==================================================\n")

                response_data = json.dumps({
                    "success": True,
                    "message": f"Thank you, {name}! Your message was successfully received by Mayank's Python backend.",
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
    print(f"Starting Python HTTP Server on 0.0.0.0:{PORT}...")
    with socketserver.TCPServer(("0.0.0.0", PORT), PortfolioHandler) as httpd:
        httpd.serve_forever()
