from flask import Flask,render_template
app = Flask(__name__)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/visualization")
def visualization():
    return render_template('visualization.html')

@app.route("/monitoring")
def monitoring():
    return render_template('monitoring.html')

@app.route("/risk")
def riskIndicator():
    return render_template('riskIndicator.html')

@app.route("/about")
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run()