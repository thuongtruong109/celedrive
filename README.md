# celedrive

> Store and share your files with ease

![Lint config status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/celedrive/lint.yml?logo=editorconfig&label=lint%20config)
[![Licence](https://img.shields.io/github/license/antfu/regex-doctor.svg?style=flat)](https://github.com/thuongtruong109/regex-doctor/blob/main/LICENSE)

## Preview

![Preview](/public/preview.png)

## Features

* **Storage**: <br>
    ✅ Upload files <br>
    ✅ Mark as favorite <br>
    ✅ Download files <br>
    ✅ View files (grid/list mode) <br>
    ✅ Delete files <br>
    ✅ Search files <br>
    ✅ Filter files (by extension type) <br>
* **Sharing**: <br>
    ✅ Share public via link (pernament data, no password required) <br>
    ✅ Share protected via one-time key required (pernament data) <br>
    ✅ Share real-time single via one-time key required (temporary data) by TCP socket <br>
    ✅ Share real-time group via link, qr code (temporary data) by P2P external <br>
    ✅ Share real-time multi via link, qr code (temporary data) by P2P internal<br>
<!-- * **Security**: <br>
    ✅ Password hashing <br>
    ✅ File encryption/decryption <br> -->

## Architecture

![Architecture](/docs/architecture.png)

## Services

- **Main storage**:

![Storage](/docs/sequence/hub_storage.png)

- **Share public**:

![Single sharing](/docs/sequence/single_share.png)

- **Share protected**:

![Group sharing](/docs/sequence/group_share.png)

- **Share group**:

![Multi sharing](/docs/sequence/multi_share.png)

- **Share multi**:

![Public sharing](/docs/sequence/public_share.png)

- **Share single**:

![Protected sharing](/docs/sequence/protected_share.png)

## Tech Stack

- EsLint + Prettier + Editorconfig (linting)
- Husky + Lint-staged (pre-commit)
- Commitlint (commit message)
- GitHub Actions (CI/CD)
- TypeScript (main storage, share public frontend, share protected, share group, share multi)
- Nodemon (share public server auto-restart)
- Tailwind CSS + Radix-ui (main storage styling)
- React Icons (main storage icons)
- Axios (main storage API fetcher)
- Next.js (main storage)
- Clerk (main storage authentication)
- Convex (main storage database)
- Firebase (main storage, share protected database)
- MongoDB (share public database)
- Express - Node (share single backend)
- Socket.io (share single backend)
- React (share group, share multi)
- Peerjs (share group, share multi)
- Redux + Reduxjs Toolkit (share group)
- Ant Design (share group)
- WebRTC (share multi)
- Peer (share multi)
- Fortawesome + SCSS (share multi)
- Vite + Serve (share multi)
- Docker (containerization)
- Gin gonic - Go (proxy server)
- Vercel + Render + GitHub Pages (deployment)
- LaTex (report documentation)

## Resource

- [Logo icon](https://img.icons8.com/water-color/100/centralized-network.png)

## License

[MIT](./LICENSE) License ©Tran Nguyen Thuong Truong, 2024

<!-- https://steveholgado.com/nginx-for-nextjs/ -->
<!-- https://blog.logrocket.com/how-to-use-proxy-next-js/ -->
<!-- https://www.sobyte.net/post/2021-09/https-proxy-in-golang-in-less-than-100-lines-of-code/ -->