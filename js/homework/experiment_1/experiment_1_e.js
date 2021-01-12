"use strict";

var gl;
var points;
var a = 0.0, b = 0.5;
function changebig(){
    a *= 2;
    b *= 2;
}
function changesmall(){
    a /= 2;
    b /= 2;
}
window.onload = function (){
    init();
}
function init() {
    var canvas = document.getElementById("triangle-canvas");
    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ) {
        alert("WebGL isn't available" );
    }

    // nine Vertices
    var vertices = new Float32Array([
         a,  b,  0.0,  0.0,  1.0,
        -b, -b,  1.0,  0.0,  0.0,
         b, -b,  0.0,  1.0,  0.0,
    ]);
    var FSIZE = vertices.BYTES_PER_ELEMENT;

    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,  vertices, gl.STATIC_DRAW );

    // Associate external shader variables with data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 5 * FSIZE, 0 );
    gl.enableVertexAttribArray( vPosition );

    var a_Color = gl.getAttribLocation( program, 'a_Color');
    // 将缓冲区对象分配给a_Color变量
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    // 连接a_Color变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Color);

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}