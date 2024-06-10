import React from 'react'
import Peer from './Peer'
import { DataConnection } from 'peerjs'

const PeerList: React.FC<{
  file: File
  password?: string
  peers: DataConnection[]
}> = ({ file, password, peers }) => {
  if (!peers.length) {
    return (
      <section className="peer-list">
        <p>No peers connected!</p>
      </section>
    )
  }
  return (
    <section className="peer-list">
      <h3>Peers</h3>
      <ul>
        {peers.map((peer) => {
          return (
            <li key={peer.peer}>
              <Peer file={file} password={password} peer={peer} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PeerList
