const core = require('@actions/core');
const github = require('@actions/github');
const k8s = require('@kubernetes/client-node');
const config = require('config');

const main = async () => {
  const kc = new k8s.KubeConfig();
  kc.loadFromString(Buffer.from(config.get('kubeConfig'), 'base64').toString('utf-8'));
  
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  
  return k8sApi.listNamespacedPod('default').then((res) => {
    console.log(JSON.stringify(res.body,null,2));
  });
}

main().catch(e=>{
  core.setFailed(e.message)
})
