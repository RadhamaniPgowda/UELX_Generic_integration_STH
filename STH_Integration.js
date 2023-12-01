function customEncode(inputString) {
  let encodedString = '';
  for (let i = 0; i < inputString.length; i++) {
    const charCode = inputString.charCodeAt(i);
    // Add a custom offset (e.g., 10) to each character code for encoding
    const encodedCharCode = charCode + 10;
    encodedString += String.fromCharCode(encodedCharCode);
  }
  return encodedString;
}

// Custom decoding without atob (Browser example)
function customDecode(encodedString) {
  let decodedString = '';
  for (let i = 0; i < encodedString.length; i++) {
    const encodedCharCode = encodedString.charCodeAt(i);
    // Subtract the custom offset (e.g., 10) from each character code for decoding
    const charCode = encodedCharCode - 10;
    decodedString += String.fromCharCode(charCode);
  }
  return decodedString;
}

async function fetchcsrf() {
  
    let responsecsrf;
    var myHeaders = new Headers();
    myHeaders.append("X-CSRF-Token", "Fetch");
    myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    let createres;
    const res = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/domains", requestOptions);
    return res;
}

async function create(res) {
  
    var myHeaders = new Headers();
    myHeaders.append("X-CSRF-Token", res.headers.get("X-CSRF-Token"));
    myHeaders.append("Cookie", res.headers.get("Set-Cookie"));
    myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": "Cloud app in GitHub",
        "sourceLanguage": "en",
        "targetLanguages": [
           "it",
            "fr",
            "ru",
            "de"
        ],
        "importExistingTranslations": false,
        "gitType": "WEB",
        "repository": "https://github.com/RadhamaniPgowda/UELX_Generic_integration_STH.git",
        "branch": "master",
        "files": [{
            "pathToFile": "src/i18n.properties"
        }],
        "credentials": {
            "user": "RadhamaniPgowda",
            "email": "radhamanip5@gmail.com",
            "password": decodeValue
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    let res1 = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects", requestOptions)
    let text = await res1.json();
    let id = text["id"];
    console.log("Git Project ID:" + id);
    return id;
}

async function executionpull(rescsrf, id) {

  	var myHeaders = new Headers();
    myHeaders.append("X-CSRF-Token", rescsrf.headers.get("X-CSRF-Token"));
    myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", rescsrf.headers.get("Set-Cookie"));

    var raw = JSON.stringify({
        "operation": "PULL_TRANSLATE",
        "credentials": {
            "user": "RadhamaniPgowda",
            "email": "radhamanip5@gmail.com",
            "password": decodeValue
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let resultexe = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects/" + id + "/executions", requestOptions)
    let text = await resultexe.json();
    let idexec = text["id"];
    return idexec;
}

async function executionpush(rescsrf, id) {

  	var myHeaders = new Headers();
    myHeaders.append("X-CSRF-Token", rescsrf.headers.get("X-CSRF-Token"));
    myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", rescsrf.headers.get("Set-Cookie"));

    var raw = JSON.stringify({
        "operation": "TRANSLATE_PUSH",
        "credentials": {
            "user": "RadhamaniPgowda",
            "email": "radhamanip5@gmail.com",
            "password": decodeValue
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let resultexe = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects/" + id + "/executions", requestOptions);
    let text = await resultexe.json();
    let idexec = text["id"];
    return idexec;
}

async function calls() {
    let rescsrf = await fetchcsrf();
    let id = await create(rescsrf);
    let exec = await executionpull(rescsrf, id);
    const myTimeout = await setTimeout(executionpush, 30000, rescsrf, id);
}

const decodeValue = customDecode("qrzi:|orcNNv;?]LyBAluS?z]uB_qok:~c[^");
console.log('Decoded:', decodeValue);

calls()
