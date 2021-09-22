var colores = [];
var z=0;
var ordCanvas=1;

document.getElementById("cSend").addEventListener("click", addColor);
document.getElementById("cOrdenar").addEventListener("click", ordenarColores);

var color = document.getElementById("colorss");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function addColor()
{
    nColor = color.value;
    colores.push(nColor);

    canvasMod();
}

function canvasMod()
{
    if(z==10)
    {
        canvas.height += 50;
        z = 0;
    }

    dibujarColores();
    
    return z+=1;
}

function ordenarColores()
{
    colores.sort();

    dibujarColores();
}

function dibujarColores()
{
    x = 0;
    y = 0;
    
    for(i of colores)
    {
        ctx.beginPath();
        ctx.fillStyle = i;
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