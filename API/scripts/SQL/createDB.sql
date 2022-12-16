-- Create tables

DROP TABLE IF EXISTS Allergy CASCADE;
CREATE TABLE Allergy (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(50) UNIQUE  not null
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
    weight integer not null,
    PRIMARY KEY (idCustomer,idFood,date)
);

DROP TABLE IF EXISTS Food_Quantity CASCADE;
CREATE TABLE Food_Quantity (
    quantity real,
    unit varchar(25),
    idRecipe integer references Recipe(id),
    idFood integer references Food(id),
    PRIMARY KEY (idRecipe,idFood)
);

DROP TABLE IF EXISTS Customer_Recipe CASCADE;
CREATE TABLE Customer_Recipe (
    idCustomer integer references Customer(id),
    idRecipe integer references Recipe(id),
    comment varchar,
    isFavorite boolean DEFAULT false,
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
VALUES('Gluten'),('Crustacés'),('Œufs'),('Arachides'),('Poisson'),('Soja'),('Lactose'),('Fruits à coques'),('Céleri'),('Moutarde'),('Graine de sésame'),('Anhydride sulfureux et sulfites'),('Lupin'),('Mollusques');
INSERT INTO Customer(email, firstName, name, password, isAdmin)
VALUES('admin@gmail.com','Admin','Private','$2b$10$Ov.jqcwGxqGghlEAqJWHrO/EM/GXiC93rRlURiigwHYnZd1vZ.SnO',true), ('user1@gmail.com','user1','name1','$2b$10$1Hlc.OahudqUXb414C05wOSpBHU5ReP8DnWjuPowvlC13vnB314vu',false);
INSERT INTO Food(name, idAllergy, isValidated, price)
VALUES 
    ('Pain', '1', true, 0.5), 
    ('Oeufs', '3', true, 0.2), 
    ('Saumon', '5', true, 5), 
    ('Soja', '6', true, 2),
    ('Beurre', '7', true, 3.5),
    ('Parmesan râpé', '7', true, 1.11),
    ('Feuille de lasagne', '1', true, 2),
    ('Gruyère râpé', '7', true, 1);

INSERT INTO Food(name, isValidated, price)
VALUES 
    ('Tomate', true, 0.95), 
    ('Chocolat', true, 1),
    ('Bœuf haché', true, 2),
    ('Gousse d''ail', true, 1.05),
    ('Sucre', true, 0.85),
    ('Poivre', true, 0.85),
    ('Oignon', true, 1),
    ('Huile d olive', true, 5),
    ('Herbes de provence', true, 1.5),
    ('Sel', true, 1);

INSERT INTO Recipe(addDate, quoting, nameRecipe, time, picture, type)
VALUES
    (CAST(now() AS date),'3','Tarte aux pommes','30', 'https://img-3.journaldesfemmes.fr/qLk0r2uOl6DX_eSpeGJHSh48p18=/800x600/smart/570815b9f5db46eda4d665288a544953/recipe-jdf/10020448.jpg', '3'), 
    (CAST(now() AS date),'4','Lasagne','80', 'https://images.pexels.com/photos/6046493/pexels-photo-6046493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '2'), 
    (CAST(now() AS date),'3','Mousse au chocolat','40', 'https://img.cuisineaz.com/660x660/2017/08/09/i131431-mousse-au-chocolat-au-cooking-chef.jpeg', '3'), 
    (CAST(now() AS date),'5','Salade grecque','15', 'https://assets.afcdn.com/recipe/20190704/94668_w1024h1024c1cx2736cy1824.jpg', '1'), 
    (CAST(now() AS date),'3','Cookie','20', 'https://www.papillesetpupilles.fr/wp-content/uploads/2005/07/Cookies-aux-pe%CC%81pites-de-chocolat-%C2%A9beats1.-shutterstock.jpg', '1'), 
    (CAST(now() AS date),'5','Tiramisu','20', 'https://assets.afcdn.com/recipe/20161123/1509_w1024h1024c1cx1920cy2880.jpg','3');
INSERT INTO Food_Quantity(quantity, unit, idRecipe, idFood)
VALUES
    ('2','','1','2'), 
    ('50','g','2','11'), 
    ('1','','2','9'), 
    ('1','','2','12'), 
    ('8','g','2','6'), 
    ('3','g','2','5'), 
    ('1','c. à soupe','2','13'), 
    ('1','pincée','2','14'), 
    ('1','paquet','2','7'), 
    ('1','','2','15'), 
    ('16','g','2','8'), 
    ('1','c. à soupe','2','16'), 
    ('1','c. à soupe','2','17'), 
    ('1','pincée','2','18'),
    ('100','','3','5'), 
    ('100','','4','5'), 
    ('100','','5','4'), 
    ('100','','6','2');
INSERT INTO Step(idRecipe, text)
VALUES
    ('1', 'frapper'), 
    ('1', 'casser'), 
    ('1', 'manger'),
    ('2', 'Pelez l''oignon et la gousse d''ail, émincez-les finement, puis faites-les revenir à feu doux dans une casserole avec 2 c. à soupe d''huile d''olive, jusqu''à ce que les oignons deviennent un peu translucides.'),
    ('2', 'Ajoutez ensuite la pulpe de tomate, le sucre et les herbes de Provence. Salez, poivrez, puis laissez réduire et mijoter à feu doux pendant 20 min. Pendant la cuisson de la sauce tomate, faites revenir le bœuf dans une poêle avec le reste d''huile d''olive pendant 3 à 5 min à feu moyen. Salez et poivrez, puis mélangez à la sauce tomate et attendez la fin de la cuisson.'),
    ('2', 'Pour préparer la sauce béchamel, faites d''abord fondre le beurre dans une casserole, puis ajoutez la farine hors du feu et mélangez le tout au fouet. Ajoutez le lait, fouettez énergiquement pour éviter la formation de grumeaux. Replacez sur feu doux et laissez épaissir quelques minutes, tout en mélangeant régulièrement. Salez, poivrez et parfumez avec la noix de muscade.'),
    ('2', 'Quand la garniture et la béchamel sont prêtes, préchauffez le four th.6 (180°C) le temps de monter votre lasagne maison. Graissez les parois d''un plat à gratin avec le beurre fondu, puis déposez dans le fond une couche de feuilles de pâte à lasagne et nappez-la de sauce béchamel.'),
    ('2', 'Ajoutez par-dessus une couche de garniture à la sauce tomate et au bœuf haché, puis parsemez de gruyère râpé. Répétez l''opération jusqu''à épuisement des ingrédients, en terminant par une couche de béchamel que vous n''oublierez pas de couvrir d''une belle couche de parmesan râpé.'),
    ('2', 'Enfournez votre lasagne maison pendant 45 min le temps de la laisser cuire et gratiner, puis laissez-la refroidir 5 à 10 min avant de la servir en belles portions rectangulaires.');
INSERT INTO Customer_Recipe(idCustomer, idRecipe, comment)
VALUES('1', '1', 'cool comme recette');
INSERT INTO Customer_Recipe(idCustomer, idRecipe, isFavorite)
VALUES('1', '2', true);
INSERT INTO Customer_Food(idCustomer, idFood, date, quantity, weight)
VALUES('1', '2', CAST(now() AS date), '100', '250'), ('1', '5', CAST(now() AS date), '100', '500');
INSERT INTO Customer_Allergy(idCustomer, idAllergy)
VALUES('1', '1'), ('1', '6'), ('2', '1');
