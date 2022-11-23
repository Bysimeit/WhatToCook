-- Create tables

DROP TABLE IF EXISTS Allergy CASCADE;
CREATE TABLE Allergy (
    name varchar(30) primary key
);

DROP TABLE IF EXISTS Customer CASCADE;
CREATE TABLE Customer (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(50) not null,
    firstName varchar(20) not null,
    secondName varchar(20) not null,
    passWord varchar(30) not null
);

DROP TABLE IF EXISTS Food CASCADE;
CREATE TABLE Food (
    name varchar(20) primary key,
    allergy varchar(30) references Allergy(name)
);

DROP TABLE IF EXISTS Recipe CASCADE;
CREATE TABLE Recipe (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    addDate date not null,
    quoting real,
    name varchar(30) not null,
    time real not null,
    picture varchar(80)
);

DROP TABLE IF EXISTS Step CASCADE;
CREATE TABLE Step (
    text varchar(80) primary key
);

DROP TABLE IF EXISTS Customer_Food CASCADE;
CREATE TABLE Customer_Food (
    idCustomer integer references Customer(id),
    idFood varchar(20) references Food(name),
    date date,
    quantity integer not null,
    PRIMARY KEY (idCustomer,idFood,date)
);

DROP TABLE IF EXISTS Food_Quantity CASCADE;
CREATE TABLE Food_Quantity (
    quantity real,
    idRecipe integer references Recipe(id),
    idFood name references Food(name),
    PRIMARY KEY (idRecipe,idFood)
);

DROP TABLE IF EXISTS Customer_Recipe CASCADE;
CREATE TABLE Customer_Recipe (
    idCustomer integer references Customer(id),
    idRecipe integer references Recipe(id),
    PRIMARY KEY (idCustomer,idRecipe)
);

DROP TABLE IF EXISTS Customer_Allergy CASCADE;
CREATE TABLE Customer_Allergy (
    idCustomer integer references Customer(id),
    idAllergy varchar(30) references Allergy(name),
    PRIMARY KEY (idCustomer,idAllergy)
);

DROP TABLE IF EXISTS Recipe_Step CASCADE;
CREATE TABLE Recipe_Step (
    idRecipe integer references Recipe(id),
    idStep varchar(80) references Step(text),
    PRIMARY KEY (idRecipe, idStep)
);


-- Insert

INSERT INTO Allergy(name)
VALUES('Gluten'),('Crustacean'),('Eggs'),('Peanuts'),('Fish'),('Soy'),('Lactose'),('Nuts'),('Celery'),('Mustard'),('SesameSeed'),('Anhydride'),('Lupin'),('Mollusc');
INSERT INTO Customer(email, firstName, secondName, passWord)
VALUES('admin@gmail.com'),('Admin'),('Private'),('$2b$10$917oN39XueXqrhtoHI1wlei7TFw8BkPDaBab10.rJatviv4R9tJf2');

