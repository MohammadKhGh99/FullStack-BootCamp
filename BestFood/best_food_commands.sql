-- from Ghaidaa/*--check menu using innerjoinselect foods.name as 'food name', foods.description ,min(myprice) as 'price' -- min price--relationship between foods and prices according to foodIDfrom foods inner join prices on foods.ID = prices.foodID--the result ,relstionship with categories according to categoryIDinner join categories on categories.ID=foods.categoryID--check current time between startdate and enddatewhere getdate() between prices.startdate and prices.enddate--choice just the drinksand categories.name='drink'--to integrate name and descriptiongroup by foods.name , foods.description
*/





-- insert cola to soft drink
declare @category varchar(10) = 'salad', @food varchar(10) = 'tuna salad', 
@categoryID int, @description varchar(50) = 'healthy',
@price decimal = 35, @start datetime = getdate(), @end datetime = getdate() + 90,
@foodID int

-- check if there is a category for soft drink
-- if there is: we want to get the if of the category
-- otherewise, we need to add it and get the id


select @categoryID = (select ID from categories where name = @category)

-- if category id is null we infer that there i no category
if @categoryID is null
begin
	insert into categories values(@category, '', '')
	-- buidin variable which gets identity
	select @categoryID = @@identity 
end
if not exists(select ID from foods where name = @food)
begin -- enter cola zero and take id of cola zero
	insert into foods values (@categoryID, @food, @description, '')
	select @foodID = @@identity
end
else --if exist cola zero
begin -- take id of cola zero
	select @foodID = (select ID from foods where name = @food)
end
--enter price for cola zero
insert into prices values(@foodID, @start, @end, @price)

select * from prices
select * from foods
select * from categories

--check menu
select foods.name as 'food name', min(myprice) as 'price'
-- relationship between foods and prices according to food id
from foods inner join prices on foods.ID = prices.foodID
--the result, relationship with categories according to category id
inner join categories on categories.ID = foods.categoryID
--where (getdate() < prices.enddate) and (getdate() > prices.startdate)
-- check current time between startdate and enddate
where GETDATE() between prices.startdate and prices.enddate
--choose specific category
and categories.name = 'drink'
--
group by foods.name, foods.description

--to order
select * from customers
