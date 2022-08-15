create table times(
	id int primary key identity,
	employee_id int foreign key references employees(ID),
	enter_time datetime,
	exit_time datetime
)

select * from times

-- enter entrance time or exit time
--1. declaration of variables
declare @employee_id int, 
		@id_number varchar(9) = '208653220',
		@password varchar(30) = '5678',
		@enter_time datetime,
		@exit_time datetime,
		@answer varchar(100)
		
--select @enter_time = getdate() + time(0)
--select @enter_time
--2. search worker code
select @employee_id = (select id from employees where ID_num = @id_number)
if @employee_id is nullbegin	select @answer = 'username or passord is not correct'end
--3. check if the password is correct and not expired
else
begin
	if not exists(select * from passwords where employee_id = @employee_id and password = @password and validate = 1)
	begin
		select @answer = 'username or passord is not correct'
	end
	else
	--3.1 check the date of the password
	if not exists(select * from passwords where employee_id = @employee_id and password = @password and validate = 1  and GETDATE() < expiry_date)
	begin
		select @answer = 'username or passord is not correct'
	end
	else
	begin
		--4. check if the employee came to work or went home
		if exists(select * from times where employee_id = @employee_id and enter_time is not null and exit_time is null)
		begin
			update times set exit_time = GETDATE() where employee_id = @employee_id and enter_time is not null and exit_time is null
			select @answer = 'Exit Time ' + convert(varchar, GETDATE(), 103)
		end
		else
		if not exists(select * from times where employee_id = @employee_id and exit_time is null)
		begin
			insert into times values(@employee_id, GETDATE(), null)
			--update times set enter_time(GETDATE()) where employee_id = @employee_id and enter_time is null
			select @answer = 'Enter Time ' + convert(varchar, GETDATE(), 103)
		end
	end
end
--5. answer with the enter time or the exit time
select @answer
--select convert(varchar, GETDATE(), 103)

--1. get id and full name from employees table
select employee_id as 'ID number', first_name + ' ' + last_name as 'Full Name', 
--2. gets enter time and exit time from times table
enter_time as 'Enter time', exit_time as 'Exit Time', convert(varchar(20), exit_time - enter_time, 108) as 'SUM'
--3. connect betwenn times table and employees table
from employees inner join times
--4. the connection holds according to the code of the employee
on employees.ID = times.employee_id
--5. sort by the last name
order by last_name

--finds the sum of the working time
select sum(datediff(SECOND, exit_time, enter_time)) as 'Working Hours' from times
group by employee_id