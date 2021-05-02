from flask import Flask,render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/risk")
def hello2():
    return render_template('risk_indicator.html')

@app.route("/monitoring")
def hello3():
    return render_template('monitoring.html')

if __name__ == '__main__':
    app.run()