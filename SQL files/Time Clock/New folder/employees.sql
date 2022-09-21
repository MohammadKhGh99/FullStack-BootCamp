-- we want to create a table for employees
create table employees(
	ID int primary key identity, 
	ID_num varchar(9),
	first_name varchar(10),
	last_name varchar(10),
	email varchar(30),
	phone_number varchar(12)
)
drop table employees;
select * from employees;

-- enter new employee in table
if not exists(select * from employees where ID_num = '12345')
begin
insert into employees values('208653220', 'mohammad', 'ghanayem', 'mohammad.gh454@gmail', '0528942919');
end

declare @ID_number varchar(10) = '208005884', 
@first_name varchar(10) = 'Adam', @last_name varchar(10) = 'Sarsour',
@phone_number varchar(12) = '0549790238', 
@email varchar(30) = 'adam.sarsour@mail.huji.ac.il',
@answer varchar(100)

if not exists(select * from employees where ID_num = @ID_number)
begin
	insert into employees values(@ID_number, @first_name, @last_name, @email, @phone_number)
	select @answer = '' + @first_name + ' Successfully inserted'
end
else
begin 
	select @answer = '' + @first_name + ' Already existed in system'
end

select @answer


