create table passwords(
	id int primary key identity,
	employee_id int foreign key references employees(ID),
	password varchar(30),
	expiry_date date,
	validate bit
)

select * from passwords

declare @employee_id int, 
@id_number varchar(9) = '208653220', 
@password varchar(30) = '1234'

select @employee_id = (select id from employees where ID_num = @id_number)

if @employee_id is not null
begin
	insert into passwords values(@employee_id, @password, GETDATE(), 1)
end

-- ����� ����� �����
if @employee_id is null
select @answer