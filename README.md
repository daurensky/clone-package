# Admin-kit package cloner

### About
Clone the package repository to composer-packages/ibecsystems/:package-url. If you are too lazy to do everything manually.

## Requirements
**Preinstalled node.js**

Node.js 16 or above

### Installation
```bash
git clone git@github.com:daurensky/clone-package.git
cd clone-package
chmod +x index.js
sudo ln -s "$(pwd)/index.js" /usr/local/bin/clone-package
```

### Usage
```
clone-package git@github.com:IBEC-BOX/admin-kit-core.git
```

### Author
Dauren Kambarov <dkambarov17@gmail.com>
