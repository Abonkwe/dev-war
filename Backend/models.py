from main import db
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import Integer, Text, String, ForeignKey, Boolean


class User(db.model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=True)
    phone_number: Mapped[int] = mapped_column(Integer, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=True)

    #relationship beteween user and job
    job = relationship("Jobs", back_populates="user")

    #relationship between review and user
    review = relationship("Review", back_populates="user")


    #relationship between user and transaction
    sent_transaction = relationship("Transaction", back_populates="sender")
    received_transaction = relationship("Transaction", back_populates="receiver")

    #relationship between reporter and reported user
    reporter = relationship("Report", back_populates="reporter")
    reported_user = relationship("Report", back_populates="reported_user")

class Jobs(db.model):
    __tablename__ = "job"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    date_posted: Mapped[str] = mapped_column(String(80), nullable=False)
    date_completed: Mapped[str] = mapped_column(String(80), nullable=True)
    deadline: Mapped[str] = mapped_column(String(80), nullable=True)
    is_completed: Mapped[bool] = mapped_column(Boolean, nullable=True)

    #relationship between job and user
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="job")

    def to_json(self):

        all_jobs = {}

        for column in self.__table__.columns:
            all_jobs[column.name] = getattr(self, column.name)
        
        return all_jobs

class Transaction(db.model):
    __tablename__ = "transaction"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    job: Mapped[str] = mapped_column(String(80), nullable=False)
    date_paid: Mapped[str] = mapped_column(String(80), nullable=False)
    amount: Mapped[int] = mapped_column(Integer, nullable=False)

    #relationship between transaction and user
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    receiver_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_transaction")
    receiver = relationship("User", foreign_keys= [receiver_id], back_populates="received_transaction")

class Review(db.model):

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
    reported_user = relationship("User", foreign_keys=[reported_id], back_populates="reported_user")