let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

async function app() {
    console.log('Loading mobilenet..');
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    const webcam = await tf.data.webcam(webcamElement);
  
    const addExample = async classId => {
        const img = await webcam.capture();
        const activation = net.infer(img, true);
        classifier.addExample(activation, classId);
        img.dispose();
    };

    //localStorageに保存
    function dataSave() {
        let str = JSON.stringify( Object.entries(classifier.getClassifierDataset()).map(([label, data])=>[label, Array.from(data.dataSync()), data.shape]) );
        if(str.length > 2){
            localStorage.setItem("任意のkey", str);
        }
    }

    //localStorageにデータがある場合はロードしてセットする
    function dataLoad() {
        if(localStorage.getItem('任意のkey') != null){
            let str = localStorage.getItem('任意のkey');
            classifier.setClassifierDataset( Object.fromEntries( JSON.parse(str).map(([label, data, shape])=>[label, tf.tensor(data, shape)]) ) );
        }
    }

    //localStorageに保存されているデータを削除する
    function dataRemove(){
        localStorage.removeItem('任意のkey');
    }
    
    document.getElementById('class-a').addEventListener('click', () => addExample(0));
    document.getElementById('class-b').addEventListener('click', () => addExample(1));
    document.getElementById('class-c').addEventListener('click', () => addExample(2));
    //転移学習のデータ保存、ロード、削除についてそれぞれId指定
    document.getElementById('class-s').addEventListener('click', () => dataSave());
    document.getElementById('class-l').addEventListener('click', () => dataLoad());
    document.getElementById('class-r').addEventListener('click', () => dataRemove());

    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();
            const result = await net.classify(img);
            const activation = net.infer(img, 'conv_preds');
            const resultTL = await classifier.predictClass(activation);
            const classes = ['A', 'B', 'C'];
            document.getElementById('console').innerText = `
                prediction: ${result[0].className}\n
                probability: ${result[0].probability}
                prediction TL: ${classes[resultTL.label]}\n
                probability TL: ${resultTL.confidences[resultTL.label]}
            `;
            img.dispose();
        }
        await tf.nextFrame();
    }
}

app();
