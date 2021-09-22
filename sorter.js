var colores = []
var ordCanvas=1;

for(j in colores)
{
    colores[j] = hexToRgb(colores[j]);
}

document.getElementById("cAdd").addEventListener("click", addColor);
document.getElementById("cRemove").addEventListener("click", removeColor);

document.getElementById("clearCanvas").addEventListener("click", clearCanvas);
document.getElementById("Preset").addEventListener("click", preset1);

document.getElementById("OrdRGB").addEventListener("click", ordenarRGB);
document.getElementById("OrdHex").addEventListener("click", ordenarHex);
document.getElementById("OrdValue").addEventListener("click", ordenarValue);
document.getElementById("OrdRandom").addEventListener("click", ordenarRandom);

var color = document.getElementById("colors");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');


function addColor()
{
    colores.push(hexToRgb(color.value));

    canvasMod();
}

function removeColor()
{
    var del = color.value;
    for(i in colores)
    {
        if (colores[i].h == del)
        {
            invertirPos(i, colores.length-1);
            colores.length -= 1;
        }
    }
    canvasMod();
}

function canvasMod()
{
    if(colores.length > 10)
    {
        canvas.height = Math.ceil(colores.length/10)*50;
    }
    else
    {
        canvas.height = canvas.height
    }

    dibujarColores();
}

function detectarColores()
{
    for(a of colores)
    {   
        var o = 10;
        var p = 25;
        
        //Grises
        if (((-o < (a.r + a.g) - (a.g + a.b) && (a.r + a.g) - (a.g + a.b) < o) && (-o < (a.r + a.g) - (a.r + a.b) && (a.r + a.g) - (a.r + a.b) < o) && (-o < (a.r + a.b) - (a.g + a.b) && (a.r + a.b) - (a.g + a.b) < o)) || (a.r <= 25 && a.g <= 25 && a.b <= 25)) 
        {
            a.c = 0; 
        }//Amarillos
        else if((a.r > a.b && a.g > a.b) && (a.r - a.g < p && p > a.g - a.r))
        {
            a.c = 2;
        }
        //Celestes
        else if((a.g > a.r && a.b > a.r) && (a.g - a.b < p && p > a.g - a.b) && (a.b < a.r + a.g ))
        {
            a.c = 4; 
        }
        //Magentas
        else if((a.r > a.g && a.b > a.g) && (a.r - a.b < p && p > a.r - a.b))
        {
            a.c = 6; 
        }
        //Rojos
        else if(a.r > a.g && a.r > a.b)
        {
            a.c = 1; 
        }
        //Verdes
        else if(a.g > a.r && a.g > a.b)
        {
            a.c = 3; 
        }
        //Azules
        else if(a.b > a.r && a.b > a.g)
        {
            a.c = 5; 
        }
        
    }
}

function dibujarColores()
{
    x = 0;
    y = 0;
    
    for(i of colores)
    {
        ctx.beginPath();
        ctx.fillStyle = i.h;
        ctx.rect(x, y, 50, 50);
        ctx.fill();

        if(x == canvas.width - 50)
        {
            y += 50;
            x = 0;
        }
        else
        {
            x += 50;
        }
    }
}

function clearCanvas()
{
    colores = [];
    canvas.height = 50;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      h: hex,
      c: 0
    } : null;
}

//Criterios
function ordenarRGB() //Ordena en base al color
{
    detectarColores();
    for(k = 0; k < colores.length-1; k++)
    {
        for(i = 0; i < colores.length-1; i++)
        {
            c0 = colores[i];
            c1 = colores[i+1];

            //Red
            if(c0.c == 0)
            {
                if((c1.c == 0) && (c0.g > c1.g))
                {
                    invertirPos(i, i+1);
                }
            }
            else if(c0.c == 1)
            {
                if(c1.c < 1)
                {
                    invertirPos(i, i+1);
                }
                else if((c1.c == 1) && (c0.g > c1.g))
                {
                    invertirPos(i, i+1);
                }
            }
            //Yellow
            else if(c0.c == 2)
            {
                if(c1.c < 2)
                {
                    invertirPos(i, i+1);
                }
                else if((c1.c == 2) && (c0.g - c0.r < c1.g - c0.r))
                {
                    invertirPos(i, i+1);
                }
            }
            //Green
            else if(c0.c == 3)
            {
                if(c1.c < 3)
                {
                    invertirPos(i, i+1);
                }
                else if((c1.c == 3) && (c0.g - c0.r > c1.g - c0.r))
                {
                    invertirPos(i, i+1);
                }
            }
            //Cyan
            else if(c0.c == 4)
            {
                if(c1.c < 4)
                {
                    invertirPos(i, i+1);
                }
                else if((c1.c == 4) && (c0.b - c0.g < c1.b - c0.g))
                {
                    invertirPos(i, i+1);
                }
            }
            //Blue
            else if(c0.c == 5)
            {
                if(c1.c < 5)
                {
                    invertirPos(i, i+1);
                }
                else if((c1.c == 5) && (c0.g < c1.g))
                {
                    invertirPos(i, i+1);
                }
            }
            //Magenta
            else if(c0.c == 6)
            {
                if(c1.c < 6)
                {
                    invertirPos(i, i+1);
                }
                else if((c1.c == 6) && (c0.b - c0.r < c1.b - c0.r))
                {
                    invertirPos(i, i+1);
                }
            }
        }
    }

    dibujarColores();
}
function ordenarHex() //Ordena en base al codigo Hex
{
    detectarColores();
    for(k = 0; k < colores.length-1; k++)
    {
        for(i = 0; i < colores.length-1; i++)
        {
            c0 = colores[i];
            c1 = colores[i+1];

            if(c0.h > c1.h)
            {
                invertirPos(i, i+1);
            }
        }
    }

    dibujarColores();
}
function ordenarValue() //Ordena en base a la suma de R+G+B
{
    detectarColores();

    for(k = 0; k < colores.length-1; k++)
    {
        for(i = 0; i < colores.length-1; i++)
        {
            c0 = colores[i];
            c1 = colores[i+1];

            if(c0.r + c0.g + c0.b > c1.r + c1.g + c1.b)
            {
                invertirPos(i, i+1);
            }
        }
    }

    dibujarColores();
}
function ordenarRandom() //Ordena de manera random
{
    detectarColores();

    for(k = 0; k < colores.length-1; k++)
    {
        for(i = 0; i < colores.length-1; i++)
        {
            c0 = colores[i];
            c1 = colores[i+1];

            if(Math.random(c0.r + c0.g + c0.b) > Math.random(c1.r + c1.g + c1.b))
            {
                invertirPos(i, i+1);
            }
        }
    }

    dibujarColores();
}

function invertirPos(pos1,pos2)
{
    var temp;
    temp = colores[pos1];
    colores[pos1] = colores[pos2];
    colores[pos2] = temp;
}

