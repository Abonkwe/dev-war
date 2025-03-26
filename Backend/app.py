from flask import Flask, request, jsonify
from flask_jwt_extended import get_jwt_identity, JWTManager, jwt_required, create_access_token, create_refresh_token
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import mapped_column, Mapped, relationship, DeclarativeBase
from sqlalchemy import Integer, Text, String, ForeignKey, Boolean
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

# Databse setup
class Base(DeclarativeBase):
    pass

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(model_class=Base)
db.init_app(app)

migrate = Migrate(app=app, db=db)


# authentication setup 
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)




# Databse Models
class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=True)
    phone_number: Mapped[int] = mapped_column(Integer, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=True)

    #relationship beteween user and job
    posted_job = relationship("Job", back_populates="poster")
    taken_job = relationship("Job", back_populates="taken" )
    #relationship between review and user
    review = relationship("Review", back_populates="user")


    #relationship between user and transaction
    sent_transaction = relationship("Transaction", back_populates="sender")
    received_transaction = relationship("Transaction", back_populates="receiver")

    #relationship between reporter and reported user
    reporter = relationship("Report", back_populates="reporter")
    reported_user = relationship("Report", back_populates="reported_user")

class Jobs(db.Model):
    __tablename__ = "job"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    date_posted: Mapped[str] = mapped_column(String(80), nullable=False)
    date_completed: Mapped[str] = mapped_column(String(80), nullable=True)
    deadline: Mapped[str] = mapped_column(String(80), nullable=True)
    # is_completed: Mapped[bool] = mapped_column(Boolean, nullable=True)
    is_completed_employer: Mapped[bool] = mapped_column(Boolean, nullable=True, default=False)
    is_completed_employee: Mapped[bool] = mapped_column(Boolean, nullable=True, default=False)
    is_paid: Mapped[bool] = mapped_column(Boolean, nullable=True, default=False)
    
    #relationship between job and user
    poster_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    taken_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))

    poster = relationship("User", foreign_keys=[poster_id], back_populates="job")
    taken = relationship("User", foreign_keys=[poster_id], back_populates="taken_job")

    def to_json(self):

        all_jobs = {}

        for column in self.__table__.columns:
            all_jobs[column.name] = getattr(self, column.name)
    
        return all_jobs

class Transaction(db.Model):
    __tablename__ = "transaction"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    job: Mapped[str] = mapped_column(String(80), nullable=False)
    date_paid: Mapped[str] = mapped_column(String(80), nullable=False)
    amount: Mapped[int] = mapped_column(Integer, nullable=False)

    #relationship between transaction and user
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    receiver_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_transaction")
    receiver = relationship("User", foreign_keys= [receiver_id], back_populates="transaction")

class Review(db.Model):

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    review: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationship between review and user
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="review")


class Report(db.Model):

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    
    #relationship between report and user
    reporter_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    reported_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))

    reporter = relationship("User", foreign_keys=[reported_id], back_populates="reporter")
    reported_user = relationship("User", foreign_keys=[reported_id], back_populates="reported")





# All Routes

@app.route('/register', methods=["POST"])
def register():
    user_name = request.json.get("name")
    user_password = request.json.get("password")
    check_name = db.session.execute(db.select(User).where(User.name==user_name)).scalar()

    if check_name:
        return jsonify({"message": "User already exists"}), 400
   
    with app.app_context():
        new_user = User(
            name = user_name,
            password = generate_password_hash(
                        user_password,
                        method="pbkdf2:sha256", 
                        salt_length=8
                        ),
            email = request.json.get("email"),
            phone_number = request.json.get("phone_number")   
        )
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=user_name)
        return jsonify({"access_token": access_token}), 201

@app.route('/login', methods=["POST"])
def login():
    user_name = request.json.get("name")
    password = request.json.get("password")

    with app.app_context():
        check_user = db.session.execute(db.select(User).where(User.name==user_name)).scalar()

        if not check_user:
            return jsonify({"message": "User does not exit"}), 401

        if check_user and not check_password_hash(check_user.password, password):
            return jsonify({"message": "Incorrect password"}), 401
        
        if check_user and check_password_hash(check_user.password, password):
            access_token = create_access_token(identity=user_name)
            return jsonify(access_token=access_token), 200


@app.route('/get-all-jobs', methods=["GET"])
def get_all_jobs():

    all_jobs = db.session.execute(db.select(Jobs)).scalars().all()

    return jsonify({"jobs": [jobs.to_json() for jobs in all_jobs] }), 200


@app.route('/get-job/<int:job_id>', methods=["GET"])
def get_job(job_id):

    job = db.get_or_404(Jobs, job_id)

    return jsonify({"jobs": job.to_json()}), 200


@app.route('/create-job', methods=["POST"])
@jwt_required()
def create_job():

    with app.app_context():
        new_job = Jobs(
            description = request.json.get("description"),
            date_posted = request.json.get("date_posted"),
            date_completed = request.json.get("date_completed"),
            deadline = request.json.get("deadline", ""),
            is_completed = request.json.get("is_completed", "")
        )

        db.session.add(new_job)
        db.session.commit()

        return jsonify({"message": "Job successfully created"}), 200

@app.route('/get-profile/<int:user_id>')
def get_profile(user_id):

    user_profile = db.get_or_404(User, user_id)

    return jsonify({"profile":user_profile.json(),
                    "jobs":{
                        [ job for job in user_profile.taken_job]
                    }}) , 200



if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)
