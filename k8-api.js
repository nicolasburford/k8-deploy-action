const axios = require('axios');
const https = require('https');

let config = {};

const setConfig = (inconf) => {
  config=inconf
}

const getDeployment = (deployment) => {
  return axios.get(`https://${config.apiServer}/apis/apps/v1/namespaces/${config.namespace}/deployments/${deployment}`, {
    headers: {
      Authorization: `Bearer ${config.token}`
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log(err);

  })
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
  return axios.patch(`https://${config.apiServer}/apis/apps/v1/namespaces/${config.namespace}/deployments/${deployment}`, data, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type':'application/strategic-merge-patch+json'
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(res=>{
    return res.data
  })
}

module.exports = {
  setConfig,
  updateImage
}