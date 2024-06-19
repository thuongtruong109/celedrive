export const ContentType = {
    "application/octet-stream": "file",

    "image/png": "image",
    "image/jpeg": "image",
    "image/gif": "image",
    "image/svg+xml": "image",
    "image/webp": "image",
    "image/vnd.microsoft.icon": "image",

    "application/json": "text",
    "text/html": "text",
    "text/xml": "text",
    "text/javascript": "text",
    "text/css": "text",
    "text/plain": "text",
    "video/mp2t": "text",
    "application/x-sh": "text",
    "application/x-bat": "text",


    "application/pdf": "pdf",
    "text/csv": "csv",

    "audio/mpeg": "audio",
    "audio/ogg": "audio",
    "audio/wav": "audio",
    "video/mp4": "video",
    "video/mpeg": "video",
    "video/ogg": "video",

    // "application/x-msdownload": "exe",
    // "application/x-tar": "tar",
    // "application/x-7z-compressed": "zip",
    // "application/x-gzip": "gz",
    "application/zip": "zip",
    "application/x-rar-compressed": "zip",
    "application/x-zip-compressed": "zip",

    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "doc",
    "application/vnd.oasis.opendocument.text": "doc",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xls",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "ppt",
}

export const ContentTypeList = Object.values(ContentType).filter((value, index, self) => self.indexOf(value) === index);