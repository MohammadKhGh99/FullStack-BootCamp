
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





/*create table Lecturers (
	ID int primary key,
	name varchar(120) not null,
	courses_ids int foreign key references Courses(ID)
)

-- Students & Lecturers - isA relation
create table CollegePerson(
	ID int identity primary key,
	name varchar(120) not null,
	email varchar(100),
	phone_number varchar(12),
	participated_course int foreign key references Courses(ID)
)

create table Students(
	student_id int references CollegePerson(ID),
	paied bit,
	grade float,
	interested_course int foreign key references Courses(ID),
	check grade <= 100 and grade >= 0,
	primary key(student_id)
)

create table Lecturers(
	lecturer_id int references CollegePerson(ID),
	reception_room varchar(20),
	reception_times[] datetime,
	honors varchar(50),
	rating float,
	roles varchar(50),
	check rating <= 10 and rating >= 0,
	primary key(lecturer_id)
)*/



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

select * from times