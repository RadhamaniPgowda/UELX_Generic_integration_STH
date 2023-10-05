/ Custom encode function
function customEncode(input) {
  return Array.from(input).map(char => char.charCodeAt(0).toString(16)).join('');
}

 

// Custom decode function
function customDecode(encodedInput) {
  return encodedInput.match(/.{2}/g).map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
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
            "ru"
        ],
        "importExistingTranslations": false,
        "gitType": "WEB",
        "repository": "https://github.com/RadhamaniPgowda/UELX_Generic_integration_STH.git",
        "branch": "master",
        "files": [
            {
                "pathToFile": "src/i18n.properties"
            }
        ],
        "credentials": {
            "user": "RadhamaniPgowda",
            "email": "radhamanip5@gmail.com",
            "password":decodeValue
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

 

 

 

const decodeValue = customDecode("6768705f523459316d67617479596e42464a5730615566626976545a557666437a7030785337464e");
console.log('Decoded:', decodeValue);

 

 

calls()
