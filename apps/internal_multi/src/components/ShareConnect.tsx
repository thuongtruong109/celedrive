import {Button, message, Space} from "antd";
import {CopyOutlined, StopOutlined} from "@ant-design/icons";
import { QRCodeCanvas } from 'qrcode.react'
import { FC } from "react";

type Props = {
    peerId: string
    handleStopSession: () => void
}

const ShareConnect: FC<Props> = (props: Props) => {
    // const connectLink = (): string => {
        // let fullUrl = window.location.href
        // if (fullUrl.includes("?id=")) {
        //     fullUrl = fullUrl.split("?id=")[0]
        // }
        // return fullUrl + "?id=" + props.peerId
    // }
    let connectUrl = window.location.href?.includes("?id=") ? (window.location.href.split("?id=")[0]) : (window.location.href + "?id=" + props.peerId)

    const copyId = async () => {
        await navigator.clipboard.writeText(props.peerId)
        message.info("Copied: " + props.peerId)
    }

    const onCopyLink = async () => {
        await navigator.clipboard.writeText(connectUrl)
        message.info("Copied share link")
    }

  return (
    <Space direction="vertical">
         <Space direction="horizontal">
            <div>ID: {props.peerId}</div>
            <Button icon={<CopyOutlined/>} onClick={copyId}/>
            <Button danger onClick={props.handleStopSession}>
                <StopOutlined />
                <span>Stop</span>
            </Button>
        </Space>
        <Space direction="horizontal">
            <div>
                <span>or via link: </span>
                <a href={connectUrl} target='_blank' rel="noreferrer">
                    {connectUrl}
                </a>
            </div>
            <Button icon={<CopyOutlined/>} onClick={onCopyLink}/>
        </Space>
        <Space direction="vertical">
            <span>or scan QR code below: </span>
            <QRCodeCanvas size={100} value={connectUrl} />
        </Space>
    </Space>
  )
}

export default ShareConnect