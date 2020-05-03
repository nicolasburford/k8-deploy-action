# Github Action for Kubernetes Image Update

This is a lightweight Github Action that will replicate the `kubectl set image` command.

## Usage

`.github/workflows/push.yml`

```yaml
on: push
name: deploy
jobs:
  name: deploy to cluster
    runs-on: ubuntu-latest
    needs: push
    steps:
    - name: deploy to cluster
      uses: nicolasburford/k8-deploy-action@master
      with:
        apiServer: ''
        namespace: ''
        deployment: ''
        container: ''
        image: ''
      env:
        K8TOKEN: ${{ secrets.K8TOKEN }}
```

## Secrets

`K8TOKEN` – **required**: A token that can be used to hit your kubernetes cluster:

```bash
kubectl get secrets
kubectl describe secret default-token-4nxl7
```

## Inputs

`apiServer` - (required)

`namespace` - (required)

`deployment` - (required)

`container` - (required)

`image` - (required)