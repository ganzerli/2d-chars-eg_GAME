const readline = require('readline');

const print = (WIDTH, HEIGHT, positions, CHAR)=>{
        let result = [];
        let resultI = 0;
    
        // difining existence of screen
        // print first a blank screen
        // background char is CHAR
        for (let height = 0; height < HEIGHT; height++) {
            for (let width = 0; width < WIDTH ; width++) {
                // SET RESULT ARRAY AS ALL BLANK CHAR
                result[resultI]= CHAR;
                resultI ++;
            }
            result[resultI]= '\n';
            resultI ++;
        }
    
        // elements
        let left = 0 ;
        let top = 0 ;

        // init char for printing elements
        let el_CHAR = ' ';
    
        // put elements
        positions.forEach(e => {
            left = e[0] +1;
            top = e[1];
            sizeX = e[2];
            sizeY = e[3];
            el_CHAR = e[4];

            // begin of top left
            let top_left = (top * WIDTH ) + left ;

            // funtction to skip rows based on '\n'
            const height = (relativePosition) =>{
                for (let i = 0; i < sizeY * WIDTH; i+= WIDTH +1) {
                    if(result[relativePosition + i] == '\n'){
                        relativePosition += 1;
                        break;
                    }            
                    result[relativePosition + i] = el_CHAR;
                }
            }

            // print x row per row
            for (let i = 0; i < sizeX; i++) {
                // check if border of right side
                if(result[top_left + i] == '\n'){
                    top_left += 1;
                    break;
                }
                // set in array new position
                result[top_left + i] = el_CHAR;
                
                // ...() same...
                // print 1 column
                height(top_left + i);
            }
        });
        return result;
    }


//  @   
//  @   DEFINE VITAL VARIABLES

//  @   
//  @   DEFINE SIZE OF THE FIELD    
const HEIGHT = 33;
const WIDTH = 128;

//  @   
//  @   all grafics need to be dropped in this array
const ELEMENTS_BUNCH = [/*[0,0,0,0]*/];

//  @   
//  @   if report needed
let REPORT = "";
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//  @   
//  @   FUNCTIONS RETURNING GRAFICS FOR OBJECTS


/// character
const char = createChar(0, 0);


//  @   
//  @   DEFINING OBJECTS
let obj = {
    x:0,
    y:0,
    sizeX:11,
    sizeY:5,
    speedX:1,
    speedY:1,
    type:"0",
    get:function(){
        return {
            x:this.x , 
            y:this.y , 
            sizeX:this.sizeX , 
            sizeY:this.sizeY , 
            grafic:this.grafic
        }
    },
    grafic:[...char]
}

// coordinates
let obj2_= [WIDTH -4,0];

let obj2 = {
    x:obj2_[0],
    y:obj2_[1],
    sizeX:4,
    sizeY:5,
    speedX:0,
    speedY:1,
    type:"0",
    get:function(){
        return {
            x:this.x , 
            y:this.y , 
            sizeX:this.sizeX , 
            sizeY:this.sizeY , 
            grafic:this.grafic
        }
    },
    //[x,y,w,h,'c']
    grafic:[[obj2_[0],obj2_[1] , 2 ,5,'2'], [obj2_[0]-1 , obj2_[1] +1 , 2 ,3,'2']],
}

//  @   
//  @   CREATE OBJECTS ARRAY
const OBJECTS=[];
OBJECTS.push(obj);
OBJECTS.push(obj2);


//  @
//  @   SET CHARACHTER FORMING BACKGROUND
const CHAR = ' ';

//  @
//  @   SET FRAME RATE
const FRAME_RATE = 60; // ms


//  @
//  @   GAME LOOP
setInterval(()=>{

    // change  DIRECTION
    OBJECTS.forEach( (x,i) =>{
    
    // reset x and y locations
        x.y = x.y + x.speedY ;
        x.x = x.x + x.speedX ;

    // DEFINING DIRECTION

    //  // GUARDING FOR DIRECTION

        

 

        OBJECTS[i] = borders(x);

    
    
    
    
    
        REPORT = `${x.x + x.sizeX} = ${WIDTH} :: ${x.y + x.sizeY} = ${HEIGHT} `;
    //  @
    //  @   SET POSITION TO OBJ.GRAFIC []
        x.get().grafic.forEach(a =>{
            a[0] += x.speedX + x.speedY; // compensate \n chars
            a[1] += x.speedY;
            ELEMENTS_BUNCH.push(a);
        });

    });

    //  @
    //  @   PRINT 
    result2 = print ( 
        WIDTH,
        HEIGHT,
        ELEMENTS_BUNCH,
        CHAR
    );
    // CONSOLE.LOG() PRINTS THE WINDOW
    console.log('\n',REPORT);

    console.log(result2.join(""));

}, FRAME_RATE);

//  @
//  @   END OF GAME LOOP




//  @
//  @   USEFUL FUNCTIONS

//  CREATE A GRAPHIC NAMED CHAR
//  CREATES AN  " M "
function createChar(x,y){
    let arr =  [];
    const CHAR = 'M'
    // fll spot
    arr.push([x,y,2,5,CHAR]);
    arr.push([x+2,y,2,1,CHAR]);
    arr.push([x+4,y+1,2,1,CHAR]);
    arr.push([x+6,y+2,2,1,CHAR]);
    arr.push([x+7,y+1,2,1,CHAR]);
    arr.push([x+7,y,2,1,CHAR]);
    arr.push([x+9,y,2,5,CHAR]);
    return arr;
}

//  GET DISTANCES
//  GIVEN OBJECT AND OBJ-ARRAY, RETURN {OBJ-X -> DISTANCE: DIRECTION: , , ,}
//  GIVEN OBJ , RETUNT ARRAY OF OBJECTS AROUND {OBJ:123, LEFT: 3, TOP:-3}
function distances(obj, OBJ_ARR) {
    let x,y,distx,disty;
    const arr = [];
    const result = {};

    // first check difference from top, y, ..  then from left, x, adding them
}


function borders( obj ) {
    //`${x.x + x.sizeX} = ${WIDTH} :: ${x.y + x.sizeY} = ${HEIGHT} `;

    if (obj.x + obj.sizeX >= WIDTH || obj.x <= 0) {
        obj.speedX = obj.speedX * -1;
        obj.x = obj.x + obj.speedX ; 
    }


    if (obj.y + obj.sizeY >= HEIGHT || obj.y <= 0) {
        obj.speedY = obj.speedY * -1; 
        obj.y = obj.y + obj.speedY ;
    }

    return obj;

}