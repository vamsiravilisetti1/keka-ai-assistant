from flask import Flask
from apicontroller import policy_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register Blueprint
app.register_blueprint(policy_bp)

if __name__ == "__main__":
    app.run(debug=True)
