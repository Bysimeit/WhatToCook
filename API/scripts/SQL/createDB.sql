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
    secondName varchar(20) not null,
    password varchar(100) not null,
    isAdmin boolean not null
);

DROP TABLE IF EXISTS Food CASCADE;
CREATE TABLE Food (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(20) UNIQUE not null,
    isValidated boolean,
    idAllergy integer references Allergy(id)
);

DROP TABLE IF EXISTS Recipe CASCADE;
CREATE TABLE Recipe (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    addDate date not null,
    quoting real,
    nameRecipe varchar(30) not null,
    time real not null,
    picture varchar(80),
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
INSERT INTO Customer(email, firstName, secondName, password, isAdmin)
VALUES('admin@gmail.com','Admin','Private','$2b$10$Ov.jqcwGxqGghlEAqJWHrO/EM/GXiC93rRlURiigwHYnZd1vZ.SnO',true), ('user1@gmail.com','user1','name1','$2b$10$1Hlc.OahudqUXb414C05wOSpBHU5ReP8DnWjuPowvlC13vnB314vu',false);
INSERT INTO Food(name, idAllergy, isValidated)
VALUES ('Pain', '1', true), ('Oeufs', '3', true), ('Saumon', '5', true), ('Soja', '6', true);
INSERT INTO Food(name, isValidated)
VALUES ('Tomate', true), ('Chocolat', true);
INSERT INTO Recipe(addDate, quoting, nameRecipe, time, type)
VALUES(CAST(now() AS date),'3','tarte','30','3'), (CAST(now() AS date),'2','sandwich','45','2'), (CAST(now() AS date),'2','mousseChoco','15','3'), (CAST(now() AS date),'5','chips','45','1'), (CAST(now() AS date),'4','biscuitsoja','25','1'), (CAST(now() AS date),'2','truc','15','3');
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
