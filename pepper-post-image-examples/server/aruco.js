const util = require('util')
var pixel = require('pixel');
var AR = require('js-aruco').AR;
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
                        corners: []
                    }
                    m.corners.forEach(function(corner){
                        retMarker.corners.push({
                            x: corner.x,
                            y: corner.y
                        })
                        //console.log("      corner: " + util.inspect(corner));
                        retImage.markers.push(retMarker);
                    });
                })
                retImages.push(retImage);
            })
            resolve(retImages);
        });
    })
}

var imageUrl= 'img/center.jpg';
getMarkers(imageUrl).then(function(markerData){
    console.log("image loaded from " + imageUrl);
    console.log(markerData);
});
