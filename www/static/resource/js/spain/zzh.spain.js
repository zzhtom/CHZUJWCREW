function mySpain() {
    return {
        createSpain: function () {
            let main = document.getElementById('spain_zzh');
            if (main === '' || main === undefined || main === null) {
                let mainSpain = document.createElement('div');
                let spain = document.createElement('li');
                mainSpain.id = 'spain_zzh';
                mainSpain.className = 'mainSpain';
                spain.className = 'fa fa-spinner fa-pulse fa-5x spain'
                mainSpain.appendChild(spain);
                return mainSpain;
            } else {
                return;
            }
        },
        showSpain: function () {
            let mainSpain = document.getElementById('spain_zzh');
            if (mainSpain === '' || mainSpain === undefined || mainSpain === null) {
                document.body.appendChild(this.createSpain());
            } else {
                return;
            }
        },
        closeSpain: function () {
            let mainSpain = document.getElementById('spain_zzh');
            if (mainSpain === '' || mainSpain === undefined || mainSpain === null) {
                return;
            } else {
                document.body.removeChild(mainSpain);
                return true;
            }
        },
    };
}