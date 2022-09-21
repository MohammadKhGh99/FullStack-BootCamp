var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cars = [];
var races = [];
function addCar(name, color, model, license_number, price, img) {
    cars.push(new Car(name, model, price, color, license_number, img));
}
function addRaceToCar(carID, raceID, rank) {
    var race = races.find(function (r) { return r.getRaceID() == raceID; });
    var car = cars.find(function (c) { return c.getID() == carID; });
    if (car != null && race != null) {
        if (!(car instanceof SportCar))
            car.changeCarToSportCar();
        CarInRace.addCarInRace(car, race, rank);
    }
}
var addRaceToCarFromPage = function () {
    var carID = $('#carID');
    var raceID = $('#raceID');
    var rank = $('#rank');
    addRaceToCar((Number)(carID.val()), (Number)(raceID.val()), (Number)(rank.val()));
};
var createCar = function () {
    //קישור לשדות של הדף
    var name = $('#name');
    var color = $('#color');
    var year = $('#year');
    var licenseNum = $('#licenseNum');
    var price = $('#price');
    var photo = $('#photo');
    //הכנסת רכב חדש לפי הפרטים שהתקבלו מהמשתמש
    addCar(name.val(), color.val(), year.val(), licenseNum.val(), price.val(), photo.val());
    //ניקוי השדות בדף
    name.val("");
    color.val("");
    year.val("");
    licenseNum.val("");
    price.val("");
    photo.val("");
    // showCar(cars.length-1);
};
var Car = /** @class */ (function () {
    function Car(name, model, price, color, license_number, img) {
        this.ID = ++Car.nextID;
        this.name = name;
        this.model = model;
        this.price = price;
        this.color = color;
        this.license_number = license_number;
        this.img = img;
    }
    Car.prototype.changeCarToSportCar = function () {
        var sportCar = new SportCar(this.name, this.model, this.price, this.color, this.license_number, this.img);
        sportCar.ID = this.ID;
        Car.nextID--;
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].ID == this.ID) {
                cars[i] = sportCar;
                break;
            }
        }
    };
    Car.prototype.getID = function () {
        return this.ID;
    };
    /* public setID(ID:number){
         this.ID = ID;
     }*/
    Car.prototype.getModel = function () {
        return this.model;
    };
    Car.prototype.setModel = function (model) {
        this.model = model;
    };
    Car.prototype.getPrice = function () {
        return this.price;
    };
    Car.prototype.setPrice = function (price) {
        this.price = price;
    };
    Car.prototype.getColor = function () {
        return this.color;
    };
    Car.prototype.setColor = function (color) {
        this.color = color;
    };
    Car.prototype.getLicenseNum = function () {
        return this.license_number;
    };
    Car.prototype.setLicenseNum = function (license_number) {
        this.license_number = license_number;
    };
    Car.prototype.getImg = function () {
        return this.img;
    };
    Car.prototype.setImg = function (img) {
        this.img = img;
    };
    Car.nextID = 0;
    return Car;
}());
var Race = /** @class */ (function () {
    function Race(race_date, name, location) {
        this.race_date = race_date;
        this.name = name;
        this.ID = ++Race.nextID;
        this.location = location;
    }
    Race.prototype.getRaceDate = function () {
        return this.race_date;
    };
    Race.prototype.setRaceDate = function (race_date) {
        this.race_date = race_date;
    };
    Race.prototype.getRaceName = function () {
        return this.name;
    };
    Race.prototype.setRaceName = function (race_name) {
        this.name = race_name;
    };
    Race.prototype.getLocation = function () {
        return this.location;
    };
    Race.prototype.setLocation = function (location) {
        this.location = location;
    };
    Race.prototype.getRaceID = function () {
        return this.ID;
    };
    /*public setRaceID(ID:number){
        this.ID = ID;
    }*/
    /*  cars:CarInRace[];
  
      public addCar(car:SportCar, rank:number) {
          this.cars.push(new CarInRace(3, car, this, rank));
      }*/
    Race.prototype.addCar = function (car, rank) {
        CarInRace.addCarInRace(car, this, rank);
    };
    Race.nextID = 0;
    return Race;
}());
var SportCar = /** @class */ (function (_super) {
    __extends(SportCar, _super);
    function SportCar(name, model, price, color, license_number, img) {
        return _super.call(this, name, model, price, color, license_number, img) || this;
    }
    /* races:CarInRace[];
     public addRace(ID:number, race:Race, rank: number){
         this.races.push(new CarInRace(ID, this, race, rank));
     }*/
    SportCar.prototype.addRace = function (race, rank) {
        CarInRace.addCarInRace(this, race, rank);
    };
    return SportCar;
}(Car));
var CarInRace = /** @class */ (function () {
    function CarInRace(sportCar, race, rank) {
        this.ID = ++CarInRace.nextID;
        this.sportCar = sportCar;
        this.race = race;
        this.rank = rank;
    }
    CarInRace.addCarInRace = function (car, race, rank) {
        for (var i = 0; i < CarInRace.races.length; i++) {
            if (CarInRace.races[i].sportCar.getID() == car.getID() &&
                CarInRace.races[i].race.getRaceID() == race.getRaceID()) {
                CarInRace.races[i].rank = rank;
                return;
            }
        }
        ;
        CarInRace.races.push(new CarInRace(car, race, rank));
    };
    CarInRace.nextID = 0;
    return CarInRace;
}());
