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
VALUES('Gluten'),('Crustacés'),('Œufs'),('Arachides'),('Poisson'),('Soja'),('Lactose'),('Fruits à coques'),('Céleri'),('Moutarde'),('Graine de sésame'),('Anhydride sulfureux et sulfites'),('Lupin'),('Mollusques'),('Cucurbitacées');
INSERT INTO Customer(email, firstName, name, password, isAdmin)
VALUES
    ('admin@gmail.com','Admin','Private','$2b$10$Ov.jqcwGxqGghlEAqJWHrO/EM/GXiC93rRlURiigwHYnZd1vZ.SnO',true),
    ('user1@gmail.com','user1','name1','$2b$10$5LaQYoTNQI5.mCqmDVlL5uKRAP8zEsgPAMuiPdy/4/0ugn3E51TVq',false),
    ('user2@gmail.com','user2','name2','$2b$10$5LaQYoTNQI5.mCqmDVlL5uKRAP8zEsgPAMuiPdy/4/0ugn3E51TVq',false),
    ('user3@gmail.com','user3','name3','$2b$10$5LaQYoTNQI5.mCqmDVlL5uKRAP8zEsgPAMuiPdy/4/0ugn3E51TVq',false),
    ('user4@gmail.com','user4','name4','$2b$10$5LaQYoTNQI5.mCqmDVlL5uKRAP8zEsgPAMuiPdy/4/0ugn3E51TVq',false),
    ('user5@gmail.com','user5','name5','$2b$10$5LaQYoTNQI5.mCqmDVlL5uKRAP8zEsgPAMuiPdy/4/0ugn3E51TVq',false),
    ('user6@gmail.com','user6','name6','$2b$10$5LaQYoTNQI5.mCqmDVlL5uKRAP8zEsgPAMuiPdy/4/0ugn3E51TVq',false);
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
    ('Huile d''olive', true, 5),
    ('Herbes de provence', true, 1.5),
    ('Sel', true, 1),
    ('Eau', true, 0);

INSERT INTO Recipe(addDate, quoting, nameRecipe, time, type)
VALUES
    (CAST(now() AS date),'3','Tarte aux pommes','30', '3'),
    (CAST(now() AS date),'4','Lasagne','80', '2'),
    (CAST(now() AS date),'3','Mousse au chocolat','20', '3'),
    (CAST(now() AS date),'5','Salade grecque','10', '1'),
    (CAST(now() AS date),'3','Cookie','35', '1'),
    (CAST(now() AS date),'5','Tiramisu','30','3'),
    (CAST(now() AS date),'4','Pâte brisée','15','3');

INSERT INTO Food(name, idAllergy, isValidated, price) VALUES ('Farine', '1', true, 3), ('Pâte brisée', '1', true, 1);
INSERT INTO Food(name, isValidated, price) VALUES ('Pomme', true, 1.15), ('Compote de pommes', true, 2), ('Sucre roux', true, 1.5);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Mascarpone', true, 2, 7);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Café', true, 0.5, null);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Cacao en poudre', true, 1, null);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Boudoirs', true, 0.25, 1);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Concombre', true, 1.25, 15);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Olives', true, 2, null);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Fromage féta', true, 2, 7);
INSERT INTO Food(name, isvalidated, price, idallergy) VALUES ('Origan séché', true, 1.35, null);
INSERT INTO Food (name, isvalidated, price, idallergy) VALUES ('Sucre en poudre', true, 0.85, null);
INSERT INTO Food (name, isvalidated, price, idallergy) VALUES ('Cassonade', true, 1.35, null);
INSERT INTO Food (name, isvalidated, price, idallergy) VALUES ('Vanille liquide', true, 2, null);
INSERT INTO Food (name, isvalidated, price, idallergy) VALUES ('Levure chimique', true, 0.75, null);
INSERT INTO Food (name, isvalidated, price, idallergy) VALUES ('Pépites de chocolat', true, 1.95, null);
INSERT INTO Food_Quantity(quantity, unit, idRecipe, idFood)
VALUES
    ('34','g','3','10'),
    ('5','g','3','13'),
    ('1','pincée','3','18'),
    ('5','g','3','5'),
    ('1','','3','2'),
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
    ('100','','4','5'),
    ('300', 'g', '7', '20'),
    ('150', 'g', '7', '5'),
    ('1', 'c. à soupe', '7', '18'),
    ('3', 'c. à soupe', '7', '13'),
    ('8', 'cl', '7', '19'),
    ('1', '', '1', '21'),
    ('50', 'g', '1', '23'),
    ('1', 'c. à soupe', '1', '24'),
    ('1', '', '1', '22'),
    ('1', 'g', '1', '5');
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, null, 6, 2);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (42, 'g', 6, 25);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (42, 'ml', 6, 26);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, 'c. à soupe', 6, 27);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (3, null, 6, 28);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (17, 'g', 6, 13);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, null, 4, 9);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, null, 4, 29);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, null, 4, 15);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (5, null, 4, 30);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (30, 'g', 4, 31);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (2, 'c. à soupe', 4, 16);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, 'c. à soupe', 4, 32);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, 'c. à soupe', 4, 33);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, null, 5, 2);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (40, 'g', 5, 33);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (65, 'g', 5, 34);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, 'pincée', 5, 18);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (1, 'c. à soupe', 5, 35);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (65, 'g', 5, 5);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (147, 'g', 5, 20);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (5, 'g', 5, 36);
INSERT INTO Food_Quantity (quantity, unit, idrecipe, idfood) VALUES (80, 'g', 5, 37);
INSERT INTO Step(idRecipe, text)
VALUES
    ('2', 'Pelez l''oignon et la gousse d''ail, émincez-les finement, puis faites-les revenir à feu doux dans une casserole avec 2 c. à soupe d''huile d''olive, jusqu''à ce que les oignons deviennent un peu translucides.'),
    ('2', 'Ajoutez ensuite la pulpe de tomate, le sucre et les herbes de Provence. Salez, poivrez, puis laissez réduire et mijoter à feu doux pendant 20 min. Pendant la cuisson de la sauce tomate, faites revenir le bœuf dans une poêle avec le reste d''huile d''olive pendant 3 à 5 min à feu moyen. Salez et poivrez, puis mélangez à la sauce tomate et attendez la fin de la cuisson.'),
    ('2', 'Pour préparer la sauce béchamel, faites d''abord fondre le beurre dans une casserole, puis ajoutez la farine hors du feu et mélangez le tout au fouet. Ajoutez le lait, fouettez énergiquement pour éviter la formation de grumeaux. Replacez sur feu doux et laissez épaissir quelques minutes, tout en mélangeant régulièrement. Salez, poivrez et parfumez avec la noix de muscade.'),
    ('2', 'Quand la garniture et la béchamel sont prêtes, préchauffez le four th.6 (180°C) le temps de monter votre lasagne maison. Graissez les parois d''un plat à gratin avec le beurre fondu, puis déposez dans le fond une couche de feuilles de pâte à lasagne et nappez-la de sauce béchamel.'),
    ('2', 'Ajoutez par-dessus une couche de garniture à la sauce tomate et au bœuf haché, puis parsemez de gruyère râpé. Répétez l''opération jusqu''à épuisement des ingrédients, en terminant par une couche de béchamel que vous n''oublierez pas de couvrir d''une belle couche de parmesan râpé.'),
    ('2', 'Enfournez votre lasagne maison pendant 45 min le temps de la laisser cuire et gratiner, puis laissez-la refroidir 5 à 10 min avant de la servir en belles portions rectangulaires.'),
    ('7', 'Mélanger la farine et le sel dans un plat (et le sucre si sucre il y a).'),
    ('7', 'Ajouter le beurre puis l''incorporer à la farine en pétrissant rapidement et légèrement du bout des doigts. On doit obtenir une sorte de semoule grossière en 2 ou 3 min.'),
    ('7', 'Incorporer rapidement le lait ou l''eau. Il en faut très peu pour permettre à la pâte de se lier et de faire boule. Le lait ou l''eau ? C''est selon les goûts.'),
    ('7', 'Pour étaler sans problème, étaler la pâte sur du papier cuisson et cuire tel quel dans la platine.'),
    ('1', 'Préchauffez le four à 200°C. Disposez la pâte brisée dans un moule à tarte et piquez le fond avec une fourchette. Placez le moule au réfrigérateur, le temps de préparer les pommes.'),
    ('1', 'Epluchez les pommes et coupez-les en tranches d''environ 3 mm d''épaisseur.'),
    ('1', 'Disposez une couche de compote de pommes sur le fond de tarte.'),
    ('1', 'Disposez les pommes en rosace sur le fond de tarte. Veillez à les disposer joliment.'),
    ('1', 'Ajoutez quelques noix de beurre sur les pommes.'),
    ('1', 'Saupoudrez les pommes de 2 cuillères à soupe de sucre roux.'),
    ('1', 'Enfournez pendant 30 minutes. Dégustez tiède ou froid en l''accompagnant d''une boule de glace vanille pour les plus gourmands.'),
    ('3', 'Faire fondre le chocolat et le beurre au bain marie. Laisser tiédir.'),
    ('3', 'Séparer les jaunes des blancs. Monter les blancs en neige avec un pincée de sel. Puis à la dernière minute ajouter le sucre et fouetter.'),
    ('3', 'Verser les jaunes dans le chocolat en remuant énergiquement.'),
    ('3', 'Incorporer délicatement le blanc en neige au chocolat. Mélanger doucement avec une spatule en évitant de casser le blanc en neige.'),
    ('3', 'Verser votre chocolat mousseux dans des petits pots. Réserver au frais pendant 3 heures minimum.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Préparer 250ml de café, ajouter une cuillère à café de sucre, mélanger et laisser refroidir.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Séparer les blancs des jaunes d''oeufs. Battre énergiquement les jaunes d''oeufs avec le sucre.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Ajouter le mascarpone et mélanger doucement.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Dans un autre récipient, monter les blancs en neige.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Ajouter les blancs montés en neige au mélange précédent (jaunes d''oeufs + sucre + mascarpone). Mélanger doucement à l''aide d''une spatule.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Tremper les boudoirs dans le café et les déposer au fond du moule.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Par dessus les boudoirs, étaler la crème avec l''aide d''une spatule. Saupoudrer de cacao en poudre et râper du chocolat noir par dessus (optionnel).');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Disposer de nouveau les boudoirs imbibés de café. Étaler le reste de la crème mascarpone sur le dessus. Bien lisser à l''aide d''une spatule et filmer. Laisser reposer au réfrigérateur toute une nuit.');
INSERT INTO Step (idrecipe, text) VALUES (6, 'Le jour suivant, le Tiramisu sera parfaitement prêt à être dégusté ! Saupoudrer du cacao en poudre et râper du chocolat noir par dessus, c''est prêt !');
INSERT INTO Step (idrecipe, text) VALUES (4, 'Hacher l''oignon grossièrement. Macérer une vingtaine de minutes dans un petit bol rempli d''eau avec quelques gouttes de vinaigre.');
INSERT INTO Step (idrecipe, text) VALUES (4, 'Couper les tomates en dés, les épépiner et les placer dans un saladier.');
INSERT INTO Step (idrecipe, text) VALUES (4, 'Préparer les concombres: Saupoudrer de sel et laisser dégorger environ 20 min. Trancher les concombres en demi rondelles et les ajouter dans le saladier avec l''oignon, les olives et le fromage féta coupé en dés.');
INSERT INTO Step (idrecipe, text) VALUES (4, 'Dans un petit bol, battre l''huile, le vinaigre, sel et poivre à l''aide d''une fourchette, jusqu''à ce que la vinaigrette soit émulsionnée. Vérifier l''assaisonnement. Verser sur la salade, saupoudrer d''origan et servir.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Préparer tous les ingrédients.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Dans un cul de poule, blanchir le beurre ramolli avec le sucre et la cassonade.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Ajouter l''œuf, la vanille liquide (ou le sucre vanillé) et le sel. Mélanger.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Ajouter les pépites et la levure chimique.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Ajouter la farine...');
INSERT INTO Step (idrecipe, text) VALUES (5, '...et bien mélanger à la spatule jusqu''à l''obtention d''une pâte homogène.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Disposer cette pâte sur une feuille de papier sulfurisé. Lui donner la forme d''un boudin.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Envelopper le boudin de papier sulfurisé et le serrer avec une spatule afin d''obtenir un boudin bien régulier. Laisser poser au frais 2 heures.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Retirer le papier sulfurisé.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'À l''aide d''un couteau, détailler ce boudin de pâte en rondelles d''1/2 cm d''épaisseur.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Disposer ces rondelles sur une plaque à pâtisserie graissée. Prendre soin de les disposer en quinconce afin qu''ils ne se collent pas.');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Enfourner à four chaud (180/200°C).');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Laisser cuire jusqu''à coloration désirée. Plus les cookies seront colorés, plus ils seront secs. "Si vous les aimez un peu moelleux avec le cœur pâteux, je vous conseille de les sortir du four lorsque le milieu du cookie est encore clair."');
INSERT INTO Step (idrecipe, text) VALUES (5, 'Au terme de la cuisson, les laisser poser deux minutes avant de les décoller de la plaque à l''aide d''une spatule plate. Laisser refroidir.');
INSERT INTO Customer_Recipe(idCustomer, idRecipe, comment, isFavorite)
VALUES
    ('1', '1', 'cool comme recette', true),
    ('2', '1', 'sympa', true),
    ('1', '2', 'J''ai faim', true),
    ('1', '3', 'Hm c''est bon', true),
    ('1', '5', 'Ouh loulou', true);
INSERT INTO Customer_Food(idCustomer, idFood, date, quantity, weight)
VALUES('1', '2', CAST(now() AS date), '100', '250'), ('1', '5', CAST(now() AS date), '100', '500');
INSERT INTO Customer_Allergy(idCustomer, idAllergy)
VALUES('1', '1'), ('1', '6'), ('2', '1');
