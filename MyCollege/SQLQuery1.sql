--הוספת מחזור לקורס
declare @course_ID int,
@cycle_ID int, 
@course_name varchar(20) = 'oop',
@cycle_name varchar(20) = 'winter',
@start_date date = '8/8/2023',
@price int = 300,
@course_description varchar(100) = 'python is fun',
@answer varchar(100),
@id_number int,
@first_name varchar(12)='Eyad', 
@last_name varchar(12)='Amer',
@phone_number varchar(12)='055444',
@password varchar(12)='1234', 
@email varchar(100)='mail@gmail.com',
@userID int,
@pay int = 3000,
@reciept_number int = 1054

--1. בדיקה האם הקורס קיים במערכת והוצאת הקוד שלו
select @course_id=(select ID
	from cycles_in_course 
	where courseID = (select ID 
					  from courses 
					  where name = @course_name)
	and name = @cycle_name)


-- אם לא נמצא הקוד
if @cycle_ID is null
begin -- מכניס את הקורס לטבלת הקורסים
	select @answer = @course_name + ' or ' + @cycle_name + ' is not exists'	--insert into courses values(@course_name, @course_description)
end
else
begin
	-- insert cycle
	if not exists (select * from cycles_in_course where name = @cycle_name and courseID = @course_ID)
		begin
			insert into cycles_in_course values(@course_ID, @course_name, @start_date, @price)
			select @answer = @cycle_name + ' added to the cycles of the course ' + @course_name
		end
	else
		begin
			select @answer='The cycle ' + @course_name + 'already exists.'
		end


	--רישום סטודנט למחזור של קורס

	--1. לבדוק ולהכניס לטבלת היוזרס
	select @userID=(select id from users where id_number=@id_number)
	--1.1. אם נמצא, עדכון פרטים
	if @userID is not null
		begin
			update users set first_name=@first_name, last_name=@last_name,
				phone_number=@phone_number, email=@email
				where ID=@userID
		end
	--1.2. אם לא נמצא, הכנסת יוזר חדש
	else
		begin
			insert into users values(@id_number,@first_name,@last_name,@phone_number,
				@password,@email)
			select @userID=@@IDENTITY
		end

	--2. check purchase
	if @pay is null
		select @pay = 0
	if @pay <= 0
		select @answer = 'You have to pay before registiring to course'
	else
	begin
		-- inserting purcahse
		insert into pays values(@userID, getdate(), @price, @reciept_number)
		--להכניס לטבלת הסטודנטים ולבחור מחזור
		if exists(select ID from students where userID = @userID and cycleID = @cycle_ID)
			begin
				select @answer = 'the student is already registered'
			end
		else
		begin
			insert into students values(@userID, @cycle_ID)

			--3. למחוק מטבלת המתענייניינים רק הקורס הנוכחי
			delete from interesteds where userID = @userID and courseID = (select ID from courses where name = @course_name)
			select @answer = 'Registered Successfully'
		end
	end
end
select @answer


-- check hou much remaining of paying
declare @payed decimal,
@balance decimal,
@id_number varchar(10) = '1234',
@userID int,
@answer varchar(100)

select @userID = (select ID from users where id_number = @id_number)
if @userID is null
	select @answer = 'id number not exists'
else
begin
	select @payed = (select sum(sum) from pays where studentID = @userID)
	select @balance = (select sum(price) from cycles_in_course inner join students on students.cycleID = cycles_in_course.ID
					   where userID = @userID)
	select @answer = 'you have paid ' + convert(varchar(10), @payed) + ' you have to pay ' + convert(varchar(10), (@balance - @payed))
end

select @answer

--insert purchase to pays table without registering to additional course
declare @payed decimal,
@balance decimal,
@pay decimal = 4000,
@reciept_number int = 3333,
@id_number varchar(10) = '1234',
@userID int,
@answer varchar(100)

--1. check exist user
select @userID = (select ID from users where id_number = @id_number)
if @userID is null
	select @answer = 'user not exist'
else
begin
	--2. check if there is a remainder to pay
	--2.1 total of what the student paid until now
	select @payed = (select sum(sum) from pays where studentID = @userID)
	-- if no pay inserting 0
	if @payed is null
		select @payed = 0
	--2.2 find all the pays that the student have to pay according to what he registered
		--according to user's code, find all the courses that the srudent has registered to them
		select @balance = (select sum(price) from cycles_in_course inner join
		students on students.cycleID = cycles_in_course.ID
		where userID = @userID)
		-- if there is no, insert 0
		if @balance is null 
			select @balance = 0
		if (@balance - @payed <= 0)
			select @answer = 'there is no remainder'
		else
		begin
		--3. insert purchase
			insert into pays values(@userID, getdate(), @pay, @reciept_number)

		--4. answer with the remainder
			select @answer = 'the purchase has successfully done. remainder ' + convert(varchar(20), (@balance - @payed - @pay))

		end

end
select @answer




select @@SERVICENAME



