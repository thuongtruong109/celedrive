# ![Favicon](/public/favicon.png) celedrive

> Store and share your files with ease

![Lint config status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/celedrive/lint.yml?logo=editorconfig&label=lint%20config)
[![Licence](https://img.shields.io/github/license/antfu/regex-doctor.svg?style=flat)](https://github.com/thuongtruong109/regex-doctor/blob/main/LICENSE)
[![](https://img.shields.io/badge/🔗%20Demo%20link-8A2BE2)](https://celedrive.vercel.app)
[![](https://img.shields.io/badge/📸%20Demo%20video-blue)](https://drive.google.com/file/d/13whVlhF6O4SRub2tYDSKKSdHtLs_QsGw/view?usp=drive_link)

![Preview](/public/preview/banner.png)

## 🗾 Introduction

Celedrive is a file storage and sharing platform implements a microservices-based architecture orchestrated through Docker containers, with a central hub service coordinating multiple specialized sharing services. The system supports multiple sharing mechanisms including real-time facilitating temporary file transfers, wheareas enables users to store files permanently in the cloud.

## 🎗️ Preview

![Storage](/public/preview/hub_storage/all.png)

![Public share](/public/preview/public_share/all.png)

![Protected share](/public/preview/protected_share/all.png)

![Single share](/public/preview/single_share/all.png)

![Group share](/public/preview/group_share/all.png)

![Multi share](/public/preview/multi_share/all.png)

## 💡 Features

![Features](/public/features.png)

## ⛳ Architecture

Celedrive is a polyglot microservices architecture built around main hub storage service and five distinct file sharing mechanisms: public sharing, protected sharing, and three types of real-time sharing (single, group, and multi-user). The system uses a spoke model where a central Next.js application orchestrates multiple specialized services, each optimized for specific sharing patterns and data persistence requirements. The architecture ensures that each service can be independently scaled and maintained while preserving the overall system functionality through well-defined service contracts and dependency management.

- System architecture

![System architecture](/docs/architecture/system.png)

- Data architecture

Celedrive employs a multi-database strategy where each sharing mechanism uses the most appropriate data store for its access patterns and consistency requirements:

| Sharing Type      | Data Store         | Persistence | Consistency | Use Case                     |
| ----------------- | ------------------ | ----------- | ----------- | ---------------------------- |
| User Files        | Firebase/Firestore | Permanent   | Strong      | File metadata, user profiles |
| Public Links      | MongoDB            | Permanent   | Eventual    | Public file downloads        |
| Protected Files   | Firebase           | Permanent   | Strong      | One-time key validation      |
| Single Share      | In-Memory          | Session     | None        | Direct transfers             |
| Group Share       | In-Memory          | Session     | None        | P2P coordination             |
| Multi Share       | In-Memory          | Session     | None        | Mesh network state           |
| Real-time Updates | Convex             | Temporary   | Strong      | Live dashboard updates       |

![Data architecture](/docs/architecture/data.png)

- Security architecture

![Security architecture](/docs/architecture/security.png)

- Component architecture

![Component architecture](/docs/architecture/component.png)

- Build architecture

![Build architecture](/docs/architecture/build.png)

- Deployment architecture

![Deployment architecture](/docs/architecture/deployment.png)

## 📦 Tech Stack

| Service       | Protocol  | Technology         | Primary Function                   | Data Store       | Communication Pattern           | Key Libraries           | File Locations    | Dependencies                                        |
| ------------- | --------- | ------------------ | ---------------------------------- | ---------------- | ------------------------------- | ----------------------- | ----------------- | --------------------------------------------------- |
| Hub Service   | HTTP/REST | Next.js/TypeScript | Central dashboard, file management | Firebase, Convex | HTTP API, Server-side rendering | Clerk, Convex, Firebase | **hub/**          | **public_server**, **group**, **single**, **multi** |
| Public Server | HTTP/REST | Node.js/Express    | Public file uploads/downloads      | MongoDB          | REST API                        | MongoDB, Multer         | **public/server** | **mongo**                                           |
| Protected     | HTTP/REST | Node.js/Express    | Protected file uploads/downloads   | Firebase         | REST API                        | Firebase, Multer        | **protected/**    | **firebase**                                        |
| Single Share  | 5000      | Node.js/Socket.io  | 1:1 real-time transfers            | In-memory        | TCP Sockets                     | Real-time events        | **single/server** | None                                                |
| Group Share   | 3002      | React/PeerJS       | Multi-user P2P sharing             | External P2P     | WebRTC signaling                | WebRTC signaling        | **group/**        | None                                                |
| Multi Share   | 3000      | React/WebRTC       | Mesh network sharing               | Internal P2P     | Direct P2P connections          | Direct P2P              | **multi/**        | **peerjs**                                          |
| Forward Proxy | 3333      | Go/Gin             | Load balancing, request routing    | None             | HTTP forwarding                 | HTTP reverse proxy      | **proxy/**        | **hub**                                             |
| PeerJS Server | 5001      | Node.js/Express    | P2P signaling server               | None             | WebSocket                       | PeerJS                  | **peerjs/**       | None                                                |

- System stack

![System stack](/docs/stack/system.png)

- Mapping stack

![Mapping stack](/docs/stack/mapping.png)

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

## 🌊 Flow

The system uses a Go-based reverse proxy to route requests to appropriate services based on URL patterns and service availability:

- Request flow

![Request flow](/docs/flow/request.png)

- Development flow

![Development flow](/docs/flow/development.png)

- Authentication flow

![Authentication flow](/docs/flow/authentication.png)

- File operation flow

![File operation flow](/docs/flow/file_operation.png)

- File upload flow

![File upload flow](/docs/flow/file_upload.png)

- File download flow

![File download flow](/docs/flow/file_download.png)

- Upload progress flow

![Upload progress flow](/docs/flow/upload_progress.png)

- Storage flow

![Storage flow](/docs/flow/storage.png)

- Share flow

![Share flow](/docs/flow/share.png)

- Proxy flow

![Proxy flow](/docs/flow//proxy.png)

## 🪄 Sequence diagram

- **Main storage**

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

## 🕸️ Patterns

| Sharing Type    | Authentication   | Authorization | Security Model          |
| --------------- | ---------------- | ------------- | ----------------------- |
| Hub Dashboard   | Required (OAuth) | User-based    | Session tokens          |
| Public Share    | None             | Public access | No restrictions         |
| Protected Share | None             | One-time key  | Temporary access tokens |
| Single Share    | None             | Session-based | Temporary room IDs      |
| Group Share     | None             | ID-based      | Peer verification       |
| Multi Share     | None             | ID-based      | Mesh authentication     |

![Realtime sharing patterns](/docs/realtime_pattern.png)

## Components

## 🧭 Comparison

![Comparison](/docs/comparison.png)

## 🧩 Development

The celedrive project is configured as a monorepo with both root-level tooling and individual application build configurations. The development environment uses modern JavaScript tooling with TypeScript support and automated code quality enforcement.

| Script    | Location   | Purpose                        | Command                                             |
| --------- | ---------- | ------------------------------ | --------------------------------------------------- |
| prepare   | Root       | Initialize git hooks           | husky                                               |
| lint      | Root       | Validate code formatting       | editorconfig-checker                                |
| dev       | apps/multi | Development server             | vite                                                |
| build     | apps/multi | Production build               | tsc && vite build                                   |
| peer      | apps/multi | Start PeerJS server            | peerjs --port 9000                                  |
| start:dev | apps/multi | Build and run with peer server | yarn build && concurrently "yarn peer" "yarn start" |
| start     | apps/multi | Serve built application        | yarn serve -s dist/                                 |
| preview   | apps/multi | Preview production build       | vite preview                                        |

```bash
# Hub Service Configuration
NEXT_PUBLIC_SHARE_PUBLIC_API_URI=http://localhost:8000 - Points to public_server API
NEXT_PUBLIC_SHARE_SINGLE_EMBED_URI=http://localhost:5000 - Points to single sharing service
NEXT_PUBLIC_SHARE_GROUP_EMBED_URI=http://localhost:3002 - Points to group sharing service
NEXT_PUBLIC_SHARE_MULTI_EMBED_URI=http://localhost:3000 - Points to multi sharing service

# Proxy Service Configuration
APP_1=http://localhost:3001/ - Primary hub instance
APP_2=http://localhost:3003/ - Secondary hub instance

# Database Configuration
MONGO_URI=mongodb://mongo:27017 - MongoDB connection for public_server
```

## 🪪 License

[MIT](./LICENSE) License ©Tran Nguyen Thuong Truong, 2024

<!-- - [Logo icon](https://img.icons8.com/water-color/100/centralized-network.png) -->
<!-- https://steveholgado.com/nginx-for-nextjs/ -->
<!-- https://blog.logrocket.com/how-to-use-proxy-next-js/ -->
<!-- https://www.sobyte.net/post/2021-09/https-proxy-in-golang-in-less-than-100-lines-of-code/ -->
