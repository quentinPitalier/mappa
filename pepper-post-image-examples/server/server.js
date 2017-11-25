var express = require('express');
var multer  = require('multer')
var fs = require('fs');
var app = express();

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.get('/', function(req, res){
    console.log('GET /')
    //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/', upload.single('file'), function (req, res, next) {
    console.log('POST /');
    console.log(req.file);
    if(req.file){
        getMarkers(req.file.buffer).then(function(markerData){
            console.log("image loaded from " + req.file.originalname);
            console.log(markerData);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(markerData));
        });
        
    } else {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error}}));
    }
    
    
  })

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)

const util = require('util')
var pixel = require('pixel');
var AR = require('js-aruco').AR;
var POS = require('js-aruco').POS2;
var detector = new AR.Detector();

function getMarkers(imageUrl){
    return new Promise(function (resolve, reject) {
        var retImages = []
        pixel.parse(imageUrl).then(function(images){        
            var i = 0;
            images.forEach(function(image){
                var retImage = {
                    index: i,
                    width: image.width,
                    height: image.height,
                    markers: []
                }
                var markers = detector.detect(image);    
                markers.forEach(function(m){
                    retMarker = {
                        id: m.id,
                        corners: [],
                        posit: {},
                        pose: {}
                    }
                    m.corners.forEach(function(corner){
                        retMarker.corners.push({
                            x: corner.x,
                            y: corner.y
                        })
                        //console.log("      corner: " + util.inspect(corner));
                    });
                    retImage.markers.push(retMarker);

                    // calc posit
                    retMarker.posit = new POS.Posit(250, image.width);
                    console.log(util.inspect(retMarker.posit))

                    // calc pose
                    var corners = m.corners;
                    //  center the corners for pose calc
                    for (var i = 0; i < corners.length; ++ i){
                      var corner = corners[i];
                    
                      corner.x = corner.x - (image.width / 2);
                      corner.y = (image.height / 2) - corner.y;
                    }
                    retMarker.pose = retMarker.posit.pose(corners);
                    console.log(util.inspect(retMarker.pose))
                })
                retImages.push(retImage);
            })
            resolve(retImages);
        });
    })
}

// var imageUrl= 'img/center.jpg';
// getMarkers(imageUrl).then(function(markerData){
//     console.log("image loaded from " + imageUrl);
//     console.log(markerData);
// });
