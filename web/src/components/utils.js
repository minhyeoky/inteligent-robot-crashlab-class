export let post_status = (action) => {
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:5002/status?action=' + action, true);
    xhr.onload = (res) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // console.log(xhr.responseText);
            } else {
                console.log(xhr.statusText);
            }
        }
    };
    xhr.onerror = () => {
        console.log('error in xhr');
    };
    xhr.send(null)
};

export let get_status = (a) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:5002/status?action=', true);
    xhr.onload = () => {
        // let text = xhr.responseText;
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // console.log(text);
            } else {
                console.log(xhr.statusText);
            }
        }

        let json = JSON.parse(xhr.responseText);
        let status = json["status"];
        if (status === 1) {
            a.props.history.push('/intro');
        }
    };
    xhr.onerror = () => {
        console.log('error in xhr');
    };
    xhr.send(null);
};

export let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export let loadImage = async () => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5002/photo');
        // xhr.open('GET', 'https://avatars1.githubusercontent.com/u/12870549?s=60&v=4');
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error('Image didn\'t load'));
            }
        };
        xhr.onerror = () => {
            reject(new Error('Image didn\'t load'));
        };
        xhr.send(null);
    })
};

export default null;

