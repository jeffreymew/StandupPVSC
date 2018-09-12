from index import db, bcrypt
from datetime import datetime, timedelta


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.filter_by(id=user_id).first()
        return user

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Task(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    date = db.Column(db.DateTime())
    task = db.Column(db.String(255))
    user_id = db.Column(db.Integer())
    
    def __init__(self, task, user_id):
        self.date = datetime.today()
        self.task = task
        self.user_id = user_id
    
    @staticmethod
    def get_latest_tasks():
        return Task.query.filter_by(date >= datetime.today())

    @staticmethod
    def get_tasks_for_user(user_id):
        return Task.query.filter_by(user_id=user_id)

    @property
    def serialize(self):
       """Return object data in easily serializeable format"""
       return {
           'date'       : self.date.strftime("%Y-%m-%d"),
           'task'       : self.task
       }
