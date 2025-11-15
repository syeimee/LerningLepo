## sshの環境設定

- 1 `~/.ssh/farm_ec_site`に秘密鍵情報を記載する。
- 2 `~/.ssh/config`を設定する。

```bash
Host farm-ec
    HostName 160.251.173.126
    User devuser
    IdentityFile ~/.ssh/farm_ec_site
```
- 3 ssh接続の方法
```bash
ssh farm-ec
```

