import { FC } from "react";

const GuidePage: FC = () => {
  return (
    <div className='container h-full'>
        <h2 className='text-2xl font-bold text-center'>This is guide page</h2>
        <h2 className='text-2xl font-bold mt-8'>I. Feature</h2>
        <ul className='list-disc ml-4 mt-4'>
            <li>Storage and manage file webapp</li>
            <li>Sharing file app using socket</li>
            <li>Sharing file app using P2P</li>
            <li>Sharing file app using P2P with multiple users</li>
            <li>Public file sharing webapp</li>
            <li>Protected file sharing webapp</li>
        </ul>
        <h2 className='text-2xl font-bold mt-8'>II. Description</h2>
        <div className='mt-4 flex flex-col space-y-4'>
            <h4>1. Hub:</h4>
            <ul className='list-disc ml-4'>
                <li>storage and manage file webapp</li>
                <li>using Clerk Auth as authorize server, user manage organization (create, update, delete) and files in this organization</li>
                <li>if user want delete org, check:</li>
                <li>
                    <ul className='list-disc ml-4'>
                        <li>if user is admin of org, if not, reject and delete fail.</li>
                        <li>if right find all files of org and delete them, then delete org and send success</li>
                    </ul>
                </li>
                <li>user can upload, update, favorite, delete file</li>
                <li>filter, search file</li>
                <li>logout</li>
            </ul>

            <h4>2. Single:</h4>
            <ul className='list-disc ml-4'>
                <li>sharing file app using socket, sender create new room and receiver enter room id and connect, then sender send file to receiver</li>
            </ul>

            <h4>3. Group:</h4>
            <ul className='list-disc ml-4'>
                <li>using P2P (peerjs):</li>
                <li>User A start create connect, then app wiill generate room ID, link, qr code.</li>
                <li>User B can connect with 3 ways:</li>
                <li>
                    <ul className='list-disc ml-4'>
                        <li> way 1 is start connect and paste room id, if match they wil connect together</li>
                        <li> way 2 is paste shared link to join connect together</li>
                        <li> way 3 is  scan shared qr code, browser open and join connect together</li>
                    </ul>
                </li>
                <li>Will have connection list, user can select one, who is they will send file</li>
                <li>Send file feature will have button to select upload and send</li>
                <li>Receiver see display on screen and choose if they want get and download file</li>
            </ul>

            <h4>4. Multi:</h4>
            <ul className='list-disc ml-4'>
                <li>Generate diagram for:</li>
                <li>sharing file webapp using p2p</li>
                <li>sender upload file and shared link, qr code will be generated</li>
                <li>receiver paste link and connect, or scan qr code then will redirect open browser to connect</li>
                <li>after others receiver connected, sender will see listed receiver connected with id</li>
                <li>when user accept get file, file auto downloaded to device and sender screen will display sent success</li>
                <li>when sender close connect, other also lost connect</li>
            </ul>

            <h4>5. Public:</h4>
            <ul className='list-disc ml-4'>
                <li>Create file sharing webapp, client upload file to server, server save to database and return file link. Then user access link to download file automatically</li>
            </ul>

            <h4>6. Protected:</h4>
            <ul className='list-disc ml-4'>
                <li>Create file sharing webapp, client upload file to server, server save to database and generate OTP of this file and return this OTP. Then user enter OTP, if OTP not match, return fail notify or success annd ser click download button to download file</li>
            </ul>
        </div>
    </div>
    );
}

export default GuidePage;
