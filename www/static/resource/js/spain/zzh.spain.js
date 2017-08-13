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
        createPrompt: function (msg) {
            let prompt = document.createElement('div');
            let bar = document.createElement('div');
            let drag = document.createElement('div');
            let cls = document.createElement('li');
            let msgDialog = document.createElement('div');
            let conBtn = document.createElement('input');
            prompt.className = "prompt_box";
            prompt.id = "prompt_box";
            bar.className = "bar";
            bar.id = "bar";
            drag.className = 'drag';
            drag.id = 'drag';
            cls.className = "fa fa-close fa-2x cls";
            cls.id = "cls";
            msgDialog.className = 'msgDialog_box';
            msgDialog.id = 'msgDialog';
            msgDialog.innerText = msg;
            conBtn.type = 'button';
            conBtn.className = 'confirm_btn';
            conBtn.id = 'confirm_btn';
            conBtn.value = 'ok';
            bar.appendChild(drag);
            bar.appendChild(cls);
            prompt.appendChild(bar);
            prompt.appendChild(msgDialog);
            prompt.appendChild(conBtn);
            return prompt
        },
        showPrompt: function (msg, reload) {
            let mainDiv = document.getElementById('prompt_box');
            if (mainDiv === '' || mainDiv === undefined || mainDiv === null) {
                document.body.appendChild(this.createPrompt(msg));
                let drag = document.getElementById('drag');
                let cls = document.getElementById('cls');
                let conBtn = document.getElementById('confirm_btn');
                drag.onmousedown = function (event) {
                    let ev = event || window.event;
                    let mainDiv = document.getElementById('prompt_box');
                    let dragX = ev.clientX - mainDiv.offsetLeft;
                    let dragY = ev.clientY - mainDiv.offsetTop;
                    let winW = document.documentElement.clientWidth || document.body.clientWidth;
                    let winH = document.documentElement.clientHeight || document.body.clientHeight;
                    let spaceX = winW - mainDiv.offsetWidth;
                    let spaceY = winH - mainDiv.offsetHeight;
                    document.onmousemove = function (event) {
                        // document.title = dragX + "," + dragY;
                        let ev = event || window.event,
                            l = event.clientX - dragX,
                            t = event.clientY - dragY;
                        if (l < 0) {
                            l = 0;
                        } else if (l > spaceX) {
                            l = spaceX;
                        }
                        if (t < 0) {
                            t = 0;
                        } else if (t > spaceY) {
                            t = spaceY;
                        }
                        mainDiv.style.left = (l + 120) + 'px';
                        mainDiv.style.top = (t + 120) + 'px';
                    }
                    document.onmouseup = function () {
                        document.onmousemove = null;
                    }

                }
                cls.onclick = function () {
                    document.body.removeChild(document.getElementById('prompt_box'));
                    if (reload) {
                        window.location.reload();
                    }
                }
                cls.onmouseover = function () {
                    let cls = document.getElementById('cls');
                    cls.className = cls.className.replace('fa-2x', 'fa-3x');
                }
                cls.onmouseout = function () {
                    let cls = document.getElementById('cls');
                    cls.className = cls.className.replace('fa-3x', 'fa-2x');
                }
                conBtn.onclick = function () {
                    document.body.removeChild(document.getElementById('prompt_box'));
                    if (reload) {
                        window.location.reload();
                    }
                }
            } else {
                return;
            }
        },
        closePrompt: function () {
            /*myId.style.display = 'none';*/
            let mainDiv = document.getElementById('prompt_box');
            let cls = document.getElementById('cls');
            let conBtn = document.getElementById('confirm_btn');
            if (mainDiv === '' || mainDiv === undefined || mainDiv === null) {
                return;
            } else {
                cls.onclick = null;
                cls.onmouseover = null;
                cls.onmouseout = null;
                conBtn.onclick = null;
                document.body.removeChild(document.getElementById('prompt_box'));
            }
        },
    };
}