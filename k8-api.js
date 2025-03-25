const https = require('https');

let config = {};

const setConfig = (inconf) => {
  config=inconf
}

const getDeployment = (deployment) => {
  return fetch(`https://${config.apiServer}/apis/apps/v1/namespaces/${config.namespace}/deployments/${deployment}`, {
    headers: {
      Authorization: `Bearer ${config.token}`
    },
    agent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(res => res.json())
    .then(data => {
      return data;
    }).catch(err => {
      console.log(err);
    });
}

const updateImage = ({deployment, container, image}) => {
  let data = { 
    "spec": { 
      "template": { 
        "spec": { 
          "$setElementOrder/containers": [
            { 
              "name": container 
            }
          ], 
          "containers": [
            { 
              "image": image, 
              "name": container
            }
          ] 
        }
      } 
    } 
  }
  return fetch(`https://${config.apiServer}/apis/apps/v1/namespaces/${config.namespace}/deployments/${deployment}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type':'application/strategic-merge-patch+json'
    },
    body: JSON.stringify(data),
    agent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(res => res.json())
    .then(data => {
      return data;
    }).catch(err => {
      console.log(err);
    });
}

module.exports = {
  setConfig,
  updateImage
}
