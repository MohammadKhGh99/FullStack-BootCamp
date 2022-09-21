

create table employees(
	ID int primary key identity,
	id_number varchar(12),
	first_name varchar(20),
	last_name varchar(20),
	phone_number varchar(20),
	email varchar(30)
)

create table customers(
	ID int primary key identity,
	id_number varchar(12),
	first_name varchar(20),
	last_name varchar(20),
	phone_number varchar(20),
	email varchar(30)
)


--cashiers
create table cash_register(
	ID int primary key identity,
	empolyeeID int foreign key references employees(ID),
	open_time datetime,
	close_time datetime
)

create table coins(
	ID int primary key identity,
	name varchar(20),
	code varchar(10),
	country varchar(20)
	)

--create table coins_in_cashier(
--	ID int primary key identity,
--	cashierID int foreign key references cash_register(ID),
--	coinID int foreign key references coins(ID),
--	amount decimal
--	)
--drop table coins_in_cashier

--insert coins to cashier
create table enter_coins_in_cashier(
	ID int primary key identity,
	cashierID int foreign key references cash_register(ID),
	coinID int foreign key references coins(ID),
	quantity decimal,
	time datetime
)

select * from cash_register
select * from coins
select * from enter_coins_in_cashier
select * from employees

create table deal(
	ID int primary key identity,
	give_coins int foreign key references enter_coins_in_cashier(ID),
	get_coins int foreign key references enter_coins_in_cashier(ID),
	customerID int foreign key references customers(ID),
	recipt_number int
)


--insert employee
insert into employees values('1234', 'mohammad', 'ghanayem', '0528942919', 'mohammad@mail.com')

--open new cashier
declare @id_number_employee varchar(12) = '1234',
@employeeID int

select @employeeID = (select ID from employees where id_number = @id_number_employee)
if @employeeID is not null
begin
	insert into cash_register values(@employeeID, GETDATE(), null)
	select @@IDENTITY
end
insert into coins values('Shekel', 'ILS', 'Israel')
--insert coins
insert into enter_coins_in_cashier values(1, 2, -500)

--check the coins in cashier
select cash_register.open_time, coins.name, sum(enter_coins_in_cashier.quantity) 
from cash_register inner join enter_coins_in_cashier
on cash_register.ID = enter_coins_in_cashier.cashierID
inner join coins
on enter_coins_in_cashier.coinID = coins.ID
group by open_time, name


--insert deal
select * from deal
select * from enter_coins_in_cashier

declare @coin_get_code varchar(10) = 'ILS',
@coin_get_id int,
@coin_get_quantity decimal = 10000,
@coin_give_code varchar(10) = 'USD',
@coin_give_id int,
@coin_give_quantity decimal = -3200,
@cashID int = 1,
@amount decimal,
@answer varchar(100),
@customerID int,
@recipt_number int = 789,
@id_number varchar(20) = '5678'

--find code coin
select @coin_get_id = (select ID from coins where coins.code = @coin_get_code)

select @coin_give_id = (select ID from coins where coins.code = @coin_give_code)

--check for id
select @customerID = (select ID from customers where id_number = @id_number)
if @customerID is not null
begin

	--check if there is enough dollars in cashier
	select @amount = (select sum(quantity) 
					  from enter_coins_in_cashier 
					  where cashierID = @cashID and coinID = @coin_give_id
					  )

	if @amount < @coin_give_quantity
		select @answer = 'There is no money in cashier'
	else
	begin
		--2. insert two times money yo cahsier, one for plus and the other for minus
		declare @id_give int, @id_get int

		insert into enter_coins_in_cashier values(@cashID, @coin_get_id, @coin_get_quantity, getdate())
		-- take the code of the inserted coins
		select @coin_get_id = @@IDENTITY
	
		insert into enter_coins_in_cashier values(@cashID, @coin_give_id, @coin_give_quantity, getdate())
		-- take the code of the taken coins
		select @coin_get_id = @@IDENTITY

		insert into deal values(@coin_give_id, @coin_get_id, @customerID, @recipt_number)
		select @answer = 'Deal Done!'
	end

end

select @answer

insert into customers values('5678', 'Mohammad', 'Ghanayem', '457374', 'mohammad@gmail.com')

--show deal data
--customer name, employee name, cashier id, coin name, coin amount
--coin name to give, amount give coin, recipt number, date and time


select customers.first_name + ' ' + customers.last_name as 'Customer Name',
	   customers.id_number as 'ID Number',
	   employees.first_name + ' ' + employees.last_name as 'Employee Name', 
	   cash_register.ID as 'Cashier Number',
	   --deal date and time
	   (convert(varchar(10), enter_coins_in_cashier.time, 103) + ' ' + 
	   convert(varchar(10), enter_coins_in_cashier.time, 108))
	   as 'deal time',
	   (select coins.name from coins where ID = (select coinID from enter_coins_in_cashier where ID = deal.get_coins)) 
	   as 'get coin',
		--amount
	   (select enter_coins_in_cashier.quantity from enter_coins_in_cashier where ID = deal.get_coins) 
	   as 'get quantity',
	   (select coins.name from coins where ID = (select coinID from enter_coins_in_cashier where ID = deal.give_coins)) 
	   as 'coin taken',
	   (select enter_coins_in_cashier.quantity from enter_coins_in_cashier where ID = deal.give_coins) 
	   as 'taken quantity',
	   deal.recipt_number as 'Recipt Number'

from deal inner join customers on customers.ID = deal.customerID
--connection to enter data
inner join enter_coins_in_cashier on enter_coins_in_cashier.ID = deal.give_coins
--connection to cashier
inner join cash_register on enter_coins_in_cashier.cashierID = cash_register.ID
--connection between cashier to employee
inner join employees on cash_register.empolyeeID = employees.ID


declare @coin varchar(20),
@code varchar(10),
@country varchar(20)

select * from customers
select * from deal
select * from enter_coins_in_cashier
select * from cash_register
select * from employees