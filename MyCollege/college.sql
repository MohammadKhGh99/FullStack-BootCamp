create table Courses (
	ID int identity primary key,
	name varchar(120) not null,
	--subject_name int foreign key references Subjects(ID),
	--lecturers varchar(30),
	--lecturer_id int foreign key references Lecturers(ID),
	description varchar(100), --like description
	--exams_dates datetime,
	--prerequisites int foreign key references Courses(ID),
	start_date datetime,
	end_date datetime,
	days int,
	--credit_points int,
	hours datetime
)

create table Subjects(
	ID int primary key identity,
	course_id int foreign key references Courses(ID),
	name varchar(20),
	hours int
)

create table cycles_in_courses(
	ID int primary key identity,
	name varchar(20),
	course_id int foreign key references Courses(ID),
	price decimal,
	start_date date
)

create table meetings_in_cycles(
	ID int primary key identity,
	start_date date,
	end_date date,
	course_id int foreign key references Courses(ID),

)

create table users(
	ID int primary key identity,
	id_number varchar(12),
	first_name varchar(12),
	last_name varchar(12),
	phone_number varchar(12),
	password varchar(12),
	email varchar(100)
)

create table interested(
	ID int primary key identity,
	userID int foreign key references users(ID),
	courseID int foreign key references Courses(ID)
)

create table students(
	ID int primary key identity,
	userID int foreign key references users(ID),
	cycleID int foreign key references cycles_in_courses(ID)
)

create table lecturers(
	ID int primary key identity,
	userID int foreign key references users(ID),
	subjectID int foreign key references subjects(ID)
)

create table pays(
	ID int primary key identity,
	studentID int foreign key references students(ID),
	date datetime,
	sum decimal,
	recipt_number int
)

create table times(
	ID int primary key identity,
	-- userID int foreign key references users(ID),
	date date
)

--הכנסת 50 מפגשי קורס רק בימי שני
declare @i int = 0, @datestart date = getdate(), @sum int = 50 ,
@day int = 2

while @i < @sum
begin
	if(DATEPART(DW,@datestart) = @day)
	begin
		insert into times values(@datestart)
		select @i = @i + 1
	end
select @datestart = DATEADD(day, 1, @datestart)
end

select datepart(dw, date) as 'week day', date from times
drop table times


--הכנסת 50 מפגשי קורס רק בימי שני וחמישי
declare @i int = 0, @datestart date = getdate(), @sum int = 50 ,
@day varchar(7) = '2,5'

while @i < @sum
begin
	declare @week_day int = datepart(dw, @datestart)
	if(@day like '%' + convert(varchar, @week_day) + '%')
	begin
		insert into times values(@datestart)
		select @i = @i + 1
	end
	select @datestart = DATEADD(day, 1, @datestart)
end

select * from string_split(@day, ',')



select datepart(dw, getdate())
	