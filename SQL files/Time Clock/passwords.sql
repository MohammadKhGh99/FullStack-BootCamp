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

-- החלפת סיסמה קבועה-- 1. הצהרה על משתניםdeclare @employee_id int, 		@id_number varchar(9) = '208653220', 		@old_password varchar(30) = '1234',		@new_password varchar(30) = '5678',		@answer varchar(100)-- 2. בדיקה על מס זהות, אם הוא קייםselect @employee_id = (select id from employees where ID_num = @id_number)
if @employee_id is nullbegin	select @answer = 'username or passord is not correct'end-- 3. בדיקה על הסיסמה הישנה וגם לבדוק אם היא בתוקףelsebegin	if not exists (select * from passwords where employee_id = @employee_id and password = @old_password and validate = 1)	begin		select @answer = 'username or passord is not correct'	end	else	begin		-- 4. בדיקה על הסיסמה החדשה שלא הייתה בשימוש		if exists (select * from passwords where employee_id = @employee_id and password = @new_password)		begin			select @answer = 'you have used this new password in the past'		end		else		begin			-- 5. ביטול הסיסמה הישנה			update passwords set validate = 0 where employee_id = @employee_id			-- 6. הכנסת הסיסמה החדשה			insert into passwords values(@employee_id, @new_password, GETDATE() + 180, 1)			select @answer = 'the password has been changed successfully! expiry date is 180 days'		end	endend-- 7. תשובה למשתמש
select @answer