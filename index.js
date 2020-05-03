const core = require('@actions/core');
const k8api = require('./k8-api');
 
const main = () => {
  k8api.setConfig({
    apiServer: core.getInput('apiServer'),
    namespace: core.getInput('namespace'),
    token: process.env.K8TOKEN
  })

  return k8api.updateImage({
    deployment: core.getInput('deployment'),
    container: core.getInput('container'),
    image: core.getInput('image')
  })
}

main().then(res=>{
  console.log(res);
}).catch(e=>{
  core.setFailed(e.message)
})
