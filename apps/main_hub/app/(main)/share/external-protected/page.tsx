"use client";

import React from "react";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { PiCopySimpleLight } from "react-icons/pi";
import { MdDownload } from "react-icons/md";
import { DropzoneDialog } from "material-ui-dropzone";
import { IoReload } from "react-icons/io5";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  push,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import {
  getDownloadURL,
  ref as dbstorageref,
  uploadBytesResumable,
} from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/firebase";
import { Button } from "@/_components/ui/button";

const ShareExternalProtectedPage = () => {
  const router = useRouter();
  const [OTP, setOTP] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File[] | undefined>();
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [showUniqueID, setShowUniqueID] = useState<boolean>(false);
  const [showshareButton, setShowShareButton] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<number>(0);
  const [UniqueID, setUniqueID] = useState<number>(12345);
  const [showshareUniqueID, setshowshareUniqueID] = useState<number>(10000);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showdownloadloader, setshowdownloadloader] = useState<boolean>(false);

  const handleOTPChange = (otp: string) => {
    setOTP(otp);
  };

  const handleFileDrop = (files: File[]) => {
    setPercentage(0);
    setFile(files);
    console.log(files);
    if (files.length > 1) {
      const promises: Promise<void>[] = [];
      files.forEach((file, index) => {
        const fileReader = new FileReader();
        const promise = new Promise<void>((resolve, reject) => {
          fileReader.onload = () => {
            // const data = fileReader.result as ArrayBuffer | string;
            console.log(files[index].name);
            resolve();
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
        fileReader.readAsArrayBuffer(file);
        promises.push(promise);
      });

      Promise.all(promises)
        .then(() => {
          let filename= files[0].path //files[0].name 
            const storageRef = dbstorageref(
              storage,
              "images/" + filename,
            );
            const uploadTask = uploadBytesResumable(storageRef, files[0]);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercentage(progress);
              },
              (error) => {
                console.error(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((url) => {
                    setDownloadUrl(url);
                    console.log("File uploaded successfully");
                    console.log("Download URL:", url);
                    generateUniqueNumber()
                      .then((uniqueNumber) => {
                        console.log("Unique Number:", uniqueNumber);
                        setUniqueID(uniqueNumber);
                        return storeDataInDatabase(url, uniqueNumber,filename);
                      })
                      .then(() => {
                        console.log(
                          "URL and Unique Number are stored in the database"
                        );
                      })
                      .catch((error) => {
                        console.error(
                          "Error storing URL and Unique Number:",
                          error
                        );
                      });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            );
        })
        .catch((error) => {
          console.error("Error creating the zip:", error);
        });
    } else {
      const filename = files[0].path; //files[0].name
      console.log(filename);
      const storageRef = dbstorageref(storage, "images/" + files[0].path); //files[0].name
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercentage(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setDownloadUrl(url);
              console.log("File uploaded successfully");
              console.log("Upload URL:", url);
              generateUniqueNumber()
                .then((uniqueNumber) => {
                  console.log("Unique Number:", uniqueNumber);
                  setUniqueID(uniqueNumber);
                  return storeDataInDatabase(url, uniqueNumber,filename);
                })
                .then(() => {
                  console.log(
                    "URL and Unique Number are stored in the database"
                  );
                })
                .catch((error) => {
                  console.error("Error storing URL and Unique Number:", error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    }
  };

  const generateUniqueNumber = () => {
    return new Promise<number>((resolve, reject) => {
      const uniqueNumber = Math.floor(10000 + Math.random() * 90000);
      checkIfNumberExists(uniqueNumber)
        .then((exists) => {
          if (exists) {
            resolve(generateUniqueNumber());
          } else {
            resolve(uniqueNumber);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const checkIfNumberExists = (number: number) => {
    return new Promise<boolean>((resolve, reject) => {
      const database = getDatabase();
      const databaseRef = ref(database, "fileData");
      const checkQuery = query(
        databaseRef,
        orderByChild("unique"),
        equalTo(number)
      );

      onValue(
        checkQuery,
        (snapshot) => {
          resolve(snapshot.exists());
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const storeDataInDatabase = (url: string, uniqueNumber: number, filename: string) => {
    return new Promise<void>((resolve, reject) => {
      const database = getDatabase();
      const databaseRef = ref(database, "fileData");
      const newDataRef = push(databaseRef);

      set(newDataRef, {
        url: url,
        unique: uniqueNumber,
        filename: filename
      })
        .then(() => {
          toast.success("File Uploaded Successfully");
          setShowProgress(false);
          setshowshareUniqueID(uniqueNumber);
          setShowUniqueID(true);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleDownload = () => {
    setshowdownloadloader(true);
    let otpp = parseInt(OTP);
    if (otpp >= 10000) {
      checkIfOTPExists(otpp)
        .then((exists) => {
          if (exists) {
            getDownloadURLFromOTP(otpp)
              .then(({ url, filename }) => {
                console.log("Download URL:", url);
                console.log("Filename:", filename);

                downloadAndDeleteFile(url, otpp, filename);
              })
              .catch((error) => {
                setshowdownloadloader(false);
                console.error("Error getting download URL:", error);
              });
          } else {
            setshowdownloadloader(false);
            toast.error("Invalid Unique ID", {
              style: {
                width: "2000px",
                height: "35px",
              },
            });
            setOTP("");
            console.log("Entered OTP does not exist in the database.");
          }
        })
        .catch((error) => {
          console.error("Error checking if OTP exists:", error);
        });
    } else {
      setshowdownloadloader(false);
      toast.error("Enter Proper unique ID");
    }
  };
  

  const checkIfOTPExists = (otp: number) => {
    return new Promise<boolean>((resolve, reject) => {
      const database = getDatabase();
      const databaseRef = ref(database, "fileData");

      const checkQuery = query(
        databaseRef,
        orderByChild("unique"),
        equalTo(otp)
      );

      onValue(
        checkQuery,
        (snapshot) => {
          resolve(snapshot.exists());
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const getDownloadURLFromOTP = (otp: number) => {
    return new Promise<{ url: string, filename: string }>((resolve, reject) => {
      const database = getDatabase();
      const databaseRef = ref(database, "fileData");
  
      const checkQuery = query(
        databaseRef,
        orderByChild("unique"),
        equalTo(otp)
      );
  
      onValue(
        checkQuery,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Retrieve the first entry with the matching OTP
            const entry = Object.values(data)[0];
            // Resolve with an object containing both url and filename
            resolve({
              url: entry.url,
              filename: entry.filename || "Unknown Filename", // If the filename is not available, use a default value
            });
          } else {
            reject(new Error("No download URL found for the given OTP."));
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const downloadAndDeleteFile = async (downloadUrl: string, _otp: number, filename: string) => {
    // cors-guild.txt for cors issue

    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.target = '_blank';
    anchor.href = downloadUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
    
    // fetch(downloadUrl, {
    //   mode : 'no-cors',
    //   method: 'get',
    //   headers: {
    //     'Access-Control-Allow-Origin' : '*',
    //     'mode':'cors',
    //   },
    // })
    // .then(response => response.blob())
    // .then(blob => {
    //   let blobUrl = window.URL.createObjectURL(blob);
    //   let a = document.createElement('a');
    //   a.download = filename;
    //   a.href = blobUrl;
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();
    // })
    // .catch((error) => {
    //   console.error("Error downloading the file:", error);
    // });

    setshowdownloadloader(false);
  };

  const shareNewFile = () => {
    setShowUniqueID(false);
    setShowProgress(false);
    setShowShareButton(true);
    setOTP("");
    setUniqueID(10000);
    setPercentage(0);

    router.refresh();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(showshareUniqueID.toString())
      .then(() => {
        console.log("Text copied to clipboard: ", showshareUniqueID);
        toast.success("Copied to Clipboard");
        // You can add additional handling here, such as showing a success message
      })
      .catch((error) => {
        console.error("Error copying text to clipboard: ", error);
        // You can add additional error handling here, such as showing an error message
      });
  };

  return (
      <div className="relative flex flex-col items-center space-y-12 w-full h-full">
          <Toaster />
          <div className="w-96 h-60 flex flex-col items-center justify-center bg-white rounded-md shadow-md">
            <div className="flex justify-center items-center h-screen">
              {showshareButton && (
                <Button
                  onClick={() => setOpen(true)}
                >
                  <AiOutlineCloudUpload className="text-lg" />
                  <span>Upload</span>
                </Button>
              )}
              {showProgress && (
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    marginTop: "-40px",
                  }}
                >
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
              )}
              {showUniqueID && (
                <div>
                  <OTPInput
                    value={showshareUniqueID}
                    numInputs={5}
                    otpType="number"
                    disabled={true}
                    shouldAutoFocus={false}
                    inputStyle={{
                      width: "2.5rem",
                      height: "2.5rem",
                      margin: "0 0.25rem",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      borderRadius: 4,
                      outline: "none",
                      border: "1px solid rgba(0,0,0,0.3)",
                    }}
                    renderInput={(props) => <input {...props} />}
                    secure
                  />
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <Button
                      className="bg-purple-500 hover:bg-purple-600"
                      onClick={copyToClipboard}
                    >
                      <PiCopySimpleLight className="w-5 h-5" />
                      <span>Copy</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-accent"
                      onClick={shareNewFile}
                    >
                      <IoReload className="w-5 h-5" />
                      <span>Upload another</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <DropzoneDialog
              maxWidth="xs"
              acceptedFiles={['*/*']}
              cancelButtonText={"cancel"}
              submitButtonText={"submit"}
              maxFileSize={100000000}
              open={open}
              filesLimit={1}
              onDrop={(e)=>{setOpen(false);}}
              onClose={() => setOpen(false)}
              onSave={(files) => {
                if (files[0].size > 100000000) {
                  toast.error("File Size exceeded the Limit(100MB)");
                  setOpen(false);
                } else {
                  console.log(files);
                  setFile(files);
                  setOpen(false);
                  setShowProgress(true);
                  setShowShareButton(false);
                  handleFileDrop(files);
                }
              }}
              showPreviews={true}
              showFileNamesInPreview={false}
              showAlerts={true}
              getFileAddedMessage={(files) => {
                return "File Added Succesfully";
              }}
              getFileRemovedMessage={(files) => {
                return "File Removed ";
              }}
              getFileLimitExceedMessage={(files) => {
                return "Upload only one file at a time";
              }}
              getDropRejectMessage={(files) => {
                return "Max Upload size exceeded(only 100MB)";
              }}
            />
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h3 className="text-lg font-medium">Enter the password to download</h3>
            <div className="flex items-center space-x-4">
              <OTPInput
                value={OTP}
                onChange={handleOTPChange}
                autoFocus
                OTPLength={5}
                numInputs={5}
                otpType="number"
                disabled={false}
                inputStyle={{
                  width: "2.5rem",
                  height: "2.5rem",
                  margin: "0 0.25rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: 4,
                  outline: "none",
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
                renderInput={(props) => <input {...props} />}
                secure
              />
              <Button className="bg-blue-500 hover:bg-blue-600">
                {showdownloadloader ? (
                  <ThreeDots
                    height="50"
                    width="30"
                    radius="9"
                    color="#FFFFFF"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  <div onClick={handleDownload} className="flex items-center space-x-1">                  
                    <MdDownload />
                    <span>Download</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
      </div>
  );
}

export default ShareExternalProtectedPage