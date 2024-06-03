from flask import Flask, jsonify,render_template
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/introduce')
def introduce():
    return render_template('introduce.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/statistics')
def statistics():
    return render_template('statistics.html')

@app.route('/statistics2')
def statistics2():
    return render_template('statistics2.html')

@app.route('/calculater')
def calculater():
    return render_template('calculater.html')

@app.route('/data')
def data():
    return render_template('data.html')

@app.route('/gangnam_districts')
def gangnam_districts():
    return render_template('gangnam_districts.html')

if __name__ == '__main__':
    app.run(debug=True)