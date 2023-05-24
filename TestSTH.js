
require('dotenv').config();
console.log(process.env.PAT);
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
 const res =  await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/domains", requestOptions)
//    .then( rescsrf => {
//       responsecsrf = rescsrf.headers.get("X-CSRF-Token");
//       console.log("csrf:"+responsecsrf);

//     //   let createres =  create(responsecsrf1);
//     //    execution(responsecsrf1,createres);
//     } 
//   )
//   .then(createres=create(responsecsrf1))
//   .then(execution(responsecsrf1,createres));
console.log("csrf:"+res.headers.get("X-CSRF-Token"));
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
    "repository": "https://github.com/RadhamaniPgowda/TestRepo.git",
    "branch": "master",
    "files": [
      {
        "pathToFile": "src/test.properties"
      }
    ],
    "credentials": {
      "user": "RadhamaniPgowda",
      "email": "radhamanip5@gmail.com",
      "password": process.env.PAT
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
console.log("create res  :"+id);
return id;
}


async function executionpull(rescsrf,id){
  var myHeaders = new Headers();
  myHeaders.append("X-CSRF-Token",rescsrf.headers.get("X-CSRF-Token"));
  myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", rescsrf.headers.get("Set-Cookie"));
  
  var raw = JSON.stringify({
    "operation": "PULL_TRANSLATE",
    "credentials": {
      "user": "RadhamaniPgowda",
      "email": "radhamanip5@gmail.com",
      "password": process.env.PAT
    }
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  // let text =  await createres.json();

  // let id = text["id"];
  let resultexe = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects/"+id+"/executions", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  let text = await resultexe.json();

let idexec = text["id"];
console.log("create res  :"+idexec);          
  return idexec;
}

async function getexecutions(rescsrf,projid, execid){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
  myHeaders.append("X-CSRF-Token",rescsrf.headers.get("X-CSRF-Token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 let res = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects/"+projid+"/executions/"+execid, requestOptions)
 console.log(await res.text());

 
}

async function executionpush(rescsrf,id){
  var myHeaders = new Headers();
  myHeaders.append("X-CSRF-Token",rescsrf.headers.get("X-CSRF-Token"));
  myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", rescsrf.headers.get("Set-Cookie"));
  
  var raw = JSON.stringify({
    "operation": "TRANSLATE_PUSH",
    "credentials": {
      "user": "RadhamaniPgowda",
      "email": "radhamanip5@gmail.com",
      "password": process.env.PAT
    }
  });
  console.log("RAW DATA"+raw)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  // let text =  await createres.json();

  // let id = text["id"];
  let resultexe = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects/"+id+"/executions", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  let text = await resultexe.json();

let idexec = text["id"];
console.log("create res push :"+idexec);          
  return idexec;
}

async function getexecutions(rescsrf,projid, execid){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic STMyNzM1ODpzd2VldG1vbTkwMDg3MTg1NzEk");
  myHeaders.append("X-CSRF-Token",rescsrf.headers.get("X-CSRF-Token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 let res = await fetch("https://saps1cbb8a8f.eu3.hana.ondemand.com/translationhub/api/v2/gitProjects/"+projid+"/executions/"+execid, requestOptions)
 console.log(await res.text());

}


function message() {
  console.log("waiting..............")
}
async function calls(){
  let  rescsrf = await fetchcsrf();
  let id = await create(rescsrf);
  let exec = await executionpull(rescsrf,id);
  //let exec1 = await executionpush(rescsrf,id);
  // await setTimeout(message,13000000);
  const myTimeout = await setTimeout(executionpush, 30000,rescsrf, id);

  // let execpush = await executionpush(rescsrf,id);


 
await setTimeout(message,13000000);
  //await getexecutions(rescsrf,id, exec)
}



calls()
