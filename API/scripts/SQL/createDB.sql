-- Create tables

DROP TABLE IF EXISTS Allergy CASCADE;
CREATE TABLE Allergy (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) UNIQUE  not null
);

DROP TABLE IF EXISTS Customer CASCADE;
CREATE TABLE Customer (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(50) UNIQUE not null,
    firstName varchar(20) not null,
    name varchar(20) not null,
    password varchar(100) not null,
    isAdmin boolean not null
);

DROP TABLE IF EXISTS Food CASCADE;
CREATE TABLE Food (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(20) UNIQUE not null,
    isValidated boolean,
    price float,
    idAllergy integer references Allergy(id)
);

DROP TABLE IF EXISTS Recipe CASCADE;
CREATE TABLE Recipe (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    addDate date not null,
    quoting real,
    nameRecipe varchar(30) not null,
    time real not null,
    picture varchar(200),
    type integer not null
);

DROP TABLE IF EXISTS Step CASCADE;
CREATE TABLE Step (
    idStep integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    idRecipe integer references Recipe(id),
    text varchar
);

DROP TABLE IF EXISTS Customer_Food CASCADE;
CREATE TABLE Customer_Food (
    idCustomer integer references Customer(id),
    idFood integer references Food(id),
    date date,
    quantity integer not null,
    PRIMARY KEY (idCustomer,idFood,date)
);

DROP TABLE IF EXISTS Food_Quantity CASCADE;
CREATE TABLE Food_Quantity (
    quantity real,
    idRecipe integer references Recipe(id),
    idFood integer references Food(id),
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
    idAllergy integer references Allergy(id),
    PRIMARY KEY (idCustomer,idAllergy)
);

DROP TABLE IF EXISTS Recipe_Step CASCADE;
/*CREATE TABLE Recipe_Step (
    idRecipe integer references Recipe(id),
    idStep varchar(80) references Step(text),
    PRIMARY KEY (idRecipe, idStep)
);*/


-- Insert

INSERT INTO Allergy(name)
VALUES('Gluten'),('Crustacean'),('Eggs'),('Peanuts'),('Fish'),('Soy'),('Lactose'),('Nuts'),('Celery'),('Mustard'),('SesameSeed'),('Anhydride'),('Lupin'),('Mollusc');
INSERT INTO Customer(email, firstName, name, password, isAdmin)
VALUES('admin@gmail.com','Admin','Private','$2b$10$Ov.jqcwGxqGghlEAqJWHrO/EM/GXiC93rRlURiigwHYnZd1vZ.SnO',true), ('user1@gmail.com','user1','name1','$2b$10$1Hlc.OahudqUXb414C05wOSpBHU5ReP8DnWjuPowvlC13vnB314vu',false);
INSERT INTO Food(name, idAllergy, isValidated, price)
VALUES ('Pain', '1', true, 0.5), ('Oeufs', '3', true, 0.2), ('Saumon', '5', true, 5), ('Soja', '6', true, 2);
INSERT INTO Food(name, isValidated, price)
VALUES ('Tomate', true, 0.9), ('Chocolat', true, 1);
INSERT INTO Recipe(addDate, quoting, nameRecipe, time, picture, type)
VALUES(CAST(now() AS date),'3','Tarte aux pommes','30', 'https://img-3.journaldesfemmes.fr/qLk0r2uOl6DX_eSpeGJHSh48p18=/800x600/smart/570815b9f5db46eda4d665288a544953/recipe-jdf/10020448.jpg', '3'), (CAST(now() AS date),'4','Lasagne','35', 'https://images.radio-canada.ca/v1/alimentation/recette/4x3/lasagne-25129.jpg', '2'), (CAST(now() AS date),'3','Mousse au chocolat','40', 'https://img.cuisineaz.com/660x660/2017/08/09/i131431-mousse-au-chocolat-au-cooking-chef.jpeg', '3'), (CAST(now() AS date),'5','Salade grecque','15', 'https://assets.afcdn.com/recipe/20190704/94668_w1024h1024c1cx2736cy1824.jpg', '1'), (CAST(now() AS date),'3','Cookie','20', 'https://www.papillesetpupilles.fr/wp-content/uploads/2005/07/Cookies-aux-pe%CC%81pites-de-chocolat-%C2%A9beats1.-shutterstock.jpg', '1'), (CAST(now() AS date),'5','Tiramisu','20', 'https://assets.afcdn.com/recipe/20161123/1509_w1024h1024c1cx1920cy2880.jpg','3');
INSERT INTO Food_Quantity(quantity, idRecipe, idFood)
VALUES('2','1','2'), ('200','2','3'), ('100','3','5'), ('100','4','5'), ('100','5','4'), ('100','6','2');
INSERT INTO Step(idRecipe, text)
VALUES('1', 'frapper'), ('1', 'casser'), ('1', 'manger');
INSERT INTO Customer_Recipe(idCustomer, idRecipe)
VALUES('1', '1'), ('1', '2');
INSERT INTO Customer_Food(idCustomer, idFood, date, quantity)
VALUES('1', '2', CAST(now() AS date), '100'), ('1', '5', CAST(now() AS date), '100');
INSERT INTO Customer_Allergy(idCustomer, idAllergy)
VALUES('1', '1'), ('1', '6'), ('2', '1');
