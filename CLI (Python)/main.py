## By Adithya Pai B Canara Engineering College Mangalore!
# Test on and Working on Linux machine with Python 3.8.10 (default, Sep 28 2021, 16:10:42) 

import sqlite3
import sys
import os
os.system("")
from time import sleep
class style():
    BLACK = '\033[30m'
    RED = '\033[31m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    MAGENTA = '\033[35m'
    CYAN = '\033[36m'
    WHITE = '\033[37m'
    UNDERLINE = '\033[4m'
    RESET = '\033[0m'
    END      = '\33[0m'
    ORANGE ='\033[43m'
# Connect to the database
def connectDB():
    return sqlite3.connect("database.db")
db=connectDB()
cursor=connectDB().cursor()

## Function to insert Data Into Database
def dataInsert(db):
    movie_name=input("Enter Movie: ")
    actor=input("Enter Actor name: ")
    actress=input("Enter actress name: ")
    director=input("Enter director name: ")
    year=input("Enter year of release: ")
    cmd=("""INSERT INTO database (movie,actor,actress,director,year) VALUES (?,?,?,?,?);""")
    parms=(movie_name,actor,actress,director,year)
    cursor.execute(cmd,parms)
    db.commit()
    print( style.GREEN  + "\nData saved : ) " + style.END)


## Function to Remove data from Database
def removeData(db):
    cursor.execute("""DELETE FROM database;""").fetchall()
    db.commit()
    print(style.RED + "Data Deleted !" + style.END)


## Function to Find Movies By an Actor
def actor():
    act=str(input("Enter Actor Name : "))
    c=cursor.execute("""SELECT movie FROM database WHERE actor=(?);""",(act,)).fetchall()
    db.commit()
    for i in c:
        print(i,end='')
    if c==[]:
        print(style.RED + "No Actor Found : (" + style.END)   


## Function to Find Movies By an Actress
def actress():
    act=str(input("Enter Actress Name : "))
    c=cursor.execute("""SELECT movie FROM database WHERE actress=(?);""",(act,)).fetchall()
    db.commit()
    for i in c:
        print(i,end='')
    if c==[]:
         print(style.RED + "No Actress Found : (" + style.END)  



## Function to Find Movies By a Director
def director():
    director=str(input("Enter the director name : "))
    c=cursor.execute("""SELECT movie FROM database WHERE director=(?);""",(director,)).fetchall()
    db.commit()
    for i in c:
        print(i,end='')
    if c==[]:
         print(style.RED + "No Dicrectors Found : (" + style.END)  

## Function to Find Movies By a Year             
def year():
    year=str(input("Enter the release year : "))
    c=cursor.execute("""SELECT movie FROM database WHERE year=(?);""",(year,)).fetchall()
    db.commit()
    for i in c:
        print(i,end='')
    if c==[]:
         print(style.RED + "No Movies Found : (" + style.END)



## List the Database
def displayDB():
    Movie =  []  
    Actor = []
    Actress  = [] 
    Director = []
    Year = []
    data=cursor.execute("""SELECT * FROM database; """).fetchall()
    print(style.ORANGE + "Movie" + style.END + " | " + style.ORANGE + "Actor" + style.END + " | " + style.ORANGE + "Actress" + style.END + " | " + style.ORANGE + "Director" + style.END + " | " + style.ORANGE + "Year" + style.END)
    #print(data)
    for row in data:
        Movie.append(row[0])
        Actor.append(row[1])
        Actress.append(row[2])
        Director.append(row[3])
        Year.append(row[4])
    print("Movie = ", Movie)
    print("Actor = ", Actor)
    print("Actress  = ",Actress)
    print("Director  = ", Director)
    print("Year  = ", Year)


#Function to create Table
def createTable(db):
    t=cursor.execute("""SELECT * FROM sqlite_master WHERE type='table' and name="database" ; """).fetchall()
    if t==[]:
        cursor.execute("""CREATE TABLE IF NOT EXISTS database(movie VARCHAR(50),actor VARCHAR(20), actress VARCHAR(20), director VARCHAR(20),year INT);""")
        print(style.GREEN  + 'Table Created !' + style.END)
        db.commit()
    else:
        print(style.RED  +'Table Already Exist : (' +   style.END)

## Function to check Database connection
def testCon():
    if connectDB() is not None:
        print(style.GREEN + "Connected : )" + style.END)
        createTable(connectDB())
    else:
        print(style.RED + "Sed, No DB not connected : ("  + style.END)
def clrscr():
    os.system('cls' if os.name=='nt' else 'clear')


## Main Function
def main():
    while(1):
        clrscr()
        print(style.BLUE +" ******************************************************************" + style.END)
        print(style.RED  +"*                    Movie DB by Adithya                         *" + style.END)
        print(style.BLUE  +" ******************************************************************" + style.END)
        print(style.GREEN +" 1. Is the DataBase Connected ? createTable: Error   ")
        print(" 2. Insert data                                      ")
        print(" 3. Delete data                                      ")
        print(" 4. Show data                                        ")
        print(" 5. Movies by Actor                                  ")
        print(" 6. Movies by Actress                                ")
        print(" 7. Movies by Director                               ")
        print(" 8. Movies of year                                   ")
        print(" 9. Exit                                             "+ style.END)
        print(style.BLUE  +" ******************************************************************" + style.END)
        choice=input("\nEnter your choice ")
        print('*******************************************************************' )
        if choice=='1':
            clrscr()
            testCon()
            sleep(2)
        elif choice=='2':
            clrscr()
            dataInsert(connectDB())
            sleep(2)
        elif choice=='3':
            clrscr()
            removeData(connectDB())
            sleep(2)
        elif choice=='4':
            clrscr()
            displayDB()
            sleep(10)
        elif choice=='5':
            clrscr()
            actor()
            sleep(2)
        elif choice=='6':
            clrscr()
            actress()
            sleep(2)
        elif choice=='7':
            clrscr()
            director()
            sleep(2)
        elif choice=='8':
            clrscr()
            year()
            sleep(2)
        elif choice=='9':
            clrscr()
            print("GoodBye...")
            sleep(2)
            exit()
            break
        else:
            clrscr()
            print(style.RED  + "Invalid Choice !" + style.END)
            sleep(2)
main()
