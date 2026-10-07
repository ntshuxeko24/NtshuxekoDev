
from flask import Flask, render_template, request, redirect, session
import mysql.connector
import os

app = Flask(__name__)


# =================================
# SECRET KEY FOR LOGIN SESSIONS
# =================================

app.secret_key = os.getenv(
    "SECRET_KEY",
    "ntshuxekodev-local-secret-key"
)


# =================================
# ADMIN LOGIN DETAILS
# =================================

ADMIN_USERNAME = os.getenv(
    "ADMIN_USERNAME",
    "admin"
)

ADMIN_PASSWORD = os.getenv(
    "ADMIN_PASSWORD"
)


# =================================
# MYSQL DATABASE CONNECTION
# =================================

db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "127.0.0.1"),
    port=int(os.getenv("DB_PORT", "3307")),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME", "ntshuxekodev_db")
)


# =================================
# HOME
# =================================

@app.route("/")
def home():
    return render_template("index.html")


# =================================
# SERVICES
# =================================

@app.route("/services")
def services():
    return render_template("services.html")


# =================================
# ABOUT
# =================================

@app.route("/about")
def about():
    return render_template("about.html")


# =================================
# EDUCATION
# =================================

@app.route("/education")
def education():
    return render_template("education.html")


# =================================
# CONTACT
# =================================

@app.route("/contact")
def contact():
    return render_template("contact.html")


# =================================
# ADMIN LOGIN
# =================================

@app.route("/admin-login", methods=["GET", "POST"])
def admin_login():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:

            session["admin_logged_in"] = True

            return redirect("/admin")

        else:

            return """
                <script>
                    alert("Incorrect username or password.");
                    window.location.href = "/admin-login";
                </script>
            """

    return render_template("admin_login.html")


# =================================
# ADMIN DASHBOARD
# =================================

@app.route("/admin")
def admin():

    # Check if admin is logged in

    if not session.get("admin_logged_in"):

        return redirect("/admin-login")


    # Get customer enquiries

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT id, name, email, message, created_at
        FROM enquiries
        ORDER BY created_at DESC
    """

    cursor.execute(sql)

    enquiries = cursor.fetchall()

    cursor.close()

    return render_template(
        "admin.html",
        enquiries=enquiries
    )


# =================================
# DELETE ENQUIRY
# =================================

@app.route("/delete-enquiry/<int:enquiry_id>", methods=["POST"])
def delete_enquiry(enquiry_id):

    # Check if admin is logged in

    if not session.get("admin_logged_in"):

        return redirect("/admin-login")


    # Delete enquiry from MySQL

    cursor = db.cursor()

    sql = """
        DELETE FROM enquiries
        WHERE id = %s
    """

    cursor.execute(sql, (enquiry_id,))

    db.commit()

    cursor.close()

    return redirect("/admin")


# =================================
# ADMIN LOGOUT
# =================================

@app.route("/admin-logout")
def admin_logout():

    session.pop("admin_logged_in", None)

    return redirect("/admin-login")


# =================================
# CONTACT FORM
# =================================

@app.route("/submit-enquiry", methods=["POST"])
def submit_enquiry():

    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    cursor = db.cursor()

    sql = """
        INSERT INTO enquiries (name, email, message)
        VALUES (%s, %s, %s)
    """

    values = (name, email, message)

    cursor.execute(sql, values)

    db.commit()

    cursor.close()

    return """
        <script>
            alert("Your message has been sent successfully!");
            window.location.href = "/contact";
        </script>
    """


# =================================
# RUN APPLICATION
# =================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )

