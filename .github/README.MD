# Install Runner locally
```
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.288.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.288.1/actions-runner-linux-x64-2.288.1.tar.gz
tar xzf ./actions-runner-linux-x64-2.288.1.tar.gz


./config.sh --url https://github.com/tomisboy/bitchess --token TOKEN


./svc.sh install
./svc.sh start

```