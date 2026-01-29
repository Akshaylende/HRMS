from app.init import flask_app, db

# Adding routes here to register 
import app.routes


if __name__ == "__main__":

    # with flask_app context initializing db 
    with flask_app.app_context():
        db.create_all()

    # debug = True for development purposes 
    flask_app.run(debug = True)

