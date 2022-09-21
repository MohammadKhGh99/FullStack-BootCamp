--טבלת קורסים
create table courses(ID int primary key identity,
name varchar(20), description varchar(100))

--טבלת נושאים
create table topics(ID int primary key identity,
name varchar(20),description varchar(30),  hours int)

--טבלת נושאים בקורס
create table topics_in_course(ID int primary key identity,
topicID int foreign key references topics (ID),
courseID int foreign key references courses (ID))

--טבלת מחזורים של הקורס
create table cycles_in_course(ID int primary key identity,
courseID int foreign key references courses (ID),
name varchar(20),start_date date, price decimal)

--טבלת מפגשים של מחזור הקורס
create table meetings_in_cycles(ID int primary key identity,
cycleID int foreign key references cycles_in_course (ID),
start_time datetime ,end_time time,hours int)

--טבלת משתמשים
create table users(ID int primary key identity,
id_number varchar(12), first_name varchar(12),
last_name varchar(12), phone_number varchar(12),
password varchar(12),email varchar(100))

--טבלת מתעניינים
create table interesteds(ID int primary key identity,
userID int  foreign key references users (ID),
courseID int  foreign key references courses (ID))

--טבלת סטודנטים
create table students(ID int primary key identity,
userID int  foreign key references users (ID),
cycleID int foreign key references cycles_in_course (ID))

--טבלת מרצים
create table lectures(ID int primary key identity,
userID int  foreign key references users (ID),
topicID int foreign key references topics (ID))

--טבלת תשלומים
create table pays(ID int primary key identity,
studentID int  foreign key references students (ID),
date datetime, sum decimal, receipt_number int)

--הכנסת קורס חדש 
insert into courses values('Full Stack','course is the best')

--הכנסת נושאים לקורס
declare @course_name varchar(20)='DBA',
@course_description varchar(30)='DBA is the best',
@topic varchar(20)='Transact SQL',
@topic_description varchar(50)='SQL is the best Data Base.',
@hours int = 30,
@course_id int , @topic_id int , @answer varchar(150)

--1. בדיקה האם הקורס קיים במערכת והוצאת הקוד שלו
select @course_id=(select ID from courses where name=@course_name)

-- אם לא נמצא הקוד
if @course_id is null
begin -- מכניס את הקורס לטבלת הקורסים
	insert into courses values(@course_name, @course_description)
	--הוצאת הקוד של הקורס לפי המספר שקיבל במסד נתונים
	select @course_id=@@IDENTITY
end

--2. בדיקה האם הנושא קיים במערכת והוצאת הקוד שלו
select @topic_id=(select ID from topics where name=@topic)

--אם לא נמצא הקוד
if @topic_id is null
begin--מכניס את הנושא לטבלת הנושאים
	insert into topics values(@topic,@topic_description,@hours)
	--הוצאת הקוד של הנושא לפי המספר שקיבל במסד נתונים
	select @topic_id=@@IDENTITY
end

--3. חיבור בין הקורס לנושא
--בדיקה האם הנושא לא קיים כבר בקורס
if not exists(
		select * from topics_in_course where topicID=@topic_id and courseID=@course_id)
		begin
			insert into topics_in_course values(@topic_id,@course_id)
			select @answer='הנושא '+@topic+' הוכנס בהצלחה לקורס '+@course_name+'.'
		end
		else
		begin
			select @answer='הנושא '+@topic+' כבר קיים בקורס '+@course_name+'.'
		end
select @answer


--מציאת הנושאים הקשורים לפי קורסים
select courses.name as 'שם הקורס', topics.name as 'שם הנושא'
from courses inner join topics_in_course
on courses.ID=topics_in_course.courseID
inner join topics
on topics.ID=topics_in_course.topicID

--הכנסת מרצה היודע נושא

declare @userID int , @topicID int,
@id_number varchar(12)='1234',
@first_name varchar(12)='Eyad', 
@last_name varchar(12)='Amer',
@phone_number varchar(12)='055444',
@password varchar(12)='1234', 
@email varchar(100)='mail@gmail.com',
@answer varchar(120),
@topic_name varchar(12)='React',
@hour int = 40

--1.בדיקה האם המרצה החדש נמצא בטבלה של היוזרים
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
--2. בדיקה האם הנושא קיים במערכת והוצאת הקוד שלו
select @topic_id=(select ID from topics where name=@topic_name)
--אם לא נמצא הקוד
if @topic_id is null
begin--מכניס את הנושא לטבלת הנושאים
	insert into topics values(@topic,@topic_description,@hours)
	--הוצאת הקוד של הנושא לפי המספר שקיבל במסד נתונים
	select @topic_id=@@IDENTITY
end
--3. בדיקה האם הנושא קיים כבר אצל המרצה
if exists(
	select * from lectures where userID = @userID and topicID = @topic_id

--3.1 אם נמצא, מודיעים שהנושא כבר נמצא אצל המרצה
	begin
		select @answer = @first_name + ' already teaches ' + @topic_name
	end
--3.2 אם לא נמצא, מכניסים את הנושא למרצה
	else
	begin
		insert into lectures values(@userID, @topic_id)
		select @answer = @first_name + ' teach now ' + @topic_name
	end
select @answer


-- inserting interested user

declare @userID int,
@id_number varchar(12)='1234',
@first_name varchar(12)='Eyad', 
@last_name varchar(12)='Amer',
@phone_number varchar(12)='055444',
@password varchar(12)='1234', 
@email varchar(100)='mail@gmail.com',
@answer varchar(120),
@course_id int,
@course_name varchar(20) = 'oop'

--1.בדיקה האם המרצה החדש נמצא בטבלה של היוזרים
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


-- 2.1 בדיקה על הקורס
select @course_id=(select ID from courses where name = @course_name)
if @course_id is null
begin 
	select @answer = 'the course is not in the system'
end
else
begin
	if not exists(select ID from interesteds where userID=@userID and courseID=@course_id)
		begin
			insert into interesteds values(@userID, @course_id)
		end
		select @answer = 'Thank you for your iunterest in course' + @course_name
end
select @answer

-- list of interested users in course
select users.first_name + ' ' + users.last_name as 'Full Name',
courses.name as 'Course Name', users.phone_number as 'Phone Number'
from courses inner join interesteds
on courses.ID=interesteds.courseID
inner join users 
on users.ID = interesteds.userID


















