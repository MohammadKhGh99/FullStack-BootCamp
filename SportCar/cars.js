// let nextId = 0;
let currentId = 0
class Car{ 
    constructor(name, color, year, license_number, price, image){
        this.#id = ++Car.nextId;
        this.name = name;
        this.color = color;
        this.year = year;
        this.license_number = license_number;
        this.price = price;
        this.image = image;
    }
    static nextId = 0;
    #id; //private
    name;
    color;
    year;
    license_number = 0;
    price;
    image;
    getId(){
        return this.#id;
    }
}

let cars = []; // array of cars.

//function that adds car to cars array.
function addCar(name, color, year, license_number, price, image){
    cars.push(new Car(name, color, year, license_number, price, image));

} 
// function that gets car information from user (html)
let createCar = function(){
    // link to the field of the page
    let name = $('#name');
    let color = $('#color');
    let year = $('#year');
    let license_number = $('#license_number');
    let price = $('#price');
    let image = $('#image');
    // adding new car according to the informations that we got from user.
    addCar(name.val(), color.val(), year.val(), license_number.val(), price.val(), image.val());
    // clear the page's fields
    name.val("");
    color.val("");
    year.val("");
    license_number.val("");
    price.val("");
    image.val("");
    showCar(cars.length - 1);
}

// function that deletes car from cars array.
function deleteCar(id){
    if(cars.length > 0)
        for (let i = 0; i < cars.length; i++) {
            if(cars[i].getId() == id){
                cars.splice(i, 1);
            }
            const element = array[i];
            
        }
}
//function that finds the location of car by the code
function findLocationById(id){
    if(cars.length > 0)
        for (let i = 0; i < cars.length; i++) {
            if(cars[i].getId() == id) 
                return i;
        }
    return -1;
}

//function that show the previous car in the array
function back(id){
    let location = findLocationById(id);
    if(location > 0)
        showCar(location - 1)
    else
        showCar(cars.length - 1)
}

//function that show the text car in the array
function next(id){
    let location = findLocationById(id);
    if(location < cars.length - 1 && location > 0)
        showCar(location + 1)
    else
        showCar(0)
}

let showCar = function(location){
    if(cars.length > 0)
    if(cars.length > location){
        $('#ExistCars').show();
        // let table = $('#table');
        let table = document.getElementById("table");
        if(table.rows.length > 1){
            // $('#table tr:last').remove();
            table.deleteRow(table.rows.length - 1);
        }
        // let tr = document.createElement('tr');
        let tr = table.insertRow();
        tr.insertCell().innerHTML = cars[location].name;
        tr.insertCell().innerHTML = cars[location].color;
        tr.insertCell().innerHTML = cars[location].year;
        tr.insertCell().innerHTML = cars[location].license_number;
        tr.insertCell().innerHTML = cars[location].price;
        let cell = tr.insertCell();
        let img = document.createElement('img');
        img.src = cars[location].image;
        cell.append(img);
        table.append(tr);
        currentId = cars[location].getId();
    }
    // TODO - I need to add next and prev buttons.
}