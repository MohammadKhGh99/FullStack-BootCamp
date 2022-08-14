// let nextId = 0;
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
function createCar(){
    // link to the field of the page
    let name = $('name');
    let color = $('color');
    let year = $('year');
    let license_number = $('license_number');
    let price = $('price');
    let image = $('image');
    // adding new car according to the informations that we got from user.
    addCar(name.value, color.value, year.value, license_number.value, price.value, image.value);
    // clear the page's fields
    name.value = "";
    color.value = "";
    year.value = "";
    license_number.value = "";
    price.value = "";
    image.value = "";
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