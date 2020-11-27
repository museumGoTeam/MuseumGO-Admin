interface DownloadImgParams {
    ref: React.RefObject<HTMLAnchorElement>
    documentID: string | undefined
    fileName: string
}

export default function useDownloadImg(): ({ref, documentID, fileName}: DownloadImgParams) => void {

    return ({ref, documentID, fileName}:  DownloadImgParams ) => {
        if (ref.current && documentID) {
            const canvas: HTMLCanvasElement = document.getElementById(documentID) as HTMLCanvasElement
            if (canvas) {
                const imageURL = canvas.toDataURL().replace("image/png", "image/octet-stream")
                ref.current.href = imageURL
                ref.current.download = `${fileName}.png`
                ref.current.click()
            }
            return
        }
        return 
    }
}