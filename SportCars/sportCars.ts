
export let cars:Car[] = [];
let races:Race[] = [];
function addCar(name:string, color:string, model:string, license_number:number,
    price:number, img:string){
        cars.push(new Car(name, model, price, color, license_number, img));
    }

export let ShowCars=function():Car[]{
    return cars ;

}
function addRaceToCar(carID:number, raceID:number, rank:number){
    let race = races.find(r=>r.getRaceID() == raceID);
    let car = cars.find(c=>c.getID() == carID);
    if(car != null && race != null){
        if(!(car instanceof SportCar))
            car.changeCarToSportCar();
        CarInRace.addCarInRace(car as SportCar, race, rank);
    }
}

let addRaceToCarFromPage = function(){
    let carID = $('#carID');
    let raceID = $('#raceID');
    let rank = $('#rank');
    addRaceToCar((Number)(carID.val()), (Number)(raceID.val()), (Number)(rank.val()));
}

export let createCar = function(){
    //קישור לשדות של הדף
    let name = $('#name');
    let color = $('#color');
    let year = $('#year');
    let licenseNum = $('#licenseNum');
    let price = $('#price');
    let photo = $('#photo');
    //הכנסת רכב חדש לפי הפרטים שהתקבלו מהמשתמש
    addCar(name.val() as string, color.val() as string, year.val() as string, 
    licenseNum.val() as number, price.val() as number, photo.val() as string);
    //ניקוי השדות בדף
    name.val("");
    color.val("");
    year.val("");
    licenseNum.val("");
    price.val("");
    photo.val("");
   // showCar(cars.length-1);
}


class Car{
    protected ID:number; 
    protected name:string;
    protected license_number:number; 
    protected color:string; 
    protected model:string;
    protected price:number;
    protected img:string;
    private static nextID:number = 0;

    public constructor(name:string, model:string, price:number, color:string, license_number:number, img:string){
        this.ID = ++Car.nextID;
        this.name = name;
        this.model = model;
        this.price = price;
        this.color = color;
        this.license_number = license_number;
        this.img = img;
    }


    public changeCarToSportCar(){
        let sportCar:SportCar = new SportCar(this.name, this.model, this.price, this.color,
            this.license_number, this.img);
        sportCar.ID = this.ID;
        Car.nextID--;
        for(let i=0; i<cars.length; i++){
            if(cars[i].ID == this.ID){
                cars[i] = sportCar;
                break;
            }
        }
    }

    public getID(){
        return this.ID;
    }
   /* public setID(ID:number){
        this.ID = ID;
    }*/
    
    public getModel(){
        return this.model;
    }
    public setModel(model:string){
        this.model = model;
    }

    public getPrice(){
        return this.price;
    }
    public setPrice(price:number){
        this.price = price;
    }

    public getColor(){
        return this.color;
    }
    public setColor(color:string){
        this.color = color;
    }

    public getLicenseNum(){
        return this.license_number;
    }
    public setLicenseNum(license_number: number){
        this.license_number = license_number;
    }

    public getImg(){
        return this.img;
    }
    public setImg(img: string){
        this.img = img;
    }
}
 

class Race{
    private race_date:string; 
    private name:string; 
    private ID:number; 
    private location: string; 
    private static nextID:number = 0;

    public constructor(race_date:string, name:string, location:string){
        this.race_date = race_date;
        this.name = name;
        this.ID = ++Race.nextID;
        this.location = location;
    }

    public getRaceDate(){
        return this.race_date;
    }
    public setRaceDate(race_date:string){
        this.race_date = race_date;
    }

    public getRaceName(){
        return this.name;
    }
    public setRaceName(race_name:string){
        this.name = race_name;
    }

    public getLocation(){
        return this.location;
    }
    public setLocation(location:string){
        this.location = location;
    }

    public getRaceID(){
        return this.ID;
    }
    /*public setRaceID(ID:number){
        this.ID = ID;
    }*/

  /*  cars:CarInRace[];

    public addCar(car:SportCar, rank:number) {
        this.cars.push(new CarInRace(3, car, this, rank));
    }*/

    public addCar(car:SportCar, rank:number){
        CarInRace.addCarInRace(car, this, rank);
    }
}


class SportCar extends Car{
    public constructor(name:string, model:string, price:number, color:string, license_number:number, img:string){
        super(name, model, price, color, license_number, img);
    }
   /* races:CarInRace[];
    public addRace(ID:number, race:Race, rank: number){
        this.races.push(new CarInRace(ID, this, race, rank));
    }*/

    public addRace(race:Race, rank:number){
        CarInRace.addCarInRace(this, race, rank);
    }
}


class CarInRace{
    private ID:number; 
    private sportCar: SportCar; 
    private race:Race; 
    private rank: number;
    private static nextID:number = 0;
    private static races:CarInRace[];

    public constructor(sportCar: SportCar, race:Race, rank: number){
        this.ID = ++CarInRace.nextID;
        this.sportCar = sportCar;
        this.race = race;
        this.rank = rank;
    }

    public static addCarInRace(car: SportCar, race: Race, rank:number){
        for(let i=0; i<CarInRace.races.length; i++){
            if(CarInRace.races[i].sportCar.getID() == car.getID() &&
             CarInRace.races[i].race.getRaceID() == race.getRaceID()){
                CarInRace.races[i].rank = rank;
                return ;
            }
        };

        CarInRace.races.push(new CarInRace(car, race, rank));
    }
    
}
