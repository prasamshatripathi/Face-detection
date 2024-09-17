const video =document.grtElementById('video')

Promise.all([
    
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.FaceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.FaceRecognition.loadFromUri('/models'),
    faceapi.nets.FaceExpressionNet.loadFromUri('/models'),





]).then(startVideo)

function startvideo(){
    navigator.getUserMedia(
       { video: {}},stream => video.srcObjet = stream,
        err=> console.error(err)
)
}
video.addEventListener('play',()=>{
    const canvas= faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize= {width: video.width, height:video.height}
    faceapi.matchDimensions(canvas , displaySize)
    setInterval(async() => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectoroption()) .widthFaceLandmarks().widthFaceExpressions()
        console.log(detections)
        const resizedDetection = faceapi.resizeResults(detections,displaySize)
        canvas.grtcontext('2d').clearRect(0 ,0, canvas.width ,canvas.height)
faceapi.draw.drawDetections(canvas , resizedDetections)
faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
faceapi.draw.drawFaceExpressions(canvas , resizedDetections)
    },100)
})
