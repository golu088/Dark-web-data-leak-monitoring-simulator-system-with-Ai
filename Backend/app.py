from flask import Flask
from routes.email import email_routes
from routes.password import password_routes
from routes.username import username_routes
from routes.auth import auth_routes
from routes.stats import stats_routes
from routes.chat import chat_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register all routes 
app.register_blueprint(email_routes)
app.register_blueprint(password_routes)
app.register_blueprint(username_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(stats_routes)
app.register_blueprint(chat_routes)

if __name__ == "__main__":
    app.run(debug=True)


