-- טבלת קטגוריות 
create table categories(ID int primary  key identity , name varchar(10) , description varchar(50),
							image text )

-- טבלת מאכלים 
create table foods(ID int primary  key identity ,categoryID int foreign key references categories(ID),
						name varchar(10) , description varchar(50),image text ) 

--טבלת מחירים 
create table prices(ID int primary key identity , foodID int foreign key references foods(ID),
					startdate datetime ,enddate  datetime , myprice decimal(5,2))

-- טבלת לקוחות 
create table customers(ID int primary key identity, name varchar(10), phone_number varchar(12), 
						email varchar(20), password varchar(12))

-- טבלת הזמנות 
create table orders(ID int primary key identity, customerID int foreign key references customers(ID),
					address varchar(30), pay_comfirm varchar(20), order_time datetime, kitchen_time datetime,
					delivery_time datetime)

--טבלת מאכלים בהזמנה 
create table foods_in_order(ID int primary key identity, price_id int foreign key references prices(ID),
						order_id int foreign key references orders(ID), quantity int )
