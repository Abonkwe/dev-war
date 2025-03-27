from flask import Flask, request, jsonify
from flask_jwt_extended import get_jwt_identity, JWTManager, jwt_required, create_access_token, create_refresh_token
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from sqlalchemy.orm import DeclarativeBase
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import mapped_column, Mapped, relationship, DeclarativeBase
from sqlalchemy import Integer, Text, String, ForeignKey, Boolean, Float, DateTime
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Databse setup
class Base(DeclarativeBase):
    pass

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(model_class=Base)
db.init_app(app)
admin = Admin(app, name="Admin Panel", template_mode="bootstrap4")

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
    rating: Mapped[float] = mapped_column(Float, nullable=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=True)

    #relationship beteween user and job
    posted_job = relationship("Jobs", back_populates="poster", foreign_keys="[Jobs.poster_id]", lazy="dynamic")
    taken_job = relationship("Jobs", back_populates="worker", foreign_keys="[Jobs.worker_id]", lazy="dynamic")
    
    #relationship between review and user
    review = relationship("Review", back_populates="user", foreign_keys="[Review.user_id]")


    #relationship between user and transaction
    sent_transaction = relationship("Transaction", back_populates="sender", foreign_keys="[Transaction.sender_id]")
    received_transaction = relationship("Transaction", back_populates="receiver", foreign_keys="[Transaction.receiver_id]")

    #relationship between reporter and reported user
    reporter = relationship("Report", back_populates="reporter", foreign_keys="[Report.reporter_id]")
    reported_user = relationship("Report", back_populates="reported_user", foreign_keys="[Report.reported_id]")


    # Relationship between user and job
    applications = relationship("Application", back_populates="job", foreign_keys="[Application.job_id]", lazy="dynamic")

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
    poster_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), name="fk_job_poster")
    worker_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), name="fk_job_taken")

    poster = relationship("User", foreign_keys=[poster_id], back_populates="posted_job")
    worker = relationship("User", foreign_keys=[worker_id], back_populates="taken_job")

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
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False, name="fk_transaction_sender")
    receiver_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False, name="fk_transaction_receiver")

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_transaction")
    receiver = relationship("User", foreign_keys= [receiver_id], back_populates="received_transaction")

class Review(db.Model):

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    review: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationship between review and user
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), name="fk_review_user")
    user = relationship("User", back_populates="review", foreign_keys=[user_id])


class Report(db.Model):

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    
    #relationship between report and user
    reporter_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), name="fk_report_reporter")
    reported_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), name="fk_report_reported")

    reporter = relationship("User", foreign_keys=[reporter_id], back_populates="reporter")
    reported_user = relationship("User", foreign_keys=[reported_id], back_populates="reported_user")

class Application(db.Model):

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    application_date: Mapped[str] = mapped_column(String(80), nullable=False)
    is_accepted: Mapped[bool] = mapped_column(String(20), nullable=False, default=False)
    message: Mapped[str] = mapped_column(Text, nullable=True)

    # Relationship between application and User
    application_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    applicant = relationship("User", back_populates="job_applications")

    # Relationship between Job and application

    job = relationship("Jobs", back_populates="applications")
    applicant = relationship("User", back_populates="job_applications")
    
    def to_json(self):
        return {
            "id": self.id,
            "job_id": self.job_id,
            "applicant_id": self.applicant_id,
            "application_date": self.application_date,
            "status": self.status,
            "message": self.message
        }





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
    if all_jobs:
        return jsonify({"jobs": [jobs.to_json() for jobs in all_jobs] }), 200
    else:
        return jsonify({"data":[  {"field":"some data","field2": "somejob2"},{"field":"some data","field2": "somejob2"},{"field":"some data","field2": "somejob2"}]}),200


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
                    "jobs":[ job for job in user_profile.taken_job]
                    }) , 200

@app.route('/jobs/complete-employer/<int:job_id>', methods=["PATCH"])
@jwt_required()
def is_completed_employer(job_id):
    
    is_completed = request.json.get("is_completed_employer")
    job = db.get_or_404(User, job_id)

    # get_user
    current_user = get_jwt_identity()

    if job.poster_id != db.session.execute(db.select(User).where(User.name==current_user)).scalar().name:
        return jsonify({
            "message":"Only the job poster can mark this as complete"
        }), 403

    job.is_completed_employer = True
    job.date_completed = datetime.now().isoformat()
    
    if job.is_completed_employer and job.is_completed_employee:
        job.is_paid = True

    db.session.commit()

    return jsonify({
        "message": "Job marked as complete by employer"
    })

@app.route('/jobs/complete-employee/<int:job_id>', methods=["PATCH"])
@jwt_required()
def is_completed_employer(job_id):
    
    is_completed = request.json.get("is_completed_employer")
    job = db.get_or_404(User, job_id)

    # get_user
    current_user = get_jwt_identity()

    if job.worker_id != db.session.execute(db.select(User).where(User.name==current_user)).scalar().name:
        return jsonify({
            "message":"Only the job poster can mark this as complete"
        }), 403

    job.is_completed_employer = True
    job.date_completed = datetime.now().isoformat()
    
    if job.is_completed_employer and job.is_completed_employee:
        job.is_paid = True

    db.session.commit()

    return jsonify({
        "message": "Job marked as complete by employer"
    })

if __name__ == "__main__":

    with app.app_context():

        # job1 = Jobs(
        #     description = "Painter",
        #     date_posted = "January",
        #     date_completed
        # )
        db.create_all()

    app.run(debug=True)
