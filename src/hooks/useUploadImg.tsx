import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../utils/firebase-utils";

type useUploadImgType = {
  isSuccess: boolean;
  imgUrl: string;
  error?: any;
};

const useUploadImg = () => {
  const upload = async (isCoverPic: boolean, imgFile: File) => {
    const folderLocation = isCoverPic ? "/cover-pics" : "/profile-pics";
    const storageRef = ref(storage, `${folderLocation}/${imgFile.name}`);
    const retVal: useUploadImgType = {
      isSuccess: false,
      imgUrl: "",
    };

    try {
      const uploadTask = await uploadBytesResumable(storageRef, imgFile);
      retVal.imgUrl = await getDownloadURL(uploadTask.ref);
      retVal.isSuccess = true;
    } catch (error: any) {
      retVal.error = error;
    }

    return retVal;
  };

  return upload;
};

export default useUploadImg;
