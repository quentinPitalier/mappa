let net = require('net');

net.createServer(function(s){
  s.on('data', function(data){
   
    if(data == '#end'){
      console.log("incoming #end");
      s.end();
    } else {
      getMarkers(data).then(function(markerData){
            if (markerData === undefined){
                console.log("image loaded");
                console.log(JSON.stringify(markerData));
                s.write(JSON.stringify(markerData));
            } else {
                console.log("No marker data found.");
                s.write('#complete');
            }
      }).catch(function (err){
        console.log("Error finding marker data.");
        s.write('#error');
        });
      
    }
  })
  s.on('end', function () {
    console.log("  end");
  });
}).listen(5000);
console.log("Socket listening\n");

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
                try{
                var markers = detector.detect(image);    
                } catch(err) {
                    reject();
                }
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