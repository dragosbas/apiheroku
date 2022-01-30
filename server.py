from flask import Flask,render_template
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

def main():
    app.run(debug=True)

if __name__=='__main__':
    main()