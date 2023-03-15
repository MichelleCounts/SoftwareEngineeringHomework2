from dataclasses import dataclass
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Indecisive1!!@localhost:3306/hw2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

@dataclass
class Entry(db.Model):
    name: str
    id: int
    points: int


    name = db.Column(db.String(255))
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    points = db.Column(db.Integer)

    def __init__(self, name, id, points):
        self.name = name
        self.id = id
        self.points = points

class EntrySchema(ma.Schema):
    class Meta:
        fields = ('name', 'id', 'points')

entrySchema = EntrySchema()
entriesSchema = EntrySchema(many = True)

@app.route("/get", methods = ['GET'])
def getEntries():
    results = Entry.query.all()
    
    return jsonify(results)

@app.route("/create", methods = ['POST'])
def createEntry():
    name = request.json['name']
    id = request.json['id']
    points = request.json['points']

    entry = Entry(name, id, points)
    db.session.add(entry)
    db.session.commit()
    return entrySchema.jsonify(entry)

@app.route("/update/<id>", methods = ['PUT'])
def updateEntry(id):
    entry = Entry.query.get(id)

    name = request.json['name']
    points = request.json['points']

    entry.name = name
    entry.points = points

    db.session.commit()
    return entrySchema.jsonify(entry)

@app.route("/delete/<id>", methods = ['DELETE'])
def deleteEntry(id):
    entry = Entry.query.get(id)
    db.session.delete(entry)
    db.session.commit()
    return entrySchema.jsonify(entry)


if __name__ == '__main__':
    app.run(debug=True)