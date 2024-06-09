import React, { useEffect } from 'react';
import {Button, Card, Col, Input, Menu, MenuProps, message, Row, Space, Upload, UploadFile} from "antd";
import {CloudUploadOutlined, LinkOutlined, UploadOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {startPeer, stopPeerSession} from "./store/peer/peerActions";
import * as connectionAction from "./store/connection/connectionActions"
import {DataType, PeerConnection} from "./helpers/peer";
import {useAsyncState} from "./helpers/hooks";
import SharedConnect from "./components/ShareConnect";

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const App: React.FC = () => {
    const peer = useAppSelector((state) => state.peer)
    const connection = useAppSelector((state) => state.connection)
    const dispatch = useAppDispatch()

    const handleStartSession = () => {
        dispatch(startPeer())
    }

    const handleStopSession = async () => {
        await PeerConnection.closePeerSession()
        dispatch(stopPeerSession())
    }

    const handleConnectOtherPeer = () => {
        connection.id != null ? dispatch(connectionAction.connectPeer(connection.id || "")) : message.warning("Please enter ID")
    }

    const [fileList, setFileList] = useAsyncState([] as UploadFile[])
    const [sendLoading, setSendLoading] = useAsyncState(false)

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.warning("Please select file")
            return
        }
        if (!connection.selectedId) {
            message.warning("Please select a connection")
            return
        }
        try {
            await setSendLoading(true);
            let file = fileList[0] as unknown as File;
            let blob = new Blob([file], {type: file.type});

            await PeerConnection.sendConnection(connection.selectedId, {
                dataType: DataType.FILE,
                file: blob,
                fileName: file.name,
                fileType: file.type
            })
            await setSendLoading(false)
            message.info("Send file successfully")
        } catch (err) {
            await setSendLoading(false)
            console.log(err)
            message.error("Error when sending file")
        }
    }

    useEffect(() => {
        let url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const idValues = urlParams.getAll('id');
        const id = idValues[0];
        
        if (id && peer.started) {
            message.info("ID: " + id)
            dispatch(connectionAction.connectPeer(id))
        }
    }, [peer.started, dispatch])

    return (
        <Row justify={"center"} align={"top"}>
            <Col xs={24} sm={24} md={20} lg={16} xl={12}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Card hidden={peer.started} style={{ display: peer.started ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleStartSession} loading={peer.loading}>Start</Button>
                    </Card>
                    <Card hidden={!peer.started}>
                        {
                            peer.id && <SharedConnect peerId={peer.id} handleStopSession={handleStopSession}/>
                        }
                    </Card>
                    <div hidden={!peer.started}>
                        <Space direction="vertical" style={{ width: '100%'}}>
                            <Card>
                                <Space direction="horizontal">
                                    <Input placeholder={"ID"}
                                            onChange={e => dispatch(connectionAction.changeConnectionInput(e.target.value))}
                                            required={true}
                                            />
                                    <Button onClick={handleConnectOtherPeer}
                                            loading={connection.loading}>Connect</Button>
                                </Space>
                            </Card>
                            <Card title={<Space direction="horizontal">
                                            <LinkOutlined />
                                            <span>Connection</span>
                                        </Space>
                                }>
                                {
                                    connection.list.length === 0
                                        ? <div>Waiting for connection ...</div>
                                        : <div>
                                            Select a connection
                                            <Menu selectedKeys={connection.selectedId ? [connection.selectedId] : []}
                                                    onSelect={(item) => dispatch(connectionAction.selectItem(item.key))}
                                                    items={connection.list.map(e => getItem(e, e, null))}/>
                                        </div>
                                }
                            </Card>
                            <Card title={<Space direction="horizontal">
                                            <CloudUploadOutlined />
                                            <span>Send File</span>
                                        </Space>
                                }>
                                <Space style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <Upload fileList={fileList}
                                            maxCount={1}
                                            onRemove={() => setFileList([])}
                                            beforeUpload={(file) => {
                                                setFileList([file])
                                                return false
                                            }}>
                                        <Button icon={<UploadOutlined/>}>Select File</Button>
                                    </Upload>
                                    <Button
                                        type="primary"
                                        onClick={handleUpload}
                                        disabled={fileList.length === 0}
                                        loading={sendLoading}
                                    >
                                        {sendLoading ? 'Sending' : 'Send'}
                                    </Button>
                                </Space>
                            </Card>
                        </Space>
                    </div>
                </Space>
            </Col>
        </Row>
    )
}

export default App
